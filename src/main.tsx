import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const DEFAULT_CLERK_KEY = 'pk_test_c3Vubnktc3RpbmtidWctNTg1Ny5jbGVyay5hY2NvdW50cy5kZXYk';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || DEFAULT_CLERK_KEY;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/admin">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);

