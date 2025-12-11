/**
 * Diagnostics utilities for scraping and cloning issues
 */

export interface ScrapeDiagnostics {
  firecrawlConfigured: boolean;
  firecrawlKeyFormat: 'valid' | 'invalid' | 'missing';
  sandboxProvider: string;
  sandboxConfigured: boolean;
  issues: string[];
  recommendations: string[];
}

export function diagnoseScrapingIssues(): ScrapeDiagnostics {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Check Firecrawl API key
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  let firecrawlConfigured = false;
  let firecrawlKeyFormat: 'valid' | 'invalid' | 'missing' = 'missing';

  if (!firecrawlKey) {
    issues.push('FIRECRAWL_API_KEY is not set');
    recommendations.push('Set FIRECRAWL_API_KEY in your .env file from https://firecrawl.dev');
  } else if (firecrawlKey.trim() !== firecrawlKey) {
    issues.push('FIRECRAWL_API_KEY has leading or trailing whitespace');
    firecrawlKeyFormat = 'invalid';
    recommendations.push('Remove whitespace from FIRECRAWL_API_KEY in .env file');
  } else if (!firecrawlKey.startsWith('fc-')) {
    issues.push('FIRECRAWL_API_KEY does not start with "fc-"');
    firecrawlKeyFormat = 'invalid';
    recommendations.push('Check that your Firecrawl API key is correct');
  } else if (firecrawlKey.length < 20) {
    issues.push('FIRECRAWL_API_KEY appears too short');
    firecrawlKeyFormat = 'invalid';
    recommendations.push('Verify your Firecrawl API key is complete');
  } else {
    firecrawlConfigured = true;
    firecrawlKeyFormat = 'valid';
  }

  // Check sandbox configuration
  const sandboxProvider = process.env.SANDBOX_PROVIDER || 'e2b';
  let sandboxConfigured = false;

  if (sandboxProvider === 'e2b') {
    const e2bKey = process.env.E2B_API_KEY;
    if (!e2bKey) {
      issues.push('E2B_API_KEY is not set but SANDBOX_PROVIDER is e2b');
      recommendations.push('Set E2B_API_KEY in your .env file from https://e2b.dev');
    } else {
      sandboxConfigured = true;
    }
  } else if (sandboxProvider === 'vercel') {
    const vercelToken = process.env.VERCEL_TOKEN || process.env.VERCEL_OIDC_TOKEN;
    if (!vercelToken) {
      issues.push('Vercel authentication not configured');
      recommendations.push('Run "vercel link" and "vercel env pull" or set VERCEL_TOKEN');
    } else {
      sandboxConfigured = true;
    }
  }

  return {
    firecrawlConfigured,
    firecrawlKeyFormat,
    sandboxProvider,
    sandboxConfigured,
    issues,
    recommendations,
  };
}

export function logScrapeDiagnostics() {
  const diagnostics = diagnoseScrapingIssues();

  console.group('🔍 Scrape/Clone Diagnostics');
  console.log('Firecrawl Configured:', diagnostics.firecrawlConfigured);
  console.log('Firecrawl Key Format:', diagnostics.firecrawlKeyFormat);
  console.log('Sandbox Provider:', diagnostics.sandboxProvider);
  console.log('Sandbox Configured:', diagnostics.sandboxConfigured);

  if (diagnostics.issues.length > 0) {
    console.group('⚠️ Issues Found');
    diagnostics.issues.forEach((issue) => console.warn(issue));
    console.groupEnd();
  }

  if (diagnostics.recommendations.length > 0) {
    console.group('💡 Recommendations');
    diagnostics.recommendations.forEach((rec) => console.info(rec));
    console.groupEnd();
  }

  console.groupEnd();

  return diagnostics;
}

export async function testFirecrawlConnection(): Promise<{
  success: boolean;
  error?: string;
  message?: string;
}> {
  try {
    const firecrawlKey = process.env.FIRECRAWL_API_KEY;

    if (!firecrawlKey) {
      return {
        success: false,
        error: 'FIRECRAWL_API_KEY not configured',
      };
    }

    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: 'https://example.com',
        formats: ['markdown'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: `Firecrawl API returned ${response.status}: ${errorText}`,
      };
    }

    return {
      success: true,
      message: 'Firecrawl connection successful',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
