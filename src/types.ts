export interface RegistryCredentials {
  url: string;
  username: string;
  password: string;
}

export interface PipelineConfig {
  code: string;
  language: string;
  registry: RegistryCredentials;
  imageName: string;
  imageTag: string;
}

export type PipelineType = 'jenkins' | 'gitlab' | 'github' | 'travis';