import React from 'react';
import { PipelineType } from '../../types';

interface PipelineTabsProps {
  activeTab: PipelineType;
  onTabChange: (tab: PipelineType) => void;
}

export function PipelineTabs({ activeTab, onTabChange }: PipelineTabsProps) {
  const tabs: PipelineType[] = ['jenkins', 'gitlab', 'github', 'travis'];

  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`
              ${activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>
    </div>
  );
}