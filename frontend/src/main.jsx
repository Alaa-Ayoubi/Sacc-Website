/* Entry point.
 *
 * Only wiring: mount the app and load the stylesheets. Everything the site
 * looks like lives in styles/app.css and the components — untouched.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import { SiteProvider } from './SiteContext.jsx';
import './styles/fonts.css';
import './styles/app.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>,
);
