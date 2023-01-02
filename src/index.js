import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage.js';
import { setAuthorizationHeader } from './api/client.js';
import { AuthContextProvider } from './components/auth/Context.js';
import configureStore from './store';

const accessToken = storage.get('auth');
setAuthorizationHeader(accessToken);

const store = configureStore({auth: !!accessToken});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider haveToken={!!accessToken}>
        <App />
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
