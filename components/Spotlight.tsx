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
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle ${size}px at ${spotlightPos.x}px ${spotlightPos.y}px,
            rgba(255, 255, 255, ${intensity * 0.3}),
            rgba(255, 255, 255, ${intensity * 0.15}) 40%,
            rgba(255, 255, 255, 0) 100%
          )`,
          transition: 'background 0.05s ease-out',
        }}
      />
    </div>
  );
};

export default Spotlight;
