import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from "react-router-dom";
import { router } from './router/router.jsx';

import Aos from 'aos';
import 'aos/dist/aos.css';

import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function AppRoot() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-urbanist max-w-7xl mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRoot />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
