import React from 'react';

export const LoadingSpinner: React.FC<{ message?: string }> = ({ message = "Processing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <div className="relative w-14 h-14">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-heritage-gold/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-heritage-terracotta border-t-transparent rounded-full animate-spin"></div>
      </div>
      {message && (
        <p className="mt-4 text-sm font-medium text-heritage-slate tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};
