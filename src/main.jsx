// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
// 🛑 KRITIS: Import AppContent sebagai root component
import AppContent from './App.jsx'; 
// ✅ KRITIS: Memuat CSS global (yang mengatasi masalah styling)
import './index.css'; 

// Melakukan DOM mounting
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppContent />
  </React.StrictMode>,
);
