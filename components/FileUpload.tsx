
import React, { useState, useCallback, useEffect } from 'react';
import { FileWithPreview } from '../types';

interface FileUploadProps {
  id: string;
  label: string;
  helpText: string;
  onFileChange: (file: FileWithPreview | null) => void;
  className?: string;
  initialFile?: FileWithPreview | null;
}

const FileUpload: React.FC<FileUploadProps> = ({ id, label, helpText, onFileChange, className = '', initialFile }) => {
  const [file, setFile] = useState<FileWithPreview | null>(initialFile || null);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    return () => {
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
    };
  }, [file]);
  
  const handleFileChange = (selectedFile: File | null) => {
    if (file) {
        URL.revokeObjectURL(file.preview);
    }
    if (selectedFile && (selectedFile.type.startsWith('image/jpeg') || selectedFile.type.startsWith('image/png')) && selectedFile.size <= 10 * 1024 * 1024) {
      const fileWithPreview = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      });
      setFile(fileWithPreview);
      onFileChange(fileWithPreview);
    } else {
      setFile(null);
      onFileChange(null);
      if(selectedFile) alert('Please upload a JPG or PNG file under 10MB.');
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLLabelElement>, over: boolean) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(over);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      handleDragEvents(e, false);
      const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0];
      handleFileChange(droppedFile);
  };

  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleFileChange(null);
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <label
        onDragEnter={(e) => handleDragEvents(e, true)}
        onDragLeave={(e) => handleDragEvents(e, false)}
        onDragOver={(e) => handleDragEvents(e, true)}
        onDrop={handleDrop}
        htmlFor={id}
        className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer transition-colors ${isDragOver ? 'border-primary-DEFAULT bg-indigo-50' : 'hover:border-gray-400'}`}
      >
        <div className="space-y-1 text-center relative w-full">
          {file ? (
            <div>
              <img src={file.preview} alt="Preview" className="mx-auto h-24 w-auto object-contain rounded-md" />
               <button onClick={handleRemove} className="absolute top-0 right-0 -mt-2 -mr-2 bg-white rounded-full p-1 shadow-md text-gray-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="flex text-sm text-gray-600">
                <span className="relative rounded-md font-medium text-primary-DEFAULT hover:text-primary-hover focus-within:outline-none">
                  <span>Upload a file</span>
                  <input id={id} name={id} type="file" className="sr-only" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                </span>
                <p className="pl-1">or drag and drop</p>
              </div>
            </>
          )}
        </div>
      </label>
      <p className="mt-2 text-xs text-gray-500">{helpText}</p>
    </div>
  );
};

export default FileUpload;
