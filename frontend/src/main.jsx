import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import { SiteProvider } from './SiteContext.jsx';
// app.css asks for Almarai, Tajawal, Outfit and Playfair Display, but nothing
// was loading them — the page fell back to system fonts. These are the
// self-hosted faces from the design system.
import './styles/fonts.css';
import './styles/app.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </React.StrictMode>,
);
