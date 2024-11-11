import React from 'react';
import { LanguageSelect } from './LanguageSelect';
import { SourceCodeEditor } from './SourceCodeEditor';
import { FileUpload } from './FileUpload';

interface SourceCodePanelProps {
  language: string;
  code: string;
  onLanguageChange: (language: string) => void;
  onCodeChange: (code: string) => void;
}

export function SourceCodePanel({
  language,
  code,
  onLanguageChange,
  onCodeChange,
}: SourceCodePanelProps) {
  const handleFileUpload = (content: string) => {
    onCodeChange(content);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Source Configuration</h2>
      <div className="space-y-4">
        <LanguageSelect value={language} onChange={onLanguageChange} />
        <FileUpload onFileUpload={handleFileUpload} />
        <div className="relative">
          <div className="absolute inset-x-0 -top-3 bg-gradient-to-b from-white via-white to-transparent h-4 z-10" />
          <SourceCodeEditor code={code} onChange={onCodeChange} />
        </div>
      </div>
    </div>
  );
}