import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Expose CODESPACE_NAME (set at build/dev time) as VITE_CODESPACE_NAME
    'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(process.env.CODESPACE_NAME || ''),
  },
})
