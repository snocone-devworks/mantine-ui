import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../lib/theme';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ThemeProvider appThemeName='@snocone/mantine-ui_theme'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>

);