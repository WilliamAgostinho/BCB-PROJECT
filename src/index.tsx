import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app'; 
import { UserProvider } from './contexts/UserContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );
} else {
  console.error("Elemento #root não encontrado no HTML.");
}
