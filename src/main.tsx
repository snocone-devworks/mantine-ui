import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { MantineUIThemeProvider } from '../lib';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineUIThemeProvider appThemeName='test_theme' applyGradients>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineUIThemeProvider>
  </React.StrictMode>
)