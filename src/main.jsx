// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// Import AppContent sebagai root component
import AppContent from './App.jsx'; 
import './index.css'; // Asumsi Anda memiliki file CSS global

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContent />
  </React.StrictMode>,
);
