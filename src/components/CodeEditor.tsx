import React from 'react';
import { Copy } from 'lucide-react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  label: string;
}

export function CodeEditor({ value, onChange, readOnly = false, label }: CodeEditorProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {readOnly && (
          <button
            onClick={copyToClipboard}
            className="inline-flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Copy size={16} />
            Copy
          </button>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        className="w-full h-64 p-4 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        spellCheck={false}
      />
    </div>
  );
}