"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (prompt.trim()) {
      console.log("Generating:", prompt);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/a3f2df72-35db-43c1-a0b1-f5fc167f2bc9.png"
              alt="BX3 Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BX3 Developer
            </span>
            <span className="text-[10px] text-gray-400 -mt-1">Boos Bot Builder</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#home" className="text-sm text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="#contact" className="text-sm text-gray-300 hover:text-white transition-colors">
            Contact
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent leading-tight">
            BX3 Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Next-Generation AI Development Platform
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-sm text-gray-300">
              Quantum-Powered · Neural-Enhanced · Future-Ready
            </span>
          </div>
        </div>

        {/* Main Input */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-[#1a1f3a] border border-blue-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <svg
                  className="w-6 h-6 text-gray-400 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGenerate();
                  }}
                  placeholder="Describe your AI vision and watch it come to life..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <button
                  onClick={handleGenerate}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Neural AI Architecture */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#141829] border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition-all">
              <div className="w-16 h-16 mb-6 mx-auto">
                <svg
                  className="w-full h-full text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                Neural AI Architecture
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                Build advanced AI systems with quantum-enhanced neural networks and distributed computing frameworks
              </p>
            </div>
          </div>

          {/* Real-Time Analytics */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#141829] border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition-all">
              <div className="w-16 h-16 mb-6 mx-auto">
                <svg
                  className="w-full h-full text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                Real-Time Analytics
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                Monitor, analyze, and optimize your AI models with live performance insights and predictive analytics
              </p>
            </div>
          </div>

          {/* Quantum Deployment */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-[#141829] border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm hover:border-blue-500/40 transition-all">
              <div className="w-16 h-16 mb-6 mx-auto">
                <svg
                  className="w-full h-full text-pink-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                Quantum Deployment
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                Deploy production-ready AI solutions with zero-downtime infrastructure and infinite scalability
              </p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .stars-container {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          animation: twinkle linear infinite;
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  );
}
