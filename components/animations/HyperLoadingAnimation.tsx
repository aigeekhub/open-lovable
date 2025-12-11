"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HyperLoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center overflow-hidden z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Orbital rings */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border-2 rounded-full"
              style={{
                width: `${80 + ring * 60}px`,
                height: `${80 + ring * 60}px`,
                borderColor: `rgba(6, 182, 212, ${0.3 - ring * 0.1})`,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
                scale: [1, 1.05, 1],
              }}
              transition={{
                rotate: {
                  duration: 3 + ring * 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            />
          ))}

          {/* Center pulsing core */}
          <motion.div
            className="absolute w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 20px rgba(6, 182, 212, 0.5)",
                "0 0 60px rgba(6, 182, 212, 0.8)",
                "0 0 20px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Orbiting particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute w-3 h-3 bg-cyan-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  left: `${80 + Math.cos((i * 45 * Math.PI) / 180) * 100}px`,
                  top: `${Math.sin((i * 45 * Math.PI) / 180) * 100}px`,
                }}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"
              />
            </motion.div>
          ))}
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading
          </motion.div>

          {/* Animated dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-3 h-3 bg-cyan-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: dot * 0.2,
                }}
              />
            ))}
          </div>

          {/* Status text with glitch effect */}
          <motion.div
            className="text-sm text-cyan-300/70 font-mono mt-4"
            animate={{
              x: [-2, 2, -2, 2, 0],
              textShadow: [
                "0 0 10px rgba(6, 182, 212, 0.5)",
                "0 0 20px rgba(6, 182, 212, 0.8)",
                "0 0 10px rgba(6, 182, 212, 0.5)",
              ],
            }}
            transition={{
              x: {
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 3,
              },
              textShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            Initializing systems...
          </motion.div>
        </div>
      </div>

      {/* Corner accent lines */}
      {[
        { top: 0, left: 0, rotate: 0 },
        { top: 0, right: 0, rotate: 90 },
        { bottom: 0, right: 0, rotate: 180 },
        { bottom: 0, left: 0, rotate: 270 },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ ...pos }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <svg width="100" height="100" className="text-cyan-500/30">
            <path
              d="M 0 0 L 100 0 L 100 20 M 0 0 L 0 100 L 20 100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
