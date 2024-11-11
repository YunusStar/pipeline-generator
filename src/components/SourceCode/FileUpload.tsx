import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onFileUpload(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".js,.py,.java,.ts,.tsx,.jsx"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="w-full py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600"
      >
        <Upload size={20} />
        Upload Source Code
      </button>
    </div>
  );
}