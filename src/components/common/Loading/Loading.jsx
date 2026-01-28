import React from 'react';

/**
 * Loading Component
 * Displays a loading spinner
 */
const Loading = ({ message = 'Loading...', fullScreen = false }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 ${
      fullScreen ? 'fixed inset-0 bg-black/70 z-[9999]' : ''
    }`}>
      <div className="w-[50px] h-[50px] border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      {message && (
        <p className="mt-4 text-white text-base">{message}</p>
      )}
    </div>
  );
};

export default Loading;
