import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Providers from '@/providers';
import AppRouter from '@/routes/AppRouter';
import MainLayout from './layouts/main/main-layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </Providers>
  </React.StrictMode>
);
