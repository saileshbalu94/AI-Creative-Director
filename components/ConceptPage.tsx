
import React, { useState } from 'react';
import { CreativeConcept } from '../types';
import ConceptCardSkeleton from './ConceptCardSkeleton';

interface ConceptPageProps {
  concepts: CreativeConcept[];
  selectedConcept: CreativeConcept | null;
  onSelectConcept: (concept: CreativeConcept) => void;
  onUpdateConcept: (concept: CreativeConcept) => void;
  onSubmit: () => void;
  loading: boolean;
  error: string | null;
}

interface ConceptCardProps {
    concept: CreativeConcept;
    isSelected: boolean;
    onSelect: () => void;
    onUpdate: (updatedConcept: CreativeConcept) => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept, isSelected, onSelect, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableConcept, setEditableConcept] = useState(concept);

    const handleFieldChange = (field: keyof CreativeConcept, value: string) => {
        setEditableConcept(prev => ({...prev, [field]: value}));
    };

    const handleSave = () => {
        onUpdate(editableConcept);
        setIsEditing(false);
    };
    
    const cardContent = (
        <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800">{concept.title}</h3>
            <dl className="mt-4 space-y-4 text-sm">
                <DescriptionItem label="Context & Intent" value={editableConcept.contextIntent} isEditing={isEditing} onChange={(val) => handleFieldChange('contextIntent', val)} type="textarea"/>
                <DescriptionItem label="Lighting Style" value={editableConcept.lightingStyle} isEditing={isEditing} onChange={(val) => handleFieldChange('lightingStyle', val)} />
                <DescriptionItem label="Background Theme" value={editableConcept.backgroundTheme} isEditing={isEditing} onChange={(val) => handleFieldChange('backgroundTheme', val)} />
                <DescriptionItem label="Talent Interaction" value={editableConcept.talentInteraction} isEditing={isEditing} onChange={(val) => handleFieldChange('talentInteraction', val)} />
                <DescriptionItem label="Camera Angle" value={editableConcept.cameraAngle} isEditing={isEditing} onChange={(val) => handleFieldChange('cameraAngle', val)} />
            </dl>
        </div>
    );
    
    return (
        <div className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${isSelected ? 'ring-4 ring-primary-DEFAULT' : 'ring-1 ring-gray-200'} bg-white`}>
            <div onClick={!isEditing ? onSelect : undefined} className={!isEditing ? "cursor-pointer" : ""}>
                {cardContent}
            </div>
             <div className="px-6 pb-4 flex justify-end space-x-2">
                {isEditing ? (
                    <>
                        <button onClick={() => setIsEditing(false)} className="text-sm font-medium text-gray-600 px-3 py-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                        <button onClick={handleSave} className="text-sm font-medium text-white bg-secondary px-3 py-1 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">Save</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="text-sm font-medium text-primary-DEFAULT px-3 py-1 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT">Edit Concept</button>
                )}
            </div>
        </div>
    );
};

const DescriptionItem: React.FC<{label: string, value: string, isEditing: boolean, onChange: (value: string) => void, type?: 'text' | 'textarea'}> = ({label, value, isEditing, onChange, type='text'}) => {
    if (isEditing) {
        return (
            <div>
                <label htmlFor={label} className="block text-sm font-semibold text-gray-800 mb-1">{label}</label>
                {type === 'textarea' ? (
                    <textarea
                        id={label}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        rows={3}
                        className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
                    />
                ) : (
                    <input
                        id={label}
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="w-full text-sm border-gray-300 rounded-md shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
                    />
                )}
            </div>
        );
    }

    return (
        <div>
            <dt className="text-sm font-semibold text-gray-800">{label}</dt>
            <dd className="mt-1 text-sm text-gray-600">{value}</dd>
        </div>
    );
};


const ConceptPage: React.FC<ConceptPageProps> = ({ concepts, selectedConcept, onSelectConcept, onUpdateConcept, onSubmit, loading, error }) => {
  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Select a Creative Concept</h2>
          <p className="mt-2 text-sm text-gray-600">
             {loading ? "Generating unique ideas for your campaign..." : "Choose one of the AI-generated concepts below, or edit one to your liking."}
          </p>
        </div>

        {error && !loading && (
            <div className="mt-12 text-center p-10 bg-red-50 rounded-lg max-w-2xl mx-auto">
                <p className="text-red-700 font-semibold">An error occurred while generating concepts</p>
                <p className="text-sm text-red-600 mt-2">{error}</p>
            </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <>
              <ConceptCardSkeleton />
              <ConceptCardSkeleton />
              <ConceptCardSkeleton />
            </>
          ) : (
            concepts.map((concept) => (
              <ConceptCard 
                key={concept.id}
                concept={concept}
                isSelected={selectedConcept?.id === concept.id}
                onSelect={() => onSelectConcept(concept)}
                onUpdate={onUpdateConcept}
              />
            ))
          )}
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={onSubmit}
            disabled={!selectedConcept || loading}
            className="w-full md:w-auto inline-flex justify-center py-3 px-12 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-primary-hover hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : 'Generate Final Creative'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConceptPage;
