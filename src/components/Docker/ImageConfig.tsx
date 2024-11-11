import React from 'react';

interface ImageConfigProps {
  imageName: string;
  imageTag: string;
  onImageNameChange: (name: string) => void;
  onImageTagChange: (tag: string) => void;
}

export function ImageConfig({
  imageName,
  imageTag,
  onImageNameChange,
  onImageTagChange,
}: ImageConfigProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image Name</label>
        <input
          type="text"
          value={imageName}
          onChange={(e) => onImageNameChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="my-app"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image Tag</label>
        <input
          type="text"
          value={imageTag}
          onChange={(e) => onImageTagChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          placeholder="latest"
        />
      </div>
    </>
  );
}