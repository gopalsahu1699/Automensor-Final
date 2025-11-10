import React from 'react';
import { Home, Zap } from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[70vh] bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Animated Background Circle */}
      <div className="relative">
        {/* Outer Ping Circle */}
        <div className="absolute inset-0 w-24 h-24 -ml-2 -mt-2 border-4 border-blue-200 rounded-full animate-ping opacity-50"></div>
        
        {/* Main Spinner */}
        <div className="relative w-20 h-20 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin">
          {/* Inner Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Home className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 text-center">
        <div className="flex items-center gap-2 justify-center mb-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <p className="text-lg font-semibold text-gray-800">Loading...</p>
        </div>
        
        {/* Animated Dots */}
        <div className="flex justify-center gap-2 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
