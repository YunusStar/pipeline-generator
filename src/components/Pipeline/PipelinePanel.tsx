import React from 'react';
import { PipelineTabs } from './PipelineTabs';
import { CodeEditor } from '../CodeEditor';
import { PipelineType } from '../../types';

interface PipelinePanelProps {
  activeTab: PipelineType;
  pipelineConfig: string;
  onTabChange: (tab: PipelineType) => void;
}

export function PipelinePanel({
  activeTab,
  pipelineConfig,
  onTabChange,
}: PipelinePanelProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Pipeline Configuration</h2>
      <PipelineTabs activeTab={activeTab} onTabChange={onTabChange} />
      <CodeEditor
        label={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Pipeline`}
        value={pipelineConfig}
        onChange={() => {}}
        readOnly
      />
    </div>
  );
}