import React from 'react';
import { Star, MapPin, Tag } from 'lucide-react'; // Menambah Tag icon

/**
 * Custom Card untuk menampilkan detail lokasi atau produk.
 * Menerima props tambahan: subtitle, image (menggantikan imageUrl), dan priceRange.
 */
const CustomCard = ({ 
  id, 
  title, 
  // ✅ PROPS BARU DITAMBAHKAN
  subtitle, 
  priceRange,
  // ✅ Nama props diubah: image (dari HomeDashboard)
  image, 
  // ✅ Nama props diubah: location (dianggap sebagai subtitle/category jika priceRange ada)
  location, 
  rating, 
  // ✅ Description dihilangkan dari HomeDashboard, tetapi tetap di sini untuk kompatibilitas
  description, 
  onClick 
}) => {
  
  // Fungsi helper untuk menampilkan bintang
  const renderStars = (currentRating) => {
    const safeRating = Math.round(currentRating || 0); // Pastikan rating adalah integer
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${i <= safeRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      );
    }
    return <div className="flex items-center space-x-0.5">{stars}</div>;
  };

  return (
    <div
      className="bg-white card-shadow rounded-xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
      // Fungsi onClick sekarang menerima ID dan TYPE (asumsi type dihandle di component parent)
      onClick={() => onClick(id)} 
    >
      {/* Bagian Gambar */}
      <div className="h-40 overflow-hidden">
        <img 
          // ✅ Menggunakan props 'image'
          src={image || 'https://via.placeholder.com/400x300/f0f0f0?text=Image+Not+Found'} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bagian Konten */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 truncate mb-1">{title}</h3>
        
        {/* Subtitle (Kategori atau Range Harga) */}
        <p className="text-sm text-gray-500 mb-2 truncate">
          {subtitle || location || 'Tanpa Kategori'}
        </p>

        {/* Rating dan Detail Tambahan (Price Range/Location) */}
        <div className="flex justify-between items-center text-sm mb-2">
          {renderStars(rating)}
          
          {/* ✅ Menampilkan Price Range untuk Kuliner, atau Location/MapPin jika ada */}
          <div className="flex items-center text-gray-600">
            {priceRange ? (
              <>
                <Tag className="h-4 w-4 mr-1 text-orange-500" />
                <span className="font-semibold">{priceRange}</span>
              </>
            ) : location ? (
              <>
                <MapPin className="h-4 w-4 mr-1 text-green-500" />
                <span className="truncate max-w-[80px]">{location}</span>
              </>
            ) : null}
          </div>
        </div>
        
        {/* Deskripsi Singkat (Hanya jika ada) */}
        {description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomCard;
