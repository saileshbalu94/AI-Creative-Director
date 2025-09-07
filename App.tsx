
import React, { useState, useCallback } from 'react';
import { Screen, FormData, CreativeConcept, AppState } from './types';
import { INITIAL_FORM_DATA } from './constants';
import LandingPage from './components/LandingPage';
import InputPage from './components/InputPage';
import ConceptPage from './components/ConceptPage';
import OutputPage from './components/OutputPage';
import { generateConcepts, generateFinalCreative } from './services/geminiService';
import ProgressStepper from './components/ProgressStepper';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    screen: Screen.Landing,
    formData: INITIAL_FORM_DATA,
    concepts: [],
    selectedConcept: null,
    finalImage: null,
    loading: false,
    error: null,
  });

  const { screen, formData, concepts, selectedConcept, finalImage, loading, error } = state;

  const setScreen = (newScreen: Screen) => setState(prev => ({ ...prev, screen: newScreen }));

  const handleStartCreating = () => setScreen(Screen.Input);

  const handleGenerateConcepts = async (data: FormData) => {
    // Navigate immediately and set loading state, clearing old concepts
    setState(prev => ({ ...prev, loading: true, error: null, formData: data, screen: Screen.Concept, concepts: [] }));
    try {
      const generatedConcepts = await generateConcepts(data);
      setState(prev => ({ ...prev, concepts: generatedConcepts, loading: false }));
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while generating concepts.';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    }
  };
  
  const handleSelectConcept = (concept: CreativeConcept) => {
    setState(prev => ({ ...prev, selectedConcept: concept }));
  };

  const handleUpdateConcept = (updatedConcept: CreativeConcept) => {
    setState(prev => ({
        ...prev,
        concepts: prev.concepts.map(c => c.id === updatedConcept.id ? updatedConcept : c),
        selectedConcept: prev.selectedConcept?.id === updatedConcept.id ? updatedConcept : prev.selectedConcept
    }));
  };

  const handleGenerateFinal = async () => {
    if (!selectedConcept) return;
    setState(prev => ({ ...prev, loading: true, error: null, screen: Screen.Output }));
    try {
      const generatedImage = await generateFinalCreative(formData, selectedConcept);
      setState(prev => ({ ...prev, finalImage: generatedImage, loading: false }));
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while generating the final creative.';
      setState(prev => ({ ...prev, error: errorMessage, loading: false }));
    }
  };

  const handleCreateAnother = () => {
    setState({
      ...state,
      screen: Screen.Input,
      concepts: [],
      selectedConcept: null,
      finalImage: null,
      error: null,
      // Keep formData from previous run for easier iteration
    });
  };
  
  const handleBackToConcepts = () => {
    setState(prev => ({...prev, screen: Screen.Concept, finalImage: null, error: null}));
  }

  const renderScreen = () => {
    switch (screen) {
      case Screen.Landing:
        return <LandingPage onStart={handleStartCreating} />;
      case Screen.Input:
        return <InputPage onSubmit={handleGenerateConcepts} initialData={formData} loading={loading} error={error} />;
      case Screen.Concept:
        return <ConceptPage 
            concepts={concepts} 
            selectedConcept={selectedConcept}
            onSelectConcept={handleSelectConcept}
            onUpdateConcept={handleUpdateConcept}
            onSubmit={handleGenerateFinal}
            loading={loading}
            error={error}
        />;
      case Screen.Output:
        return <OutputPage 
          formData={formData} 
          selectedConcept={selectedConcept}
          finalImage={finalImage} 
          loading={loading}
          error={error}
          onCreateAnother={handleCreateAnother} 
          onGenerateVariation={handleGenerateFinal}
          onBackToConcepts={handleBackToConcepts}
        />;
      default:
        return <LandingPage onStart={handleStartCreating} />;
    }
  };

  const steps = [
    { name: 'Home', screen: Screen.Landing, isClickable: true },
    { name: 'Requirements', screen: Screen.Input, isClickable: true },
    { name: 'Concept', screen: Screen.Concept, isClickable: state.concepts.length > 0 || state.screen >= Screen.Concept },
    { name: 'Output', screen: Screen.Output, isClickable: state.finalImage !== null || state.screen === Screen.Output },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
       {screen !== Screen.Landing && (
        <header>
          <ProgressStepper 
            steps={steps}
            currentScreen={screen}
            onNavigate={setScreen}
          />
        </header>
      )}
      <main className="flex-grow flex flex-col">
        {renderScreen()}
      </main>
    </div>
  );
};

export default App;
