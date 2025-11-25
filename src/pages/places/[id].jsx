// src/pages/places/[id].jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Asumsi menggunakan React Router
import { doc, getDoc, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { useAuth } from '../../hooks/useAuth';
import { ReviewForm } from '../../components/kuliner/ReviewForm';
import { useFirestore } from '../../hooks/useFirestore';
import { MapPin, Clock, ExternalLink, Heart, Star } from 'lucide-react';

// Hook untuk mengambil 1 dokumen (Perlu dibuat di src/hooks/useDocument.js)
const useDocument = (col, id) => {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const docRef = doc(db, col, id);
        getDoc(docRef).then(d => {
            setDocument(d.exists() ? { id: d.id, ...d.data() } : null);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [col, id]);
    return { document, loading };
};


const PlaceDetail = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const { user } = useAuth();
  const { document: place, loading } = useDocument('places', id);

  // Mengambil Reviews Realtime dari Sub-Koleksi
  const { data: reviews, isLoading: reviewsLoading } = useFirestore(`places/${id}/reviews`, {
    orderBy: ['timestamp', 'desc'],
  });
  
  const [isFavorited, setIsFavorited] = useState(false); // State untuk Favorite

  // Simulasi Toggle Favorit (Logika perlu diimplementasikan menggunakan transaction/update array di koleksi 'users')
  const handleToggleFavorite = () => {
    if (!user) {
      alert("Silakan login untuk menyimpan favorit.");
      return;
    }
    // TODO: Implementasi logika update array favorite_places di koleksi 'users'
    setIsFavorited(!isFavorited);
    alert(`${!isFavorited ? 'Ditambahkan ke' : 'Dihapus dari'} Favorit!`);
  };

  if (loading) return <div className="text-center p-8">Memuat detail tempat...</div>;
  if (!place) return <div className="text-center p-8 text-red-500">Tempat tidak ditemukan.</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Gambar Header */}
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
        {/* Nama & Rating */}
        <h1 className="text-3xl font-bold text-gray-900">{place.name}</h1>
        <div className="flex items-center mt-1 text-sm text-gray-600">
          <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span className="font-semibold">{place.average_rating.toFixed(1)}</span>
          <span className="mx-1">|</span>
          <span>{place.total_reviews} Ulasan</span>
        </div>

        {/* Info Lokasi & Jam Buka */}
        <div className="mt-4 border-t pt-4">
          <p className="flex items-center text-gray-700">
            <MapPin size={18} className="mr-2 text-green-500" />
            {place.address}
          </p>
          <p className="flex items-center text-gray-700 mt-2">
            <Clock size={18} className="mr-2 text-green-500" />
            {place.hours.time}
          </p>
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${place.location.latitude},${place.location.longitude}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline flex items-center mt-2 text-sm"
          >
            Lihat di Google Maps <ExternalLink size={14} className="ml-1" />
          </a>
        </div>

        {/* Menu (Simulasi) */}
        <div className="mt-6 border-t pt-4">
            <h2 className="text-xl font-bold mb-2">Daftar Menu Populer</h2>
            <ul className="space-y-1 text-gray-700">
                {/* Asumsi data menu ada di 'place.menu' atau diambil dari koleksi lain */}
                <li>Nasi Goreng Kampung: Rp 15.000</li>
                <li>Iced Latte: Rp 18.000</li>
            </ul>
        </div>
        
        {/* --- Bagian Review --- */}
        <div className="mt-8 border-t pt-4">
          <h2 className="text-xl font-bold mb-3">Ulasan Pengunjung ({place.total_reviews})</h2>
          
          {/* Form Review */}
          <ReviewForm placeId={id} onReviewSuccess={() => { /* re-fetch data/update UI */ }} />

          {/* List Review Realtime */}
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
