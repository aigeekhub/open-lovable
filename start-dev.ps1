cd "C:\AiGeekHubDevProjects\AiGeekHub Repos\open-lovable"
Start-Process "http://localhost:3000" -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3
pnpm dev
