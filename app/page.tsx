"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { appConfig } from "@/config/app.config";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const isURL = (str: string): boolean => {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
    return urlPattern.test(str.trim());
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please describe your AI vision or enter a URL to clone");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const inputValue = prompt.trim();

      if (isURL(inputValue)) {
        sessionStorage.setItem('targetUrl', inputValue);
        sessionStorage.setItem('selectedModel', appConfig.ai.defaultModel);
        sessionStorage.setItem('autoStart', 'true');
      } else {
        sessionStorage.setItem('promptOnly', 'true');
        sessionStorage.setItem('initialPrompt', inputValue);
        sessionStorage.setItem('selectedModel', appConfig.ai.defaultModel);
        sessionStorage.setItem('autoStart', 'true');
      }

      router.push('/generation');
    } catch (err) {
      setError("Failed to start generation. Please try again.");
      setIsGenerating(false);
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
                  placeholder="Enter a URL to clone or describe what you want to build..."
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                />
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className={`px-6 py-3 rounded-xl font-medium transition-all transform shadow-lg ${
                    isGenerating || !prompt.trim()
                      ? 'bg-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-blue-500/30'
                  }`}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Generate'
                  )}
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>Try: <span className="text-blue-400">example.com</span> to clone a website</p>
            <p className="mt-1">or: <span className="text-purple-400">Build a landing page for SaaS product</span></p>
          </div>
        </div>

        {/* Feature Cards */}
        <div id="features" className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Website Cloning */}
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
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                Instant Website Cloning
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                Clone any website in seconds with AI-powered scraping and intelligent code generation
              </p>
            </div>
          </div>

          {/* AI Code Generation */}
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                AI Code Generation
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                Generate production-ready React code from simple prompts with context-aware AI assistance
              </p>
            </div>
          </div>

          {/* Live Preview */}
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
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center text-blue-200">
                Live Sandbox Preview
              </h3>
              <p className="text-gray-400 text-center text-sm leading-relaxed">
                See your changes instantly with hot-reload sandboxes powered by E2B and Vercel
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
