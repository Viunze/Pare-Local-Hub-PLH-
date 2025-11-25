import React, { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * Formulir untuk mengirimkan Review dan Rating.
 * Menggunakan custom classes input-field dan btn-primary.
 */
const ReviewForm = ({ placeId, onSubmitReview }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi untuk menangani submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || rating === 0) return;

    setIsSubmitting(true);
    
    // Simulasikan pengiriman data ke Firebase
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const newReview = {
      placeId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      // Tambahkan detail user dari Auth context jika ada
      userName: 'User Testing', 
    };

    onSubmitReview(newReview); // Panggil fungsi dari prop
    
    // Reset form
    setRating(0);
    setComment('');
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 **card-shadow**">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Tulis Review Anda</h3>
      <form onSubmit={handleSubmit}>
        
        {/* Rating Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Beri Rating:</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((starValue) => (
              <Star
                key={starValue}
                className={`h-7 w-7 cursor-pointer transition-colors ${
                  starValue <= rating 
                    ? '**star-rating-active**' // Custom class untuk warna aktif
                    : 'text-gray-300'
                }`}
                onClick={() => setRating(starValue)}
                fill={starValue <= rating ? '#facc15' : 'none'} // Warna fill langsung untuk bintang
              />
            ))}
          </div>
        </div>

        {/* Komentar Section */}
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">Komentar:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="**input-field** resize-none" // <-- Menggunakan custom class
            rows="4"
            placeholder="Bagikan pengalaman Anda tentang tempat ini..."
            required
          />
        </div>

        {/* Tombol Submit */}
        <button
          type="submit"
          disabled={isSubmitting || rating === 0}
          className="mt-2 w-full **btn-primary** disabled:bg-gray-400 disabled:cursor-not-allowed" // <-- Menggunakan custom class
        >
          {isSubmitting ? 'Mengirim Review...' : 'Kirim Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
