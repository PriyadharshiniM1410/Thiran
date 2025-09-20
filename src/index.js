import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const clientId = "398903746605-9mdtk35r6af18keuek5isd2la70n0hjb.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
