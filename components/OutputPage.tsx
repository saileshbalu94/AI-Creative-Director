import React from 'react';
import { FormData, CreativeConcept } from '../types';
import Spinner from './Spinner';
import { getPlatformProperties } from '../utils/fileUtils';

interface OutputPageProps {
  formData: FormData;
  selectedConcept: CreativeConcept | null;
  finalImage: string | null;
  loading: boolean;
  error: string | null;
  onCreateAnother: () => void;
  onGenerateVariation: () => void;
  onBackToConcepts: () => void;
}

const OutputPage: React.FC<OutputPageProps> = ({ 
  formData, 
  selectedConcept, 
  finalImage, 
  loading, 
  error,
  onCreateAnother,
  onGenerateVariation,
  onBackToConcepts
}) => {
  const imageUrl = finalImage ? `data:image/jpeg;base64,${finalImage}` : '';

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `creative-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { width, height } = getPlatformProperties(formData.platform);

  return (
    <div className="flex-grow bg-gray-100 flex">
      {/* Left Sidebar */}
      <aside className="w-1/3 max-w-sm bg-white p-8 shadow-lg overflow-y-auto">
        <h2 className="text-2xl font-bold text-gray-800">Campaign Summary</h2>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Uploaded Assets</h3>
            <div className="mt-2 flex space-x-2">
              {formData.productPhoto && <img src={formData.productPhoto.preview} className="w-16 h-16 rounded-md object-cover border"/>}
              {formData.talentPhoto && <img src={formData.talentPhoto.preview} className="w-16 h-16 rounded-md object-cover border"/>}
              {formData.brandLogo && <img src={formData.brandLogo.preview} className="w-16 h-16 rounded-md object-contain border"/>}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Details</h3>
            <p className="mt-2 text-sm text-gray-700"><strong>Platform:</strong> {formData.platform}</p>
            <p className="text-sm text-gray-700"><strong>Goal:</strong> {formData.campaignGoal}</p>
          </div>
          {selectedConcept && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Selected Concept</h3>
              <p className="mt-2 text-sm font-bold text-gray-800">{selectedConcept.title}</p>
              <p className="text-sm text-gray-600">{selectedConcept.contextIntent}</p>
            </div>
          )}
        </div>
        <div className="mt-10 border-t pt-6">
          <button 
            onClick={onCreateAnother}
            className="w-full text-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-DEFAULT focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
          >
            Create Another Campaign
          </button>
          <button 
            onClick={onBackToConcepts}
            className="mt-2 w-full text-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-DEFAULT focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT"
          >
           Back to Concepts
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Your Final Creative</h2>
          <div 
            className="mt-8 mx-auto bg-gray-200 rounded-lg shadow-xl flex items-center justify-center overflow-hidden" 
            style={{ aspectRatio: `${width} / ${height}`, maxWidth: `${width}px` }}
          >
            {loading && (
              <div className="text-center p-10">
                <Spinner className="w-16 h-16 text-primary-DEFAULT mx-auto" />
                <p className="mt-4 text-gray-700 font-semibold">Generating your creative...</p>
                <p className="text-sm text-gray-500">This can take a moment.</p>
              </div>
            )}
            {error && !loading && (
                <div className="text-center p-10 bg-red-50 rounded-lg">
                    <p className="text-red-700 font-semibold">An error occurred</p>
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                </div>
            )}
            {finalImage && !loading && !error && (
              <img src={imageUrl} alt="Generated ad creative" className="w-full h-full object-contain" />
            )}
          </div>
          {!loading && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <button 
                onClick={downloadImage}
                disabled={!finalImage}
                className="inline-flex items-center py-2.5 px-5 text-sm font-medium text-white bg-secondary rounded-lg hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 disabled:bg-gray-300"
              >
                Download Creative
              </button>
              <button 
                onClick={onGenerateVariation}
                disabled={!finalImage}
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-DEFAULT focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:bg-gray-300"
              >
                Generate Variation
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OutputPage;
