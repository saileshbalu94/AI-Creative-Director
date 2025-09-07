import React from 'react';
import { downloadLogs } from '../services/loggingService';
import DownloadIcon from './icons/DownloadIcon';

const LogDownloader: React.FC = () => {
  return (
    <button
      onClick={downloadLogs}
      title="Download API Logs"
      className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors z-50"
      aria-label="Download API Logs"
    >
      <DownloadIcon className="h-6 w-6" />
    </button>
  );
};

export default LogDownloader;
