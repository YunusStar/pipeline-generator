import React, { useState, useMemo } from 'react';
import { Box } from 'lucide-react';
import { PipelineConfig, PipelineType } from './types';
import { SourceCodePanel } from './components/SourceCode';
import { DockerPanel } from './components/Docker';
import { PipelinePanel } from './components/Pipeline';
import { CodeEditor } from './components/CodeEditor';
import { 
  generateDockerfile, 
  generateJenkinsfile, 
  generateGitLabCI, 
  generateGitHubActions,
  generateTravisCI 
} from './utils/generators';

function App() {
  const [activeTab, setActiveTab] = useState<PipelineType>('jenkins');
  const [config, setConfig] = useState<PipelineConfig>({
    code: '',
    language: 'nodejs',
    registry: {
      url: '',
      username: '',
      password: '',
    },
    imageName: '',
    imageTag: 'latest',
  });

  const dockerfile = useMemo(() => 
    generateDockerfile(config.language, config.code), 
    [config.language, config.code]
  );

  const pipelineConfig = useMemo(() => {
    switch (activeTab) {
      case 'jenkins':
        return generateJenkinsfile(config);
      case 'gitlab':
        return generateGitLabCI(config);
      case 'github':
        return generateGitHubActions(config);
      case 'travis':
        return generateTravisCI(config);
      default:
        return '';
    }
  }, [activeTab, config]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Box className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">Pipeline Generator</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SourceCodePanel
              language={config.language}
              code={config.code}
              onLanguageChange={(language) => setConfig({ ...config, language })}
              onCodeChange={(code) => setConfig({ ...config, code })}
            />

            <DockerPanel
              imageName={config.imageName}
              imageTag={config.imageTag}
              registry={config.registry}
              onImageNameChange={(imageName) => setConfig({ ...config, imageName })}
              onImageTagChange={(imageTag) => setConfig({ ...config, imageTag })}
              onRegistryChange={(registry) => setConfig({ ...config, registry })}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-medium mb-4">Generated Dockerfile</h2>
              <CodeEditor
                label="Dockerfile"
                value={dockerfile}
                onChange={() => {}}
                readOnly
              />
            </div>

            <PipelinePanel
              activeTab={activeTab}
              pipelineConfig={pipelineConfig}
              onTabChange={setActiveTab}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;