'use client';

import React, { useRef, useState } from 'react';
import { Spotlight } from './Spotlight';
import { Interactive3DBot } from './Interactive3DBot';

interface InteractiveHeroSectionProps {
  onSubmit?: (url: string) => void;
  isLoading?: boolean;
}

export const InteractiveHeroSection: React.FC<InteractiveHeroSectionProps> = ({ 
  onSubmit,
  isLoading = false 
}) => {
  const [url, setUrl] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (url.trim()) {
      onSubmit?.(url.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Spotlight 
      className="w-full min-h-screen bg-black/50" 
      size={400} 
      intensity={0.6}
    >
      <div
        ref={heroRef}
        className="relative z-10 w-full h-screen flex items-center justify-between px-8 lg:px-16"
      >
        {/* Left side - URL Input */}
        <div className="flex-1 max-w-xl z-20 relative">
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border-2 border-cyan-400/70 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-cyan-300 focus:bg-cyan-900/60 transition-all shadow-lg shadow-cyan-500/20"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !url.trim()}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-lg transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70"
              >
                {isLoading ? '...' : 'GO'}
              </button>
            </div>
          </div>
        </div>

        {/* Right side - 3D Bot with Spotlight */}
        <div className="flex-1 flex items-center justify-center relative z-20">
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/20 to-transparent opacity-100 transition-opacity duration-300" />
          <Interactive3DBot className="relative z-10" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20" />
      </div>
    </Spotlight>
  );
};

export default InteractiveHeroSection;
