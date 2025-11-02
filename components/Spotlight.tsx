'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SpotlightProps {
  className?: string;
  size?: number;
  intensity?: number;
}

export const Spotlight: React.FC<SpotlightProps> = ({ 
  className = '', 
  size = 300,
  intensity = 0.8 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  if (!mounted) {
    return <div className={`relative overflow-hidden ${className}`} />;
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a2e 50%, #0f0f23 100%)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle ${size}px at ${spotlightPos.x}px ${spotlightPos.y}px,
            rgba(0, 255, 255, ${intensity * 0.4}),
            rgba(0, 150, 255, ${intensity * 0.2}) 40%,
            rgba(0, 100, 200, 0) 100%
          )`,
          transition: 'background 0.05s ease-out',
          mixBlendMode: 'screen',
        }}
      />
      {/* Background glow elements */}
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1), transparent 50%)',
      }} />
      <div className="absolute inset-0 opacity-20" style={{
        background: 'radial-gradient(circle at 80% 80%, rgba(100, 150, 255, 0.1), transparent 50%)',
      }} />
    </div>
  );
};

export default Spotlight;
