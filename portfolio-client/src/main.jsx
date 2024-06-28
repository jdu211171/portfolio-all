import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppRoutes from './routes';

import theme from './styles/theme'; 
import './styles/index.css';
import './assets/fonts/fonts.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Add CssBaseline for consistent styling */}
      <AppRoutes />
    </ThemeProvider>
  </React.StrictMode>,
);
