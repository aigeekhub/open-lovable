# OpenRouter Setup Guide

## ✅ Configuration Complete

Your app is now configured to use OpenRouter! Here's what was set up:

### Environment Variables (`.env.local`)
```env
OPENAI_API_KEY=your_openrouter_api_key  # Replace with your actual key
OPENAI_BASE_URL=https://openrouter.ai/api/v1
```

### Available Models (configured in `config/app.config.ts`)
1. **Claude 3.5 Sonnet** - High quality, excellent for coding (Default)
2. **GPT-4o** - OpenAI's latest flagship model
3. **Gemini 2.0 Flash (Free)** - Google's free model
4. **Llama 3.3 70B** - Meta's latest open model
5. **Qwen 2.5 72B** - Alibaba's powerful model
6. **DeepSeek Chat** - Excellent for code, very affordable

---

## 🚀 Next Steps

### 1. Get Your OpenRouter API Key
1. Sign up at: https://openrouter.ai
2. Go to: https://openrouter.ai/keys
3. Create a new API key
4. Add credits to your account (most models are pay-per-use)

### 2. Get Firecrawl API Key
1. Sign up at: https://firecrawl.dev
2. Get your API key from the dashboard
3. Free tier available

### 3. Update `.env.local`
Open `.env.local` and replace:
- `your_openrouter_api_key` with your actual OpenRouter key
- `your_firecrawl_api_key` with your actual Firecrawl key

### 4. Start the App
```bash
pnpm dev
```

The app will run at: http://localhost:3000

---

## 🎯 Customizing Your Models

To add or change models, edit `config/app.config.ts`:

### Find More Models
Browse all available models at: https://openrouter.ai/models

### Add a New Model
1. Find the model ID on OpenRouter (e.g., `anthropic/claude-3.5-sonnet`)
2. Add it to the `availableModels` array
3. Add a display name to the `modelDisplayNames` object

Example:
```typescript
availableModels: [
  'anthropic/claude-3.5-sonnet',
  'openai/gpt-4o',
  'your-new-model-id'  // Add here
],

modelDisplayNames: {
  'anthropic/claude-3.5-sonnet': 'Claude 3.5 Sonnet',
  'openai/gpt-4o': 'GPT-4o',
  'your-new-model-id': 'Your Model Name'  // Add here
}
```

### Change Default Model
Update the `defaultModel` value:
```typescript
defaultModel: 'your-preferred-model-id',
```

---

## 💰 OpenRouter Pricing Tips

### Free Models
- `google/gemini-2.0-flash-exp:free` - Free, fast
- `meta-llama/llama-3.3-70b-instruct` - Very cheap ($0.18/$0.18 per 1M tokens)

### Best Value for Coding
- `deepseek/deepseek-chat` - Excellent quality, very affordable ($0.14/$0.28 per 1M tokens)
- `qwen/qwen-2.5-72b-instruct` - Great quality, affordable ($0.35/$0.35 per 1M tokens)

### Premium Quality
- `anthropic/claude-3.5-sonnet` - Best overall quality ($3/$15 per 1M tokens)
- `openai/gpt-4o` - Latest from OpenAI ($2.50/$10 per 1M tokens)

Check current pricing at: https://openrouter.ai/models

---

## 🔧 Troubleshooting

### Models not showing in UI?
- Restart the dev server after changing `app.config.ts`
- Check browser console for errors

### API key not working?
- Make sure you added credits to your OpenRouter account
- Verify the key is correct in `.env.local`
- Check that `OPENAI_BASE_URL=https://openrouter.ai/api/v1` is set

### Want to use a specific model?
The model selector dropdown in the app will show all models you configured. Just select the one you want to use.

---

## 📚 Additional Resources

- OpenRouter Docs: https://openrouter.ai/docs
- Model Rankings: https://openrouter.ai/rankings
- API Reference: https://openrouter.ai/docs/api-reference
