// src/App.jsx

import React from 'react';
// Hapus import ReactDOM, karena DOM mounting ada di main.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ✅ Import Providers dari file .jsx yang sudah diperbaiki
import { AuthProvider } from './hooks/useAuth.jsx'; 
import { FirestoreProvider } from './hooks/useFirestore.jsx'; 

// Import Halaman
import HomeDashboard from './pages/index.jsx'; 
import FavoritesPage from './pages/favorites.jsx';   
import ProfilePage dari './pages/profile.jsx';       // Jika sudah ada
import MapsPage dari './pages/maps.jsx';             // Jika sudah ada


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
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            {/* <Route path="/maps" element={<MapsPage />} /> */}
            
            {/* Rute 404 Fallback */}
            <Route path="*" element={
              <div className="text-center p-12">
                <h1>404 | Halaman Tidak Ditemukan</h1>
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
