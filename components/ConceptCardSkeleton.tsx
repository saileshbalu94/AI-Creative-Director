
import React from 'react';

const SkeletonLine: React.FC<{ width: string; className?: string }> = ({ width, className = '' }) => (
  <div className={`bg-gray-200 rounded-md h-4 ${width} ${className}`}></div>
);

const ConceptCardSkeleton: React.FC = () => {
  return (
    <div className="rounded-xl shadow-lg bg-white animate-pulse">
      <div className="p-6">
        <SkeletonLine width="w-1/2" />
        <div className="mt-6 space-y-6">
          <div>
            <SkeletonLine width="w-1/4" className="h-3" />
            <div className="mt-2 space-y-2">
              <SkeletonLine width="w-full" />
              <SkeletonLine width="w-5/6" />
            </div>
          </div>
          <div>
            <SkeletonLine width="w-1/3" className="h-3" />
            <SkeletonLine width="w-2/3 mt-2" />
          </div>
          <div>
            <SkeletonLine width="w-1/4" className="h-3" />
            <SkeletonLine width="w-1/2 mt-2" />
          </div>
           <div>
            <SkeletonLine width="w-1/3" className="h-3" />
            <SkeletonLine width="w-2/3 mt-2" />
          </div>
           <div>
            <SkeletonLine width="w-1/4" className="h-3" />
            <SkeletonLine width="w-1/2 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardSkeleton;
