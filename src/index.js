import './polyfills/cryptoRandomUUID';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './web.route';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import themeDefault from './ui/theme/theme';
import {Provider} from 'react-redux';
import store from './redux/store/store';

// Disable CRA's dev "Uncaught runtime errors" overlay. The label-studio bundle
// throws non-fatal mobx-state-tree errors while typing; the overlay covers the
// UI even though the app keeps working. Errors still appear in the console.
if (process.env.NODE_ENV === 'development') {
  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    const overlay = require('react-error-overlay');
    if (overlay && typeof overlay.stopReportingRuntimeErrors === 'function') {
      overlay.stopReportingRuntimeErrors();
    }
  } catch (_) {
    // react-error-overlay not installed — ignore.
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={themeDefault}>
      <App />
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
