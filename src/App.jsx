// src/App.jsx (Asumsi menggunakan React Router v6)

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Halaman
import HomeDashboard from './pages/index.jsx';
import MapsPage from './pages/maps.jsx';
import FavoritesPage from './pages/favorites.jsx';
import ProfilePage from './pages/profile.jsx';
import PlaceDetail from './pages/places/[id].jsx'; 
import ProductDetail from './pages/products/[id].jsx'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Halaman Utama (Bottom Nav) */}
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Halaman Detail Dinamis */}
          <Route path="/places/:id" element={<PlaceDetail />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Halaman Lain (Contoh: Not Found) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

// Komponen Not Found sederhana
const NotFound = () => (
    <div className="text-center p-20">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-lg text-gray-600">Halaman tidak ditemukan di Pare Hub.</p>
        <a href="/" className="mt-4 inline-block text-green-500 hover:underline">Kembali ke Home</a>
    </div>
);


export default App;

// Pastikan Anda memanggil App di index.js utama Anda:
/*
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Import styling jika menggunakan Tailwind atau CSS biasa

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
*/
