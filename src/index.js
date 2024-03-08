import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< Updated upstream
import reportWebVitals from './reportWebVitals';
=======
import {Provider} from "react-redux";
import {store} from "./store/store";
>>>>>>> Stashed changes

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
