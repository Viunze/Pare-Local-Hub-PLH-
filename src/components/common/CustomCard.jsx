// src/components/common/CustomCard.jsx

import React from 'react';

export const CustomCard = ({ title, subtitle, image, rating, onClick, priceRange }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      {/* Gambar dengan rasio 4:3 atau 16:9 */}
      <div className="relative h-36 w-full">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Rating di pojok kanan atas */}
        {rating && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            ⭐ {rating.toFixed(1)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-base truncate">{title}</h3>
        <p className="text-sm text-gray-500 mt-1 flex items-center">
          {subtitle} 
          {priceRange && <span className="ml-2 font-mono text-green-600">{priceRange}</span>}
        </p>
      </div>
    </div>
  );
};
