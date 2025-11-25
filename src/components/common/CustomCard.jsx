import React from 'react';
import { Star, MapPin } from 'lucide-react'; // Asumsi Anda menggunakan Lucide icons

/**
 * Custom Card untuk menampilkan detail lokasi atau produk.
 * Menggunakan gaya modern dengan shadow lembut (card-shadow).
 */
const CustomCard = ({ 
  id, 
  title, 
  description, 
  rating, 
  location, 
  imageUrl, 
  onClick 
}) => {
  // Fungsi helper untuk menampilkan bintang
  const renderStars = (currentRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          // Gunakan custom class rating jika Anda mendefinisikannya, atau langsung Tailwind
          className={`h-4 w-4 ${i <= currentRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  return (
    <div
      className="bg-white **card-shadow** rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      onClick={() => onClick(id)}
    >
      {/* Bagian Gambar */}
      <div className="h-40 overflow-hidden">
        <img 
          src={imageUrl || 'https://via.placeholder.com/400x300/f0f0f0?text=Image+Not+Found'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian Konten */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{title}</h3>
        
        {/* Rating dan Lokasi */}
        <div className="flex justify-between items-center mb-2">
          {renderStars(rating)}
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1 text-green-500" />
            <span className="truncate max-w-[80px]">{location}</span>
          </div>
        </div>
        
        {/* Deskripsi Singkat */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {description || 'Deskripsi singkat tentang tempat atau produk ini.'}
        </p>
      </div>
    </div>
  );
};

export default CustomCard;
