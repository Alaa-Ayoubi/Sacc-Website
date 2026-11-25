import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** The Content-Security-Policy for the built site.
 *
 * Everything the pages run, style and load is served by the site itself; the
 * only other address is the API the two forms post to. Photographs may also
 * come from any https host, for an editor's uploads (object storage). Only the
 * production build gets it: Vite's dev server injects inline scripts.
 *
 * It travels as a <meta> tag because Render does not apply render.yaml's
 * headers to this service; frame-ancestors cannot be set that way, and the
 * page is static, so framing is the one gap. */
function contentSecurityPolicy(apiUrl) {
  let api = '';
  try { api = apiUrl ? new URL(apiUrl).origin : ''; } catch { api = ''; }
  const policy = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    `connect-src 'self'${api ? ` ${api}` : ''}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    'upgrade-insecure-requests',
  ].join('; ');
  return {
    name: 'sacc-csp',
    apply: 'build',
    transformIndexHtml: () => [{ tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: policy }, injectTo: 'head-prepend' }],
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), contentSecurityPolicy(env.VITE_API_URL)],
    build: {
      // Fingerprinted build output lives apart from public/assets (photos, logo),
      // so only the fingerprinted files are cached forever.
      assetsDir: 'static',
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  };
});
