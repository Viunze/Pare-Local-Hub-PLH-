// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client'; // Diperlukan untuk inisialisasi DOM

// Import Context Providers
import { AuthProvider } from './hooks/useAuth.js'; 
import { FirestoreProvider } from './hooks/useFirestore.js'; 

// Import Halaman (Asumsi path ini benar di dalam folder src/pages)
import HomeDashboard from './pages/index.jsx'; 
import ProfilePage from './pages/profile.jsx';       // Component ProfilePage dari profile.jsx
import FavoritesPage from './pages/favorites.jsx';   // Component FavoritesPage dari favorites.jsx
import MapsPage from './pages/maps.jsx';             // Component MapsPage dari maps.jsx

// Import Halaman Detail (Asumsi component ada di dalam folder id/index.jsx atau langsung di [id].jsx)
import PlaceDetailPage from './pages/places/[id].jsx';  // Component detail tempat
import ProductDetailPage from './pages/products/[id].jsx'; // Component detail produk


const AppContent = () => {
  return (
    // ✅ TEMPATKAN PROVIDER DI SINI (LEVEL TERTINGGI)
    <AuthProvider>
      <FirestoreProvider>
        <Router>
          <Routes>
            {/* 1. Rute Utama */}
            <Route path="/" element={<HomeDashboard />} />
            
            {/* 2. Rute Navigasi Utama */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/maps" element={<MapsPage />} />
            
            {/* 3. Rute Detail Dinamis (Menggunakan ID sebagai parameter) */}
            <Route path="/places/:id" element={<PlaceDetailPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            
            {/* 4. Fallback 404 jika rute tidak ditemukan */}
            <Route path="*" element={<h1>404 | Halaman Tidak Ditemukan</h1>} />
            
          </Routes>
        </Router>
      </FirestoreProvider>
    </AuthProvider>
  );
};

// Fungsi inisialisasi DOM (Perbaikan untuk white screen)
const rootElement = document.getElementById('root');

// Pastikan root element ditemukan sebelum merender
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <AppContent />
      </React.StrictMode>
    );
}

// Export App Content jika Anda tidak menggunakan initialization DOM di file ini
export default AppContent;
