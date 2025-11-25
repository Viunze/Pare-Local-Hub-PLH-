// src/pages/index.jsx (HANYA Komponen Halaman, Tidak Ada Initialization DOM)

import React from 'react';
// Import logo sekarang sudah aman karena file sudah Anda buat/upload
import LogoSVG from '../assets/logo.svg'; 

import { useAuth } from '../hooks/useAuth'; // Ini akan berfungsi karena App.jsx menyediakan Provider
import { useFirestore } from '../hooks/useFirestore';
import CustomCard from '../components/common/CustomCard'; 
import { BottomNav } from '../components/common/BottomNav';
import { SearchBar } from '../components/common/SearchBar'; 

const HomeDashboard = () => {
  // Hooks sekarang aman karena dijalankan di dalam Provider (dari App.jsx)
  const { data: places = [], isLoading: placesLoading } = useFirestore('places', {
    orderBy: ['average_rating', 'desc'],
    limit: 4
  });

  const { data: products = [], isLoading: productsLoading } = useFirestore('products', {
    orderBy: ['createdAt', 'desc'],
    limit: 4
  });
  
  const { isLoading: authLoading } = useAuth(); 
  const isLoading = authLoading || placesLoading || productsLoading;
  
  const handleCardClick = (id, type) => {
    // Navigasi
    window.location.href = `/${type}/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header & Search */}
      <header className="p-4 bg-green-500 shadow-lg">
        <div className="flex items-center mb-2">
            <img 
                src={LogoSVG} 
                alt="Pare Local Hub Logo" 
                className="h-8 w-auto mr-3"
                onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/32x32/10B981/ffffff?text=PLH" }}
            /> 
            <div>
                <h1 className="text-2xl font-bold text-white">Pare Local Hub</h1>
                <p className="text-sm text-white/90">Panduan Kuliner & UMKM Kampung Inggris</p>
            </div>
        </div>

        <div className="mt-3">
          <SearchBar placeholder="Cari Tempat Makan atau Produk..." />
        </div>
      </header>

      <main className="p-4">
        {isLoading && <p className="text-center mt-8">Memuat data...</p>}
        
        {/* Konten Kuliner Populer */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🔥 Kuliner Populer Pelajar</h2>
          <div className="grid grid-cols-2 gap-4">
            {places.length > 0 && places.map(place => (
              <CustomCard
                key={place.id}
                id={place.id}
                title={place.name}
                subtitle={place.category ? place.category.join(', ') : 'Kuliner'} 
                image={place.image_url}
                rating={place.average_rating || 0}
                priceRange={place.price_range} 
                onClick={() => handleCardClick(place.id, 'places')}
              />
            ))}
            {!isLoading && places.length === 0 && <p className="text-gray-500 col-span-2">Tidak ada data kuliner ditemukan.</p>}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Tempat</button>
        </section>

        {/* Konten Produk UMKM Terbaru */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🛍️ Produk Lokal Terbaru</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.length > 0 && products.map(product => (
              <CustomCard
                key={product.id}
                id={product.id}
                title={product.name}
                subtitle={product.category}
                image={product.image_gallery ? product.image_gallery[0] : null}
                rating={product.average_rating || 0}
                onClick={() => handleCardClick(product.id, 'products')}
              />
            ))}
             {!isLoading && products.length === 0 && <p className="text-gray-500 col-span-2">Tidak ada produk ditemukan.</p>}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Produk</button>
        </section>
      </main>

      <BottomNav activePath="/" />
    </div>
  );
};

export default HomeDashboard;
