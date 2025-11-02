'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Interactive3DBotProps {
  className?: string;
}

export const Interactive3DBot: React.FC<Interactive3DBotProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePos({ x, y });

      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      setRotationX(-deltaY * 15);
      setRotationY(deltaX * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center perspective ${className}`}
      style={{ 
        perspective: '1000px',
        minHeight: '400px'
      }}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          transition: 'transform 0.1s ease-out',
        }}
        className="relative w-40 h-40 flex items-center justify-center"
      >
        {/* 3D Cube-like bot shape */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Front face */}
          <div
            style={{
              transform: 'translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg opacity-90 flex items-center justify-center border border-cyan-300"
          >
            <div className="text-2xl font-bold text-white">AI</div>
          </div>

          {/* Back face */}
          <div
            style={{
              transform: 'rotateY(180deg) translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg opacity-90 flex items-center justify-center border border-pink-300"
          >
            <div className="text-2xl font-bold text-white">BOT</div>
          </div>

          {/* Right face */}
          <div
            style={{
              transform: 'rotateY(90deg) translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg opacity-90 flex items-center justify-center border border-indigo-300"
          >
            <div className="text-2xl font-bold text-white">3D</div>
          </div>

          {/* Left face */}
          <div
            style={{
              transform: 'rotateY(-90deg) translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg opacity-90 flex items-center justify-center border border-teal-300"
          >
            <div className="text-2xl font-bold text-white">✦</div>
          </div>

          {/* Top face */}
          <div
            style={{
              transform: 'rotateX(90deg) translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg opacity-90 flex items-center justify-center border border-cyan-200"
          >
            <div className="w-full h-full rounded-lg bg-gradient-to-b from-white/20 to-transparent" />
          </div>

          {/* Bottom face */}
          <div
            style={{
              transform: 'rotateX(-90deg) translateZ(64px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute w-full h-full bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg opacity-90 flex items-center justify-center border border-cyan-400"
          >
            <div className="w-full h-full rounded-lg" />
          </div>
        </div>

        {/* Glow effect around bot */}
        <div className="absolute inset-0 -m-4 rounded-full border-2 border-cyan-400 opacity-30 animate-pulse" />
        <div className="absolute inset-0 -m-8 rounded-full border border-blue-400 opacity-20" />
      </div>

      {/* Light source indicator following mouse */}
      <div
        style={{
          position: 'absolute',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        className="w-2 h-2 bg-yellow-300 rounded-full blur-sm opacity-60 shadow-lg shadow-yellow-300"
      />
    </div>
  );
};

export default Interactive3DBot;
