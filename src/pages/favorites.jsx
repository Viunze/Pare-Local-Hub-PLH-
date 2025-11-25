// src/pages/favorites.jsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { BottomNav } from '../components/common/BottomNav';
import { CustomCard } from '../components/common/CustomCard';
import { Heart, Utensils, ShoppingBag } from 'lucide-react';

const FavoritesPage = () => {
    const { user, isLoading: authLoading } = useAuth();
    const [activeTab, setActiveTab] = useState('places'); // 'places' atau 'products'
    const [favorites, setFavorites] = useState({ places: [], products: [] });
    const [isLoading, setIsLoading] = useState(true);

    // TODO: Implementasi Fetch data favorit dari koleksi 'users'
    useEffect(() => {
        if (user) {
            // Contoh simulasi fetch dari koleksi 'users'
            setTimeout(() => {
                setFavorites({
                    places: [
                        { id: 'placeA', name: 'Angkringan Kopi Joss', category: ['Minuman'], image_url: '/img/ang.jpg', average_rating: 4.6, price_range: '$' },
                    ],
                    products: [
                        { id: 'prodB', name: 'Kaos I Love Pare', category: 'Fashion', image_gallery: ['/img/kaos.jpg'], average_rating: 4.5 },
                    ]
                });
                setIsLoading(false);
            }, 1000);
        } else if (!authLoading) {
            setIsLoading(false);
        }
    }, [user, authLoading]);

    if (authLoading || isLoading) return <div className="text-center p-8">Memuat halaman favorit...</div>;
    if (!user) return <div className="text-center p-8 text-red-500">Silakan login untuk melihat favorit Anda.</div>;

    const currentList = activeTab === 'places' ? favorites.places : favorites.products;
    const isPlaces = activeTab === 'places';

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="p-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-green-600 flex items-center"><Heart className="mr-2 fill-red-500 text-red-500" /> Favorit Saya</h1>
            </header>

            <div className="p-4">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mb-4">
                    <button
                        onClick={() => setActiveTab('places')}
                        className={`flex-1 p-3 flex justify-center items-center font-semibold transition-colors ${isPlaces ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500 hover:text-green-500'}`}
                    >
                        <Utensils size={20} className="mr-1" /> Kuliner ({favorites.places.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`flex-1 p-3 flex justify-center items-center font-semibold transition-colors ${!isPlaces ? 'border-b-4 border-green-500 text-green-600' : 'text-gray-500 hover:text-green-500'}`}
                    >
                        <ShoppingBag size={20} className="mr-1" /> Produk ({favorites.products.length})
                    </button>
                </div>

                {/* List Konten */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentList.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 mt-8">
                            Belum ada {isPlaces ? 'tempat kuliner' : 'produk'} yang Anda favoritkan.
                        </p>
                    ) : (
                        currentList.map(item => (
                            <CustomCard
                                key={item.id}
                                title={item.name}
                                subtitle={item.category.join ? item.category.join(', ') : item.category}
                                image={isPlaces ? item.image_url : item.image_gallery[0]}
                                rating={item.average_rating}
                                priceRange={item.price_range}
                                onClick={() => window.location.href = `/${isPlaces ? 'places' : 'products'}/${item.id}`}
                            />
                        ))
                    )}
                </div>
            </div>

            <BottomNav activePath="/favorites" />
        </div>
    );
};

export default FavoritesPage;
