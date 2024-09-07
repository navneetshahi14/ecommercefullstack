import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import Ecomstate from './Context/Ecomstate'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Ecomstate>
        <App />
      </Ecomstate>
    </BrowserRouter>
);


