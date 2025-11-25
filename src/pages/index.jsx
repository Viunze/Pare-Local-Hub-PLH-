// src/pages/index.jsx (PERBAIKAN: Import CustomCard dan cek data)

import React from 'react';
// Asumsi Anda menggunakan hook navigasi seperti useNavigate jika ini React Router,
// Tapi karena Anda menggunakan window.location.href, kita bisa mengabaikannya untuk saat ini.
// import { useNavigate } from 'react-router-dom'; 

import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore';
// ✅ PERBAIKAN UTAMA: Menggunakan DEFAULT IMPORT karena CustomCard menggunakan 'export default'
import CustomCard from '../components/common/CustomCard'; 
import { BottomNav } from '../components/common/BottomNav';
import { SearchBar } from '../components/common/SearchBar'; 

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
    // Implementasi navigasi yang Anda gunakan
    window.location.href = `/${type}/${id}`;
  };
  
  // Pastikan data adalah array untuk mencegah error .map is not a function
  const safePlaces = places || [];
  const safeProducts = products || [];

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
            {safePlaces.map(place => (
              <CustomCard
                key={place.id}
                id={place.id} // ID untuk navigasi
                title={place.name}
                // Anda mungkin perlu memastikan CustomCard menerima props ini
                subtitle={place.category ? place.category.join(', ') : 'Kuliner'} 
                image={place.image_url}
                rating={place.average_rating || 0}
                priceRange={place.price_range} 
                onClick={() => handleCardClick(place.id, 'places')}
              />
            ))}
            {/* Tampilkan pesan jika tidak ada data dan tidak loading */}
            {!isLoading && safePlaces.length === 0 && <p className="text-gray-500 col-span-2">Tidak ada data kuliner ditemukan.</p>}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Tempat</button>
        </section>

        {/* --- Bagian Produk UMKM Terbaru --- */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🛍️ Produk Lokal Terbaru</h2>
          <div className="grid grid-cols-2 gap-4">
            {safeProducts.map(product => (
              <CustomCard
                key={product.id}
                id={product.id} // ID untuk navigasi
                title={product.name}
                // Anda mungkin perlu memastikan CustomCard menerima props ini
                subtitle={product.category}
                image={product.image_gallery ? product.image_gallery[0] : null}
                rating={product.average_rating || 0}
                // Jika produk tidak punya priceRange, lewati saja atau berikan nilai default
                onClick={() => handleCardClick(product.id, 'products')}
              />
            ))}
             {!isLoading && safeProducts.length === 0 && <p className="text-gray-500 col-span-2">Tidak ada produk ditemukan.</p>}
          </div>
          <button className="w-full text-center mt-4 text-green-600 font-medium hover:text-green-700">Lihat Semua Produk</button>
        </section>
      </main>

      <BottomNav activePath="/" />
    </div>
  );
};

export default HomeDashboard;
