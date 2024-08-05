import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Providers from './providers/providers';
import AppRouter from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <AppRouter />
    </Providers>
  </React.StrictMode>
);
