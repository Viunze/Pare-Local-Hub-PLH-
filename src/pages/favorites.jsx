// src/pages/favorites.jsx

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useFirestore } from '../hooks/useFirestore'; // Asumsi Anda punya hook untuk mengambil daftar favorit
import { BottomNav } from '../components/common/BottomNav';
// ✅ PERBAIKAN: Menggunakan Default Import (tanpa {})
import CustomCard from '../components/common/CustomCard'; 
import { Heart, Utensils, ShoppingBag } from 'lucide-react';
// import { useNavigate } from 'react-router-dom'; // Gunakan useNavigate jika ingin routing yang lebih modern

const FavoritesPage = () => {
    // const navigate = useNavigate();
    const { user, isLoading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('places'); // places atau products

    // Asumsi: Hook useFirestore mengambil koleksi 'favorites' 
    // dengan filter berdasarkan ID pengguna (user.uid)
    const { data: favoritesData, isLoading: favoritesLoading } = useFirestore('favorites', {
        where: user ? [['userId', '==', user.uid]] : null,
    });

    const isLoading = authLoading || favoritesLoading;
    
    // Filter data favorit berdasarkan tab aktif (places/products)
    const filteredFavorites = favoritesData 
        ? favoritesData.filter(item => item.type === activeTab)
        : [];

    const handleCardClick = (id, type) => {
        // Navigasi ke halaman detail
        window.location.href = `/${type}/${id}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>Memuat data favorit...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen p-4 flex flex-col items-center justify-center bg-gray-50 text-center">
                <Heart className="h-10 w-10 text-red-500 mb-4" />
                <h1 className="text-xl font-bold mb-2">Login Diperlukan</h1>
                <p className="text-gray-600 mb-6">Silakan masuk untuk melihat daftar favorit Anda.</p>
                {/* Asumsi Anda memiliki tombol login/modal */}
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg font-medium">Masuk Sekarang</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="p-4 bg-white shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Daftar Favorit Saya</h1>
            </header>

            {/* Tab Navigation */}
            <div className="flex justify-around p-2 bg-white border-b border-gray-200 sticky top-0 z-10">
                <button
                    onClick={() => setActiveTab('places')}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-150 ${
                        activeTab === 'places' 
                        ? 'text-white bg-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <Utensils className="h-5 w-5" />
                    <span>Kuliner</span>
                </button>
                <button
                    onClick={() => setActiveTab('products')}
                    className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition duration-150 ${
                        activeTab === 'products' 
                        ? 'text-white bg-green-600 shadow-md' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Produk</span>
                </button>
            </div>

            <main className="p-4">
                {filteredFavorites.length === 0 ? (
                    <div className="text-center mt-12 text-gray-500">
                        <Heart className="h-8 w-8 mx-auto mb-3" />
                        <p>Anda belum menambahkan {activeTab === 'places' ? 'kuliner' : 'produk'} ke favorit.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {filteredFavorites.map(item => (
                            <CustomCard
                                key={item.id}
                                id={item.itemId} // Asumsi ID item favorit disimpan di itemId
                                title={item.name}
                                subtitle={item.category} 
                                image={item.image_url} 
                                rating={item.average_rating || 0}
                                onClick={() => handleCardClick(item.itemId, item.type)}
                            />
                        ))}
                    </div>
                )}
            </main>

            <BottomNav activePath="/favorites" />
        </div>
    );
};

export default FavoritesPage;
