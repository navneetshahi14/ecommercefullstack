import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import EcomUserState from './Context/EcomUserState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <EcomUserState>
          <App />
      </EcomUserState>
    </BrowserRouter>
  </React.StrictMode>
);


