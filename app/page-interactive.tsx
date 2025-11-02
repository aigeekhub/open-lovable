'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { appConfig } from '@/config/app';
import { HeaderProvider, HeaderWrapper, HeaderDropdownWrapper } from '@/components/shared/layout/header';
import { Connector } from '@/components/shared/effects/connector';
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
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  // Validate URL helper
  const isURL = (str: string): boolean => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/?#][^\s]*)$/i;
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
    <HeaderProvider>
      <div className="min-h-screen bg-black">
        {/* Header/Navigation Section */}
        <HeaderDropdownWrapper />

        <div className="sticky top-0 left-0 w-full z-[101] bg-black header">
          <div className="absolute top-0 cmw-container border-x border-border-faint h-full pointer-events-none" />
          <div className="h-1 bg-border-faint w-full left-0 -bottom-1 absolute" />
          <div className="cmw-container absolute h-full pointer-events-none top-0">
            <Connector className="absolute -left-[10.5px] -bottom-11" />
            <Connector className="absolute -right-[10.5px] -bottom-11" />
          </div>

          <HeaderWrapper>
            <div className="max-w-[900px] mx-auto w-full flex justify-between items-center">
              <div className="flex gap-24 items-center">
                <Link href="/" className="flex items-center gap-3">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    BX3
                  </div>
                  <span className="text-sm font-medium text-text-secondary">AI Lab</span>
                </Link>
              </div>
            </div>
          </HeaderWrapper>
        </div>

        {/* Interactive Hero Section with Spotlight and 3D Bot */}
        <section className="w-full overflow-hidden bg-gradient-to-b from-black via-black/95 to-black" id="home-hero">
          <InteractiveHeroSection 
            onSubmit={handleHeroSubmit}
            isLoading={isSearching}
          />
        </section>
      </div>
    </HeaderProvider>
  );
}
