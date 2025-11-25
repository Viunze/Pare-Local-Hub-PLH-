// src/App.jsx

import React from 'react';
// 🛑 KRITIS: Import ReactDOM untuk melakukan DOM mounting
import ReactDOM from 'react-dom/client'; 

// Import untuk Routing dan Context
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.js'; 
import { FirestoreProvider } from './hooks/useFirestore.js'; 

// Import Halaman
import HomeDashboard from './pages/index.jsx'; 
// Asumsi halaman lain juga sudah di-import di sini...


// Komponen yang berisi Router dan Providers
const AppContent = () => {
  return (
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            {/* ... Rute halaman lainnya ... */}
            <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
          </Routes>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
};

// 🛑 KRITIS: FUNGSI UNTUK ME-RENDER APLIKASI KE DOM
const rootElement = document.getElementById('root');

// Pastikan elemen root ditemukan dan render aplikasi
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <AppContent />
      </React.StrictMode>
    );
}

// Tidak perlu diexport karena file ini melakukan rendering DOM, bukan sekedar komponen
// export default AppContent;
