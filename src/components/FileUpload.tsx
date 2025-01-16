import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { FileContent } from '../types';

interface FileUploadProps {
  onFileUpload: (file: FileContent) => void;
}

export function FileUpload({ onFileUpload }: FileUploadProps) {
  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        const content = await file.text();
        onFileUpload({ name: file.name, content });
      }
    },
    [onFileUpload]
  );

  const handleFileInput = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const content = await file.text();
        onFileUpload({ name: file.name, content });
      }
    },
    [onFileUpload]
  );

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer bg-gray-50"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Drag and drop your file here
          </p>
          <p className="text-sm text-gray-500">or</p>
          <label className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
            Browse Files
            <input
              type="file"
              className="hidden"
              onChange={handleFileInput}
              accept=".txt,.md,.json,.csv"
            />
          </label>
        </div>
      </div>
    </div>
  );
}