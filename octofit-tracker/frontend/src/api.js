// VITE_CODESPACE_NAME must be set in .env.local
// Example: VITE_CODESPACE_NAME=my-codespace-name
// Without it, the app falls back to http://localhost:8000
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
