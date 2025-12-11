"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BuildStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete';
}

export default function HyperBuildingAnimation() {
  const [steps, setSteps] = useState<BuildStep[]>([
    { id: '1', label: 'Analyzing dependencies', status: 'pending' },
    { id: '2', label: 'Installing packages', status: 'pending' },
    { id: '3', label: 'Compiling components', status: 'pending' },
    { id: '4', label: 'Optimizing assets', status: 'pending' },
    { id: '5', label: 'Building application', status: 'pending' },
  ]);

  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= steps.length) {
          clearInterval(interval);
          return prev;
        }

        setSteps((prevSteps) =>
          prevSteps.map((step, idx) => ({
            ...step,
            status: idx < next ? 'complete' : idx === next ? 'active' : 'pending',
          }))
        );

        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 1, 100);
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden z-50">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{
              backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>
      </div>

      {/* Floating code blocks */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-xs text-emerald-400/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: -50,
              rotate: Math.random() * 360,
            }}
            animate={{
              y: window.innerHeight + 50,
              rotate: Math.random() * 360 + 360,
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'linear',
            }}
          >
            {`<${['div', 'span', 'button', 'section'][Math.floor(Math.random() * 4)]} />`}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            animate={{
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            Building Your App
          </motion.h2>
          <p className="text-slate-400 text-sm font-mono">
            Compiling magic into reality...
          </p>
        </motion.div>

        {/* Progress bar container */}
        <div className="mb-12">
          <div className="relative h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50 backdrop-blur-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />

            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Progress percentage */}
          <motion.div
            className="text-right mt-2 text-sm font-mono text-emerald-400"
            key={progress}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {progress}%
          </motion.div>
        </div>

        {/* Build steps */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative flex items-center gap-4 p-4 rounded-lg border backdrop-blur-sm
                  ${
                    step.status === 'complete'
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : step.status === 'active'
                      ? 'bg-teal-500/10 border-teal-500/30'
                      : 'bg-slate-800/30 border-slate-700/30'
                  }
                `}
              >
                {/* Status icon */}
                <div className="flex-shrink-0">
                  {step.status === 'complete' && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>
                  )}

                  {step.status === 'active' && (
                    <motion.div
                      className="w-8 h-8 border-3 border-teal-400 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  )}

                  {step.status === 'pending' && (
                    <div className="w-8 h-8 bg-slate-700 rounded-full opacity-30" />
                  )}
                </div>

                {/* Step label */}
                <div className="flex-grow">
                  <motion.p
                    className={`font-medium ${
                      step.status === 'complete'
                        ? 'text-emerald-400'
                        : step.status === 'active'
                        ? 'text-teal-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {step.label}
                  </motion.p>
                </div>

                {/* Active indicator particles */}
                {step.status === 'active' && (
                  <div className="absolute right-4">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{
                          x: [0, 10 + i * 5, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom info */}
        <motion.div
          className="mt-8 text-center"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <p className="text-xs text-slate-500 font-mono">
            This may take a few moments...
          </p>
        </motion.div>
      </div>

      {/* Accent corner animations */}
      {[
        { top: '10%', left: '5%' },
        { top: '10%', right: '5%' },
        { bottom: '10%', left: '5%' },
        { bottom: '10%', right: '5%' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20"
          style={pos}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <div className="w-full h-full border-2 border-emerald-500/20 rounded-lg" />
        </motion.div>
      ))}
    </div>
  );
}
