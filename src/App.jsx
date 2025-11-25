// src/App.jsx

import React from 'react';
// Hapus import ReactDOM, karena DOM mounting akan dilakukan oleh main.jsx

// Import untuk Routing dan Context
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth.jsx'; 
import { FirestoreProvider } from './hooks/useFirestore.js'; 

// Import Halaman (Anda harus menambahkan semua halaman yang Anda gunakan di Routes)
import HomeDashboard from './pages/index.jsx'; 
import FavoritesPage from './pages/favorites.jsx'; 
// import ProfilePage from './pages/profile.jsx';       // Contoh
// import PlaceDetailPage from './pages/places/[id].jsx'; // Contoh


// Komponen AppContent (Root Component)
const AppContent = () => {
  return (
    // Context Providers di level tertinggi
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <Routes>
            {/* Rute Utama */}
            <Route path="/" element={<HomeDashboard />} />
            
            {/* Rute Navigasi Lain (Wajib diimpor di atas) */}
            <Route path="/favorites" element={<FavoritesPage />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            
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

// ✅ EXPORT DEFAULT: Wajib agar dapat diimpor oleh src/main.jsx
export default AppContent;
