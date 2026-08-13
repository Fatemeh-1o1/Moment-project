import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { AppProviders } from './app/providers/AppProviders';
import logo from './img/logo.png';
import './styles/index.css';

const favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]') ?? document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = logo;
if (!favicon.parentElement) document.head.appendChild(favicon);

createRoot(document.getElementById('root')!).render(<StrictMode><AppProviders><App /></AppProviders></StrictMode>);
