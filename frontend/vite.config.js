import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// The site is deployed as static files, so everything resolves relative to the
// document — that way it works from a subdirectory or a file:// preview too.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_URL || 'https://sacc-backend-894t.onrender.com';

  return {
    plugins: [react()],
    base: './',
    build: { outDir: 'dist', assetsDir: 'assets', sourcemap: false },
    server: {
      port: 5173,
      open: true,
      // Proxy the API in development so requests are same-origin. The
      // alternative — adding localhost to the backend's CORS allowlist —
      // would loosen production config for a local convenience.
      proxy: {
        '/api': { target, changeOrigin: true, secure: true },
      },
    },
  };
});
