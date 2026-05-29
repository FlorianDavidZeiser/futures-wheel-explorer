import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ExperienceProvider } from './state/ExperienceContext';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExperienceProvider>
      <App />
    </ExperienceProvider>
  </StrictMode>
);
