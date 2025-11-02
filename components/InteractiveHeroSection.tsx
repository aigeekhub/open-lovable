'use client';

import React, { useRef, useState } from 'react';
import { Spotlight } from './Spotlight';
import { Interactive3DBot } from './Interactive3DBot';
import { Input } from './ui/shadcn/input';
import { Button } from './ui/shadcn/button';

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
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
        className="relative w-full h-screen flex items-center justify-between px-8 lg:px-16"
      >
        {/* Left side - URL Input */}
        <div className="flex-1 max-w-xl z-10">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Enter URL..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1 px-4 py-3 bg-white/10 border border-cyan-300/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <Button
                onClick={handleSubmit}
                disabled={isLoading || !url.trim()}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Go'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - 3D Bot with Spotlight */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          <Interactive3DBot className="relative z-5" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-20" />
      </div>
    </Spotlight>
  );
};

export default InteractiveHeroSection;
