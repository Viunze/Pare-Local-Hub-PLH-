// src/pages/index.jsx (Asumsi menggunakan React Router atau Next.js Page)

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
import { CustomCard } from '../components/common/CustomCard';
import { BottomNav } from '../components/common/BottomNav';
import { SearchBar } from '../components/common/SearchBar'; // Asumsi SearchBar ada

const HomeDashboard = () => {
  const { user, isLoading: authLoading } = useAuth();
  
  // Mengambil 4 Tempat Kuliner Populer (Berdasarkan rating)
  const { data: places, isLoading: placesLoading } = useFirestore('places', {
    orderBy: ['average_rating', 'desc'],
    limit: 4
  });

  // Mengambil 4 Produk Baru (Berdasarkan timestamp/createdAt)
  const { data: products, isLoading: productsLoading } = useFirestore('products', {
    orderBy: ['createdAt', 'desc'],
    limit: 4
  });

  const isLoading = authLoading || placesLoading || productsLoading;
  
  const handleCardClick = (id, type) => {
    // Implementasi navigasi ke halaman detail
    window.location.href = `/${type}/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header & Search */}
      <header className="p-4 bg-green-500 shadow-lg">
        <h1 className="text-2xl font-bold text-white">Pare Local Hub</h1>
        <p className="text-sm text-white/90">Panduan Kuliner & UMKM Kampung Inggris</p>
        <div className="mt-3">
          <SearchBar placeholder="Cari Tempat Makan atau Produk..." />
        </div>
      </header>

      <main className="p-4">
        {isLoading && <p className="text-center mt-8">Memuat data...</p>}
        
        {/* --- Bagian Kuliner Populer --- */}
        <section className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🔥 Kuliner Populer Pelajar</h2>
          <div className="grid grid-cols-2 gap-4">
            {places.map(place => (
              <CustomCard
                key={place.id}
                title={place.name}
                subtitle={place.category.join(', ')}
                image={place.image_url}
                rating={place.average_rating}
                priceRange={place.price_range}
                onClick={() => handleCardClick(place.id, 'places')}
              />
            ))}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Tempat</button>
        </section>

        {/* --- Bagian Produk UMKM Terbaru --- */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🛍️ Produk Lokal Terbaru</h2>
          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <CustomCard
                key={product.id}
                title={product.name}
                subtitle={product.category}
                image={product.image_gallery[0]}
                rating={product.average_rating}
                onClick={() => handleCardClick(product.id, 'products')}
              />
            ))}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Produk</button>
        </section>
      </main>

      <BottomNav activePath="/" />
    </div>
  );
};

export default HomeDashboard;
