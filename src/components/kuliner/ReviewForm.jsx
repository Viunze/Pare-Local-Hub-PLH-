// src/components/kuliner/ReviewForm.jsx

import React, { useState } from 'react';
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc, serverTimestamp, runTransaction, doc } from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { Star } from 'lucide-react';

export const ReviewForm = ({ placeId, onReviewSuccess }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!user) {
    return <p className="text-center text-red-500">Anda harus login untuk memberikan review.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') {
      setError('Mohon isi rating bintang dan komentar.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    const placeRef = doc(db, 'places', placeId);

    try {
      await runTransaction(db, async (transaction) => {
        // 1. Tambah Review Baru ke Sub-Koleksi
        const newReviewRef = doc(collection(placeRef, 'reviews'));
        transaction.set(newReviewRef, {
          userId: user.uid,
          userName: user.displayName || 'Anonim',
          rating: rating,
          comment: comment.trim(),
          timestamp: serverTimestamp(),
        });

        // 2. Update Rata-rata Rating di Dokumen Utama (places)
        const placeDoc = await transaction.get(placeRef);
        if (!placeDoc.exists()) throw "Dokumen tempat tidak ditemukan!";

        const currentData = placeDoc.data();
        const totalReviews = (currentData.total_reviews || 0) + 1;
        const currentSumRating = (currentData.average_rating || 0) * (currentData.total_reviews || 0);
        const newAverageRating = (currentSumRating + rating) / totalReviews;

        transaction.update(placeRef, {
          average_rating: newAverageRating,
          total_reviews: totalReviews,
        });
      });

      setRating(0);
      setComment('');
      onReviewSuccess && onReviewSuccess(); // Notifikasi success
      alert('Review berhasil ditambahkan!');

    } catch (e) {
      console.error("Error adding review or updating rating:", e);
      setError('Gagal menyimpan review. Coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg bg-white mt-4">
      <h3 className="font-bold text-lg mb-3">Beri Nilai Tempat Ini</h3>
      
      {/* Input Rating Bintang */}
      <div className="flex space-x-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={30}
            className={`cursor-pointer transition-colors ${
              star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            }`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      
      {/* Input Komentar */}
      <textarea
        className="w-full p-2 border rounded resize-none focus:ring-green-500 focus:border-green-500"
        rows="3"
        placeholder="Bagaimana pengalaman Anda? (Min 10 karakter)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        minLength={10}
        required
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-3 w-full bg-green-500 text-white p-2 rounded-lg font-semibold hover:bg-green-600 disabled:bg-green-300 transition-colors"
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Review'}
      </button>
    </form>
  );
};
