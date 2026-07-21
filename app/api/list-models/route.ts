import { NextRequest, NextResponse } from 'next/server';

type Provider = 'openai' | 'anthropic' | 'groq' | 'google' | 'openrouter';

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
}

const PROVIDER_LABELS: Record<Provider, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  groq: 'Groq',
  google: 'Google',
  openrouter: 'OpenRouter',
};

function getActiveProvider(): Provider {
  if (process.env.OPENROUTER_API_KEY) return 'openrouter';
  if (process.env.AI_GATEWAY_API_KEY) return 'openrouter';
  if (process.env.OPENAI_API_KEY) return 'openai';
  if (process.env.ANTHROPIC_API_KEY) return 'anthropic';
  if (process.env.GROQ_API_KEY) return 'groq';
  if (process.env.GEMINI_API_KEY) return 'google';
  return 'openrouter';
}

async function fetchOpenAIModels(): Promise<ModelInfo[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return [];
  const baseURL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
  const res = await fetch(`${baseURL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error(`OpenAI list failed: ${res.status}`);
  const data = await res.json();
  return (data.data || [])
    .filter((m: any) => !m.id.includes('embed') && !m.id.includes('dall-e') && !m.id.includes('whisper') && !m.id.includes('tts'))
    .map((m: any) => ({ id: m.id, name: m.id, provider: 'openai' }))
    .sort((a: ModelInfo, b: ModelInfo) => a.name.localeCompare(b.name));
}

async function fetchAnthropicModels(): Promise<ModelInfo[]> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return [];
  const baseURL = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1';
  const res = await fetch(`${baseURL}/models`, {
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
  });
  if (!res.ok) throw new Error(`Anthropic list failed: ${res.status}`);
  const data = await res.json();
  return (data.data || [])
    .map((m: any) => ({ id: m.id, name: m.display_name || m.id, provider: 'anthropic' }))
    .sort((a: ModelInfo, b: ModelInfo) => a.name.localeCompare(b.name));
}

async function fetchGroqModels(): Promise<ModelInfo[]> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return [];
  const baseURL = process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1';
  const res = await fetch(`${baseURL}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) throw new Error(`Groq list failed: ${res.status}`);
  const data = await res.json();
  return (data.data || [])
    .filter((m: any) => !m.id.includes('whisper') && !m.id.includes('guard'))
    .map((m: any) => ({ id: m.id, name: m.id, provider: 'groq' }))
    .sort((a: ModelInfo, b: ModelInfo) => a.name.localeCompare(b.name));
}

async function fetchGoogleModels(): Promise<ModelInfo[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return [];
  const baseURL = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com/v1beta';
  const res = await fetch(`${baseURL}/models?key=${apiKey}`);
  if (!res.ok) throw new Error(`Google list failed: ${res.status}`);
  const data = await res.json();
  return (data.models || [])
    .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
    .map((m: any) => ({
      id: m.name.replace('models/', ''),
      name: m.displayName || m.name,
      provider: 'google',
    }))
    .sort((a: ModelInfo, b: ModelInfo) => a.name.localeCompare(b.name));
}

async function fetchOpenRouterModels(): Promise<ModelInfo[]> {
  const apiKey = process.env.OPENROUTER_API_KEY || process.env.AI_GATEWAY_API_KEY;
  const res = await fetch('https://openrouter.ai/api/v1/models', {
    headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
  });
  if (!res.ok) throw new Error(`OpenRouter list failed: ${res.status}`);
  const data = await res.json();
  return (data.data || [])
    .map((m: any) => ({ id: m.id, name: m.name || m.id, provider: 'openrouter' }))
    .sort((a: ModelInfo, b: ModelInfo) => a.name.localeCompare(b.name));
}

const FETCHERS: Record<Provider, () => Promise<ModelInfo[]>> = {
  openai: fetchOpenAIModels,
  anthropic: fetchAnthropicModels,
  groq: fetchGroqModels,
  google: fetchGoogleModels,
  openrouter: fetchOpenRouterModels,
};

export async function GET(req: NextRequest) {
  try {
    const providerParam = req.nextUrl.searchParams.get('provider') as Provider | null;
    const provider = providerParam || getActiveProvider();

    if (!FETCHERS[provider]) {
      return NextResponse.json(
        { error: `Unknown provider: ${provider}` },
        { status: 400 }
      );
    }

    const models = await FETCHERS[provider]();

    return NextResponse.json({
      success: true,
      provider,
      providerLabel: PROVIDER_LABELS[provider],
      models,
    });
  } catch (error) {
    console.error('[list-models] Error:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message, models: [] },
      { status: 500 }
    );
  }
}
