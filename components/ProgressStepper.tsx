
import React from 'react';
import { Screen } from '../types';
import HomeIcon from './icons/HomeIcon';

interface Step {
  name: string;
  screen: Screen;
  isClickable: boolean;
}

interface ProgressStepperProps {
  steps: Step[];
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}


const ProgressStepper: React.FC<ProgressStepperProps> = ({ steps, currentScreen, onNavigate }) => {
    const currentStepIndex = steps.findIndex(step => step.screen === currentScreen);
    
    return (
        <nav aria-label="Progress" className="py-2 px-4 sm:px-6 lg:px-8">
            <ol role="list" className="max-w-4xl mx-auto md:flex">
                {steps.map((step, stepIdx) => {
                    const isCurrent = stepIdx === currentStepIndex;
                    const isCompleted = stepIdx < currentStepIndex;

                    return (
                        <li key={step.name} className="relative md:flex-1 md:flex">
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (step.isClickable) onNavigate(step.screen);
                                }}
                                className={`group flex items-center w-full ${step.isClickable ? '' : 'cursor-not-allowed'}`}
                                aria-current={isCurrent ? 'step' : undefined}
                            >
                                <span className="px-6 py-1.5 flex items-center text-sm font-medium">
                                    <span
                                        className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${
                                            isCurrent 
                                                ? 'border-2 border-primary-DEFAULT' 
                                                : isCompleted 
                                                    ? 'bg-primary-DEFAULT group-hover:bg-primary-hover'
                                                    : 'border-2 border-gray-400 group-hover:border-gray-500'
                                        }`}
                                    >
                                        {isCompleted ? (
                                            stepIdx === 0 ? (
                                                <HomeIcon className="w-6 h-6 text-white" />
                                            ) : (
                                                <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.454-12.68a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                                </svg>
                                            )
                                        ) : (
                                            <span className={`${
                                                isCurrent 
                                                    ? 'text-primary-DEFAULT' 
                                                    : step.isClickable ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-400'
                                            }`}>
                                                { stepIdx === 0 ? <HomeIcon className="w-6 h-6" /> : `0${stepIdx}` }
                                            </span>
                                        )}
                                    </span>
                                    <span className={`ml-4 text-sm font-medium ${
                                        isCurrent 
                                            ? 'text-primary-DEFAULT'
                                            : isCompleted
                                                ? 'text-gray-900'
                                                : step.isClickable ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-400'
                                    }`}>
                                        {step.name}
                                    </span>
                                </span>
                            </a>
                            {stepIdx < steps.length - 1 ? (
                                <>
                                    <div className="hidden md:block absolute top-0 right-0 h-full w-5" aria-hidden="true">
                                        <svg className="h-full w-full text-gray-400" viewBox="0 0 22 80" fill="none" preserveAspectRatio="none">
                                            <path d="M0.5 0L20.5 40L0.5 80" stroke="currentColor" vectorEffect="non-scaling-stroke" />
                                        </svg>
                                    </div>
                                </>
                            ) : null}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default ProgressStepper;
