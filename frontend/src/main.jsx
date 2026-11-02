import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '@fontsource-variable/onest/wght.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-300.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-500.css';
import './styles/site.css';

import App from './App.jsx';
import { SiteProvider } from './SiteContext.jsx';

const root = document.getElementById('root');
const tree = (
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>
);

// Prerendered pages arrive with their HTML already in place; take it over
// rather than repaint it. The dev server serves an empty shell.
if (root.firstElementChild) hydrateRoot(root, tree);
else createRoot(root).render(tree);
