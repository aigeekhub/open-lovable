'use client';

import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      container.style.setProperty('--spotlight-x', `${x}px`);
      container.style.setProperty('--spotlight-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          '--spotlight-x': '0px',
          '--spotlight-y': '0px',
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(
            circle ${size}px at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
            rgba(255, 255, 255, ${intensity * 0.3}),
            rgba(255, 255, 255, ${intensity * 0.15}) 40%,
            rgba(255, 255, 255, 0) 100%
          )`,
          transition: 'background 0.05s ease-out',
        }}
      />
      <style jsx>{`
        @keyframes spotlightPulse {
          0%, 100% {
            opacity: ${intensity};
          }
          50% {
            opacity: ${intensity * 0.7};
          }
        }
      `}</style>
    </div>
  );
};

export default Spotlight;
