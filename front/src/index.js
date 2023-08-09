import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {CssBaseline, Experimental_CssVarsProvider as CssVarsProvider}
  from '@mui/material';
import theme from './theme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
