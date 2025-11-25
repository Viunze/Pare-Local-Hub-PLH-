// src/features/kuliner/pages/PlaceDetail.jsx
// Menggunakan hook dan API yang baru

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useDocument } from '../../../hooks/useDocument';
import { useFirestore } from '../../../hooks/useFirestore';
import { toggleFavorite } from '../../../api_data/apiUser';
import { ReviewForm } from '../components/ReviewForm';
import { MapPin, Clock, ExternalLink, Heart, Star } from 'lucide-react';

const PlaceDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { document: place, loading } = useDocument('places', id);

  const { data: reviews, isLoading: reviewsLoading } = useFirestore(`places/${id}/reviews`, {
    orderBy: ['timestamp', 'desc'],
  });
  
  const [isFavorited, setIsFavorited] = useState(false); 

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Silakan login untuk menyimpan favorit.");
      return;
    }
    try {
        const result = await toggleFavorite(user.uid, id, 'place');
        setIsFavorited(result); 
        alert(`${result ? 'Ditambahkan ke' : 'Dihapus dari'} Favorit!`);
    } catch (e) {
        alert("Gagal mengupdate favorit.");
    }
  };

  if (loading) return <div className="text-center p-8">Memuat detail tempat...</div>;
  if (!place) return <div className="text-center p-8 text-red-500">Tempat tidak ditemukan.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
        <div className="relative h-64 bg-gray-300">
            <img src={place.image_url} alt={place.name} className="w-full h-full object-cover" />
            <button 
                onClick={handleToggleFavorite}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg"
            >
                <Heart size={24} className={isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-500'} />
            </button>
        </div>
        
        <div className="p-4">
            <h1 className="text-3xl font-bold text-gray-900">{place.name}</h1>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span className="font-semibold">{place.average_rating.toFixed(1)}</span>
              <span className="mx-1">|</span>
              <span>{place.total_reviews} Ulasan</span>
            </div>
             <div className="mt-4 border-t pt-4">
              <p className="flex items-center text-gray-700">
                <MapPin size={18} className="mr-2 text-green-500" />
                {place.address}
              </p>
              <p className="flex items-center text-gray-700 mt-2">
                <Clock size={18} className="mr-2 text-green-500" />
                {place.hours?.time || 'Informasi jam buka belum tersedia'}
              </p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${place.location?.latitude},${place.location?.longitude}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline flex items-center mt-2 text-sm"
              >
                Lihat di Google Maps <ExternalLink size={14} className="ml-1" />
              </a>
            </div>

            <div className="mt-6 border-t pt-4">
                <h2 className="text-xl font-bold mb-2">Daftar Menu Populer</h2>
                <ul className="space-y-1 text-gray-700">
                    <li>Nasi Goreng Kampung: Rp 15.000</li>
                    <li>Iced Latte: Rp 18.000</li>
                </ul>
            </div>

            <div className="mt-8 border-t pt-4">
                <h2 className="text-xl font-bold mb-3">Ulasan Pengunjung ({place.total_reviews})</h2>
                <ReviewForm placeId={id} onReviewSuccess={() => { /* re-fetch reviews */ }} />
                
                <div className="space-y-4 mt-6">
                    {reviewsLoading && <p>Memuat ulasan...</p>}
                    {reviews.map((review) => (
                    <div key={review.id} className="p-3 border rounded-lg bg-white shadow-sm">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{review.userName}</p>
                            <div className="flex items-center text-sm text-yellow-500">
                                {Array(review.rating).fill().map((_, i) => <Star key={i} size={14} fill="currentColor"/>)}
                            </div>
                        </div>
                        <p className="text-gray-700 mt-1 text-sm">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-2">
                            {review.timestamp?.toDate().toLocaleDateString()}
                        </p>
                    </div>
                    ))}
                    {reviews.length === 0 && !reviewsLoading && <p className="text-gray-500">Belum ada ulasan.</p>}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PlaceDetail;
