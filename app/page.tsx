'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { appConfig } from '@/config/app.config';
import { InteractiveHeroSection } from '@/components/InteractiveHeroSection';

interface SearchResult {
  url: string;
  title: string;
  description: string;
  screenshot: string | null;
  markdown: string;
}

export default function HomePage() {
  const [selectedStyle, setSelectedStyle] = useState('1');
  const [selectedModel, setSelectedModel] = useState(appConfig.ai.defaultModel);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Validate URL helper
  const isURL = (str: string): boolean => {
    const urlRegex = /^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6}))([\/?#][^\s]*)$/i;
    return urlRegex.test(str);
  };

  const handleHeroSubmit = (url: string) => {
    if (!url.trim()) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (isURL(url)) {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`;
      sessionStorage.setItem('targetUrl', targetUrl);
      sessionStorage.setItem('selectedStyle', selectedStyle);
      sessionStorage.setItem('selectedModel', selectedModel);
      sessionStorage.setItem('autoStart', 'true');
      router.push('/generation');
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header/Navigation Section */}
      <div className="sticky top-0 left-0 w-full z-[101] bg-black header border-b border-border-faint">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              BX3
            </div>
            <span className="text-sm font-medium text-text-secondary">AI Lab</span>
          </Link>
        </div>
      </div>

      {/* Interactive Hero Section with Spotlight and 3D Bot */}
      <section className="w-full overflow-hidden bg-gradient-to-b from-black via-black/95 to-black" id="home-hero">
        <InteractiveHeroSection 
          onSubmit={handleHeroSubmit}
          isLoading={isSearching}
        />
      </section>
    </div>
  );
}
