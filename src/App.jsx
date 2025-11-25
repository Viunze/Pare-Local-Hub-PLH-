// src/App.jsx

import React from 'react';
// Hapus import ReactDOM, karena DOM mounting dilakukan oleh main.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ✅ Import Providers dari file .jsx yang sudah diperbaiki
import { AuthProvider } from './hooks/useAuth.jsx'; 
import { FirestoreProvider } from './hooks/useFirestore.jsx'; 

// Import Halaman (Pastikan file ini ada di src/pages/)
import HomeDashboard from './pages/index.jsx'; 
import FavoritesPage from './pages/favorites.jsx';   
// ✅ Perbaikan Syntax: Menggunakan 'from'
import ProfilePage from './pages/profile.jsx';       
import MapsPage from './pages/maps.jsx';             


const AppContent = () => {
  return (
    // Context Providers
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <Routes>
            {/* Rute Utama */}
            <Route path="/" element={<HomeDashboard />} />
            
            {/* Rute Navigasi Lain */}
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/maps" element={<MapsPage />} />
            
            {/* Rute 404 Fallback */}
            <Route path="*" element={
              <div className="text-center p-12">
                <h1 className="text-3xl font-bold">404</h1>
                <p className="text-gray-600">Halaman Tidak Ditemukan</p>
              </div>
            } />
          </Routes>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
};

// ✅ Wajib: Export Default agar main.jsx dapat mengimpornya
export default AppContent;
