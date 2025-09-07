import React, { useState } from 'react';
import { FormData, FileWithPreview } from '../types';
import { PLATFORM_OPTIONS, CAMPAIGN_GOALS, FONT_OPTIONS } from '../constants';
import FileUpload from './FileUpload';
import Spinner from './Spinner';
import ColorPalettePicker from './ColorPalettePicker';

interface InputPageProps {
  onSubmit: (data: FormData) => void;
  initialData: FormData;
  loading: boolean;
  error: string | null;
}

const InputPage: React.FC<InputPageProps> = ({ onSubmit, initialData, loading, error }) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (name: keyof FormData, file: FileWithPreview | null) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const handleColorChange = (name: 'primaryBrandColor' | 'secondaryBrandColor', color: string) => {
    setFormData(prev => ({ ...prev, [name]: color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productPhoto) {
      alert('Please upload a product photo.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Create Your Ad Campaign</h2>
          <p className="mt-2 text-sm text-gray-600">Provide the assets and details for the AI to work its magic.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 bg-white p-8 rounded-2xl shadow-lg space-y-10">
          
          <section aria-labelledby="assets-heading">
            <h3 id="assets-heading" className="text-lg leading-6 font-medium text-gray-900">1. Upload Assets</h3>
            <p className="mt-1 text-sm text-gray-500">Provide the visual components for your ad.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FileUpload 
                id="productPhoto" 
                label="Product Photo" 
                helpText="Required. The main subject of the ad."
                onFileChange={(file) => handleFileChange('productPhoto', file)}
                initialFile={formData.productPhoto}
              />
              <FileUpload 
                id="talentPhoto" 
                label="Talent/Model Photo" 
                helpText="Optional. A person to feature in the ad."
                onFileChange={(file) => handleFileChange('talentPhoto', file)}
                initialFile={formData.talentPhoto}
              />
              <FileUpload 
                id="brandLogo" 
                label="Brand Logo" 
                helpText="Optional. PNG with transparency preferred."
                onFileChange={(file) => handleFileChange('brandLogo', file)}
                initialFile={formData.brandLogo}
              />
               <FileUpload 
                id="inspirationPhoto" 
                label="Inspiration Reference" 
                helpText="Optional. A style or mood to emulate."
                onFileChange={(file) => handleFileChange('inspirationPhoto', file)}
                initialFile={formData.inspirationPhoto}
              />
            </div>
          </section>

          <section aria-labelledby="ad-copy-heading">
             <h3 id="ad-copy-heading" className="text-lg leading-6 font-medium text-gray-900">2. Define Ad Copy</h3>
             <p className="mt-1 text-sm text-gray-500">What text should appear in the creative?</p>
             <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="primaryAdText" className="block text-sm font-medium text-gray-700">Primary Ad Text</label>
                    <p className="text-xs text-gray-500" id="adText-char-count">{formData.adText.length}/150 characters.</p>
                  </div>
                  <textarea 
                    id="primaryAdText"
                    name="adText" 
                    value={formData.adText} 
                    onChange={handleChange} 
                    maxLength={150}
                    rows={3} 
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm" 
                    placeholder="Your compelling message..."
                    aria-describedby="adText-char-count"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="ctaText" className="block text-sm font-medium text-gray-700">Call-to-Action Text</label>
                    <p className="text-xs text-gray-500" id="ctaText-char-count">{formData.ctaText.length}/20 characters.</p>
                  </div>
                  <input 
                    type="text" 
                    name="ctaText" 
                    id="ctaText" 
                    value={formData.ctaText} 
                    onChange={handleChange} 
                    maxLength={20} 
                    className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm" 
                    placeholder="Shop Now, Learn More..."
                    aria-describedby="ctaText-char-count"
                  />
                </div>
             </div>
          </section>

          <section aria-labelledby="style-heading">
            <h3 id="style-heading" className="text-lg leading-6 font-medium text-gray-900">3. Define Brand Style</h3>
            <p className="mt-1 text-sm text-gray-500">Customize the look and feel of your ad creative.</p>
            <div className="mt-6">
                <label htmlFor="brandFont" className="block text-sm font-medium text-gray-700">Brand Font</label>
                <select id="brandFont" name="brandFont" value={formData.brandFont} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT">
                  {FONT_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                </select>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ColorPalettePicker 
                    label="Primary Brand Color"
                    selectedColor={formData.primaryBrandColor}
                    onColorChange={(color) => handleColorChange('primaryBrandColor', color)}
                />
                <ColorPalettePicker 
                    label="Secondary Brand Color"
                    selectedColor={formData.secondaryBrandColor}
                    onColorChange={(color) => handleColorChange('secondaryBrandColor', color)}
                />
            </div>
          </section>

          <section aria-labelledby="strategy-heading">
             <h3 id="strategy-heading" className="text-lg leading-6 font-medium text-gray-900">4. Set Campaign Strategy</h3>
             <p className="mt-1 text-sm text-gray-500">Define the goals and target for your campaign.</p>
             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Target Platform</label>
                  <select id="platform" name="platform" value={formData.platform} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT">
                    {PLATFORM_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry/Category</label>
                  <input type="text" name="industry" id="industry" value={formData.industry} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm" placeholder="e.g., Fashion, Technology..." />
                </div>
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Target Audience</label>
                  <input type="text" name="targetAudience" id="targetAudience" value={formData.targetAudience} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm" placeholder="e.g., Young professionals..." />
                </div>
                <div>
                  <label htmlFor="campaignGoal" className="block text-sm font-medium text-gray-700">Campaign Objective</label>
                  <select id="campaignGoal" name="campaignGoal" value={formData.campaignGoal} onChange={handleChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT">
                      {CAMPAIGN_GOALS.map(opt => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
             </div>
          </section>

          <section aria-labelledby="context-heading">
            <h3 id="context-heading" className="text-lg leading-6 font-medium text-gray-900">5. Additional Context</h3>
            <p className="mt-1 text-sm text-gray-500">Any other details, like mood, style, or specific requirements.</p>
            <div className="mt-6">
              <label htmlFor="campaignContext" className="sr-only">Additional Context & Requirements</label>
              <textarea id="campaignContext" name="campaignContext" value={formData.campaignContext} onChange={handleChange} rows={4} maxLength={500} className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-DEFAULT focus:border-primary-DEFAULT text-sm" placeholder="e.g., 'A bright and optimistic mood', 'Focus on eco-friendly materials'..."></textarea>
              <p className="mt-2 text-xs text-gray-500">{formData.campaignContext.length}/500 characters.</p>
            </div>
          </section>

          <div className="text-right pt-4 border-t">
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full md:w-auto inline-flex justify-center items-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-primary-hover hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:bg-indigo-300 disabled:cursor-not-allowed">
              {loading ? <><Spinner /> <span className="ml-2">Generating Concepts...</span></> : 'Generate Creative Concepts'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputPage;
