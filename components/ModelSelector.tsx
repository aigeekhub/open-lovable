'use client';

import { useState, useEffect, useRef } from 'react';

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
}

interface ModelSelectorProps {
  value: string;
  onChange: (model: string) => void;
  provider?: string;
  disabled?: boolean;
  className?: string;
  fallbackModels?: string[];
  fallbackDisplayNames?: Record<string, string>;
}

export default function ModelSelector({
  value,
  onChange,
  provider,
  disabled = false,
  className = '',
  fallbackModels = [],
  fallbackDisplayNames = {},
}: ModelSelectorProps) {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetchedProviderRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const fetchModels = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = provider ? `?provider=${provider}` : '';
        const res = await fetch(`/api/list-models${params}`);
        const data = await res.json();
        if (!cancelled) {
          if (data.success && data.models?.length > 0) {
            setModels(data.models);
          } else {
            setModels([]);
            if (data.error) setError(data.error);
          }
        }
      } catch (err) {
        if (!cancelled) setError('Failed to load models');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const providerKey = provider || 'auto';
    if (fetchedProviderRef.current !== providerKey) {
      fetchedProviderRef.current = providerKey;
      fetchModels();
    }
    return () => { cancelled = true; };
  }, [provider]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const displayModels: ModelInfo[] = models.length > 0
    ? models
    : fallbackModels.map(id => ({ id, name: fallbackDisplayNames[id] || id, provider: '' }));

  const filteredModels = searchQuery
    ? displayModels.filter(m =>
        m.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayModels;

  const selectedModel = displayModels.find(m => m.id === value);
  const selectedLabel = selectedModel?.name || value || 'Select a model';

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full flex items-center justify-between gap-2 px-3 py-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="truncate">{selectedLabel}</span>
        {loading ? (
          <svg className="animate-spin h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <svg className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 flex flex-col">
          <div className="p-2 border-b border-gray-100">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search models..."
              className="w-full px-2 py-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-orange-500"
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 scrollbar-hide">
            {error && (
              <div className="px-3 py-2 text-xs text-red-600">
                {error}. Using fallback list.
              </div>
            )}
            {filteredModels.length === 0 && !error ? (
              <div className="px-3 py-2 text-xs text-gray-500">No models found</div>
            ) : (
              filteredModels.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => {
                    onChange(model.id);
                    setIsOpen(false);
                    setSearchQuery('');
                  }}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                    value === model.id
                      ? 'bg-orange-50 text-orange-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="truncate">{model.name}</div>
                  {model.id !== model.name && (
                    <div className="text-xs text-gray-400 truncate">{model.id}</div>
                  )}
                </button>
              ))
            )}
          </div>
          {models.length > 0 && (
            <div className="px-3 py-1.5 border-t border-gray-100 text-xs text-gray-400">
              {filteredModels.length} of {models.length} models
            </div>
          )}
        </div>
      )}
    </div>
  );
}
