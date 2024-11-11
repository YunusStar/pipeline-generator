import React from 'react';
import { CodeEditor } from '../CodeEditor';

interface SourceCodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export function SourceCodeEditor({ code, onChange }: SourceCodeEditorProps) {
  return (
    <CodeEditor
      label="Source Code"
      value={code}
      onChange={onChange}
    />
  );
}