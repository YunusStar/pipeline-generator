import React from 'react';
import { ImageConfig } from './ImageConfig';
import { RegistryForm } from '../RegistryForm';
import { RegistryCredentials } from '../../types';

interface DockerPanelProps {
  imageName: string;
  imageTag: string;
  registry: RegistryCredentials;
  onImageNameChange: (name: string) => void;
  onImageTagChange: (tag: string) => void;
  onRegistryChange: (registry: RegistryCredentials) => void;
}

export function DockerPanel({
  imageName,
  imageTag,
  registry,
  onImageNameChange,
  onImageTagChange,
  onRegistryChange,
}: DockerPanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Docker Configuration</h2>
      <div className="space-y-4">
        <ImageConfig
          imageName={imageName}
          imageTag={imageTag}
          onImageNameChange={onImageNameChange}
          onImageTagChange={onImageTagChange}
        />
        <RegistryForm
          credentials={registry}
          onChange={onRegistryChange}
        />
      </div>
    </div>
  );
}