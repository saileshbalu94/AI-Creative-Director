
import React from 'react';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16.414l-2.293-2.293a1 1 0 010-1.414L12 8l2.293 2.293a1 1 0 010 1.414L10 16.414m5-13l2.293 2.293a1 1 0 010 1.414L10 16.414l-2.293-2.293a1 1 0 010-1.414L12 8l2.293 2.293a1 1 0 010 1.414L10 16.414" />
  </svg>
);

export default SparklesIcon;
