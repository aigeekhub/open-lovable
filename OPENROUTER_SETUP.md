# OpenRouter Integration Guide

This project now supports **OpenRouter** as the primary AI gateway, allowing you to access multiple AI providers through a single API key.

## What is OpenRouter?

OpenRouter is a unified API gateway that provides access to multiple AI models from different providers (OpenAI, Anthropic, Google, Meta, etc.) through a single API key and billing account.

## Benefits of Using OpenRouter

1. **Single API Key**: Access all AI models with one key
2. **Pay-as-you-go**: Only pay for what you use
3. **No Rate Limits**: OpenRouter handles rate limiting across providers
4. **Cost Tracking**: Track usage and costs across all models
5. **Fallback Support**: Automatic fallback to alternative models if one is down
6. **Latest Models**: Access to the newest models from all providers

## Setup Instructions

### 1. Get Your OpenRouter API Key

1. Go to [OpenRouter.ai](https://openrouter.ai)
2. Sign up for a free account
3. Navigate to **Settings** → **API Keys**
4. Generate a new API key
5. Add credits to your account (minimum $5 recommended)

### 2. Configure Your Environment

Open your `.env` file and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

That's it! Once the `OPENROUTER_API_KEY` is set, all AI requests will automatically route through OpenRouter.

### 3. Model Selection

You can use any model available on OpenRouter by specifying its full model ID. The configured models include:

- `openai/gpt-5` - GPT-5 (if available)
- `anthropic/claude-sonnet-4-20250514` - Claude Sonnet 4
- `google/gemini-3-pro-preview` - Gemini 3 Pro
- `moonshotai/kimi-k2-instruct-0905` - Kimi K2

To use other OpenRouter models, just specify the full model path as listed on [OpenRouter Models](https://openrouter.ai/models).

## How It Works

When `OPENROUTER_API_KEY` is set in your environment:

1. The provider manager detects OpenRouter is configured
2. All model requests are routed through OpenRouter's API
3. OpenRouter handles authentication, rate limiting, and provider selection
4. Your app receives responses using the standard OpenAI-compatible format

## Alternative Configuration

If you prefer to use individual provider keys instead of OpenRouter:

1. Remove or comment out `OPENROUTER_API_KEY` from your `.env`
2. Add individual provider keys:

```env
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key
```

## Troubleshooting

### Authentication Errors

If you see authentication errors:
- Verify your API key is correct
- Check that you have credits in your OpenRouter account
- Ensure the model ID is correct

### Model Not Found Errors

If you get "model not found":
- Check the model ID matches exactly what's on OpenRouter
- Verify the model is available and not deprecated
- Some models require special access or approval

### Rate Limiting

OpenRouter automatically handles rate limiting across providers. If you still encounter rate limits:
- Check your OpenRouter dashboard for usage limits
- Consider upgrading your plan or adding more credits

## Cost Management

Monitor your usage on the OpenRouter dashboard:
1. Go to [OpenRouter Dashboard](https://openrouter.ai/activity)
2. View real-time usage and costs per model
3. Set spending limits to control costs
4. Export usage data for analysis

## Support

- OpenRouter Documentation: https://openrouter.ai/docs
- OpenRouter Discord: https://discord.gg/openrouter
- Email Support: support@openrouter.ai
