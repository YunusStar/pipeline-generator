import React from 'react';

interface LanguageSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Language</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
      >
        <option value="nodejs">Node.js</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
      </select>
    </div>
  );
}