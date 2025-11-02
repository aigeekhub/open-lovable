# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Open Lovable is an AI-powered web application builder that enables users to chat with AI to generate React applications instantly. The application uses Next.js 15 with App Router, integrates with multiple LLM providers (Anthropic, OpenAI, Google, Groq), and manages sandboxed environments (Vercel Sandbox or E2B) for code execution and preview.

### Core Technology Stack
- **Framework**: Next.js 15 with App Router (Turbopack enabled)
- **Language**: TypeScript (strict mode)
- **UI**: React 19, Tailwind CSS, Radix UI components, Framer Motion
- **State Management**: Jotai atoms
- **AI Integration**: Vercel AI SDK, supports multiple providers via AI Gateway
- **Sandbox Providers**: Vercel Sandbox (default) or E2B

## Development Commands

### Running the Application
```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

**Note**: Use `pnpm` (preferred), `npm`, or `yarn`. The project includes lock files for all three.

### Environment Setup
1. Copy `.env.example` to `.env.local`
2. Required: `FIRECRAWL_API_KEY` for web scraping
3. Choose sandbox provider:
   - **Vercel Sandbox** (default): Set `SANDBOX_PROVIDER=vercel` and configure OIDC token or PAT
   - **E2B**: Set `SANDBOX_PROVIDER=e2b` and provide `E2B_API_KEY`
4. Configure at least one AI provider or use AI Gateway

### Vercel Sandbox Authentication
```bash
# Method A: OIDC Token (recommended for development)
vercel link
vercel env pull  # Generates VERCEL_OIDC_TOKEN automatically

# Method B: Personal Access Token (for production)
# Set VERCEL_TEAM_ID, VERCEL_PROJECT_ID, and VERCEL_TOKEN in .env.local
```

## Architecture Overview

### Request Flow
```
User Input → Next.js API Routes → AI Provider → Sandbox Manager → Preview
     ↓                                                    ↓
Conversation State                              File Operations
```

### Core Directories

#### `/app`
Next.js App Router pages and API routes:
- **`/builder`**: Main builder interface page
- **`/generate`**: Initial generation page
- **`/api/*`**: API routes for AI code generation, sandbox management, file operations

Key API routes:
- `generate-ai-code-stream`: Main streaming endpoint for AI code generation with context-aware editing
- `apply-ai-code-stream`: Applies AI-generated code with real-time feedback
- `create-ai-sandbox-v2`: Creates new Vercel or E2B sandbox instances
- `install-packages-v2`: Package installation with XML tag detection
- `scrape-url-enhanced`: Enhanced web scraping using Firecrawl

#### `/lib`
Core business logic:
- **`sandbox/`**: Sandbox provider abstraction layer
  - `factory.ts`: Factory pattern for creating provider instances
  - `sandbox-manager.ts`: Unified sandbox management interface
  - `types.ts`: Abstract `SandboxProvider` class defining the contract
- **`context-selector.ts`**: Intelligent file selection for AI context
- **`edit-intent-analyzer.ts`**: Analyzes user intent to determine targeted vs comprehensive edits
- **`file-search-executor.ts`**: Executes agentic file search for edit operations
- **`morph-fast-apply.ts`**: Fast code application using Morph API (optional)

#### `/types`
TypeScript type definitions:
- `conversation.ts`: Conversation state and message tracking
- `sandbox.ts`: Sandbox file management and global state
- `file-manifest.ts`: File structure and metadata types

#### `/config`
- `app.config.ts`: Centralized configuration for sandbox timeouts, AI models, package installation, file management

#### `/components`
Reusable UI components (Radix UI-based)

#### `/atoms`
Jotai atoms for global state management

#### `/hooks`
Custom React hooks

#### `/utils`
Utility functions

## Key Patterns and Conventions

### Sandbox Provider Pattern
The application uses an abstract factory pattern for sandbox providers:
- All providers implement the `SandboxProvider` abstract class
- Use `SandboxManager.getInstance()` to get the active sandbox
- Providers support: file operations, command execution, package installation, lifecycle management

### AI Code Generation Flow
1. **Context Selection**: `context-selector.ts` intelligently selects relevant files
2. **Edit Intent Analysis**: Determines if request is targeted (specific component) or comprehensive (rebuild)
3. **File Search**: For edits, executes agentic search to find target files
4. **Streaming Response**: Real-time AI generation with progress updates
5. **Code Application**: Files written to sandbox with package detection and installation

### XML Tag System
AI responses use XML tags for structured code delivery:
```xml
<explanation>Description of changes</explanation>
<packages>react-router-dom, axios</packages>
<file path="src/App.jsx">...</file>
<command>npm run dev</command>
```

See `docs/PACKAGE_DETECTION_GUIDE.md` for complete details.

### Conversation Context Management
- Global `conversationState` tracks messages, edits, and user preferences
- Message history auto-trimmed to last 15 messages to prevent context overflow
- Edit history maintained for up to 8 recent edits
- User preference analysis (targeted vs comprehensive editing style)

## Configuration Management

All configurable values are in `/config/app.config.ts`:
- Sandbox timeouts and ports
- AI model selection and temperature
- Code application delays
- Package installation options
- File management patterns

**When modifying behavior, check `app.config.ts` first before hardcoding values.**

## Package Installation

### Automatic Detection
- Parses XML `<package>` and `<packages>` tags
- Scans import statements in generated code
- Avoids duplicate installations
- Skips Node.js built-in modules

### Installation Flow
1. Extract packages from AI response
2. Check existing `package.json` and file system
3. Install with `npm install --legacy-peer-deps` (configurable)
4. Auto-restart Vite server (if enabled)
5. Stream real-time npm output to UI

## File Operations

### File Context Selection (`context-selector.ts`)
Implements intelligent file selection for AI context:
- Prioritizes files based on edit intent (targeted vs comprehensive)
- Respects token limits for AI context window
- Groups related files (component + style + test)

### File Search (`file-search-executor.ts`)
Agentic file search for edit operations:
1. AI generates search plan (keywords, file patterns, content patterns)
2. Executes search across file manifest
3. Ranks results by relevance
4. AI selects best target file from candidates

## Streaming and Real-Time Updates

### Server-Sent Events (SSE)
API routes use SSE for real-time progress:
```typescript
data: {"type": "status", "message": "Initializing AI..."}
data: {"type": "package-progress", "message": "Installing..."}
data: {"type": "file-progress", "current": 1, "total": 5}
data: {"type": "complete", "results": {...}}
```

### UI Feedback
See `docs/UI_FEEDBACK_DEMO.md` and `docs/STREAMING_FIXES_SUMMARY.md` for details on:
- Real-time package installation progress
- File creation/update tracking
- Command execution output streaming
- Error display with context

## Path Aliases

TypeScript paths configured in `tsconfig.json`:
```typescript
"@/*": ["./*"]
```

Example:
```typescript
import { appConfig } from '@/config/app.config';
import type { SandboxState } from '@/types/sandbox';
```

## Working with Sandboxes

### Vercel Sandbox
- Default provider
- Node.js 22 runtime
- Working directory: `/app`
- Dev server port: 3000
- 15-minute timeout (configurable)

### E2B Sandbox
- Alternative provider
- Vite-based React apps
- Working directory: `/home/user/app`
- Dev server port: 5173
- 30-minute timeout (configurable)

### Switching Providers
Set `SANDBOX_PROVIDER=vercel` or `SANDBOX_PROVIDER=e2b` in `.env.local`

## Error Handling

### Common Issues
1. **Undefined properties in streaming**: Check array initialization before operations
2. **Package installation failures**: npm peer dependency conflicts (expected, doesn't break functionality)
3. **File content issues**: Verify `global.sandboxState.fileCache` is populated
4. **Sandbox timeout**: Increase timeout in `app.config.ts`

### Debug Logging
Enable in `app.config.ts`:
```typescript
dev: {
  enableDebugLogging: true,
  logApiResponses: true,
}
```

## AI Model Configuration

### Supported Models
- GPT-5 (OpenAI)
- Kimi K2 (Groq) - Default
- Claude Sonnet 4 (Anthropic)
- Gemini 2.0 Flash (Google)

### Model Selection
Models configured in `config/app.config.ts`:
```typescript
ai: {
  defaultModel: 'moonshotai/kimi-k2-instruct-0905',
  availableModels: [...]
}
```

### AI Gateway
Use `AI_GATEWAY_API_KEY` to route all providers through Vercel AI Gateway for unified API access.

### OpenRouter Integration
The app can be configured to use OpenRouter for access to 200+ models:
- Set `OPENAI_API_KEY` to your OpenRouter API key
- Set `OPENAI_BASE_URL=https://openrouter.ai/api/v1`
- Configure desired models in `config/app.config.ts`
- See `OPENROUTER_SETUP.md` for detailed setup instructions

## Important Files to Review

When working on specific features:
- **Sandbox operations**: `lib/sandbox/`, `app/api/create-ai-sandbox-v2/route.ts`
- **Code generation**: `app/api/generate-ai-code-stream/route.ts`
- **Code application**: `app/api/apply-ai-code-stream/route.ts`
- **Package management**: `app/api/install-packages-v2/route.ts`
- **Configuration**: `config/app.config.ts`
- **Type definitions**: `types/`

## Special Considerations

### Memory Management
- Conversation history auto-trimmed to prevent unbounded growth
- File cache maintained in `global.sandboxState`
- Clean up old data regularly

### Performance
- Turbopack enabled for faster dev builds
- Streaming responses for immediate feedback
- Lazy loading components where appropriate

### Security
- Never commit API keys (use `.env.local`)
- Sandbox environments are isolated
- File operations restricted to sandbox working directory

## Testing Strategy

While no formal test suite exists, validate changes by:
1. Testing with sample prompts in the builder
2. Verifying sandbox creation and file operations
3. Checking streaming updates in browser DevTools
4. Testing package installation with various dependencies
5. Validating edit mode with targeted and comprehensive requests

## Documentation

Additional documentation in `/docs`:
- `PACKAGE_DETECTION_GUIDE.md`: XML tag usage and package detection
- `STREAMING_FIXES_SUMMARY.md`: Streaming API implementation details
- `UI_FEEDBACK_DEMO.md`: Real-time UI feedback system
- `TOOL_CALL_FIX_SUMMARY.md`: Tool call handling (if applicable)
