export const generateDockerfile = (language: string, code: string): string => {
  const baseImages: Record<string, string> = {
    nodejs: 'node:18-alpine',
    python: 'python:3.9-slim',
    java: 'openjdk:17-slim',
  };

  const baseImage = baseImages[language] || 'alpine:latest';
  
  const dockerCommands: Record<string, string> = {
    nodejs: `COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]`,
    python: `COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]`,
    java: `COPY pom.xml .
COPY src ./src
RUN mvn package
CMD ["java", "-jar", "target/app.jar"]`
  };

  return `FROM ${baseImage}
WORKDIR /app
${dockerCommands[language] || 'COPY . .\nCMD ["./app"]'}`;
};

export const generateJenkinsfile = (config: PipelineConfig): string => {
  return `pipeline {
    agent any
    environment {
        DOCKER_REGISTRY = '${config.registry.url}'
        IMAGE_NAME = '${config.imageName}'
        IMAGE_TAG = '${config.imageTag}'
    }
    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("\${IMAGE_NAME}:\${IMAGE_TAG}")
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry("https://\${DOCKER_REGISTRY}", 'docker-credentials') {
                        docker.image("\${IMAGE_NAME}:\${IMAGE_TAG}").push()
                    }
                }
            }
        }
    }
}`;
};

export const generateGitLabCI = (config: PipelineConfig): string => {
  return `image: docker:latest

services:
  - docker:dind

variables:
  DOCKER_REGISTRY: ${config.registry.url}
  IMAGE_NAME: ${config.imageName}
  IMAGE_TAG: ${config.imageTag}

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $DOCKER_REGISTRY

build:
  stage: build
  script:
    - docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
    - docker push $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG`;
};

export const generateGitHubActions = (config: PipelineConfig): string => {
  return `name: Docker Build and Push

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Login to Docker Registry
        uses: docker/login-action@v1
        with:
          registry: ${config.registry.url}
          username: \${{ secrets.DOCKER_USERNAME }}
          password: \${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and push
        uses: docker/build-push-action@v2
        with:
          push: true
          tags: ${config.registry.url}/${config.imageName}:${config.imageTag}`;
};

export const generateTravisCI = (config: PipelineConfig): string => {
  return `language: minimal

services:
  - docker

env:
  global:
    - DOCKER_REGISTRY=${config.registry.url}
    - IMAGE_NAME=${config.imageName}
    - IMAGE_TAG=${config.imageTag}

before_install:
  - echo "$DOCKER_PASSWORD" | docker login $DOCKER_REGISTRY -u "$DOCKER_USERNAME" --password-stdin

script:
  - docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
  - docker push $DOCKER_REGISTRY/$IMAGE_NAME:$IMAGE_TAG`;
};