// src/pages/products/[id].jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Heart, ShoppingCart, MessageSquare, MapPin } from 'lucide-react';

// Asumsi menggunakan useDocument dari langkah sebelumnya
const useDocument = (col, id) => { /* ... Implementasi ... */ return { document, loading: false } };

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // Asumsi mengambil produk dan detail penjual (bisa digabung di Cloud Function/join di client side)
  const { document: product, loading: productLoading } = useDocument('products', id);
  // const { document: seller, loading: sellerLoading } = useDocument('sellers', product?.seller_id); // Contoh fetch seller

  // Simulasi data jika belum di-fetch
  const simulatedProduct = {
    id: 'prod1', name: 'Tas Jinjing Kampung Inggris', price: 85000, category: 'Fashion', stock: 12,
    description: 'Tas jinjing kanvas premium dengan quote Bahasa Inggris unik. Cocok untuk kuliah atau jalan-jalan.',
    image_gallery: ['/images/product1_main.jpg', '/images/product1_side.jpg'], // Simulasi
    average_rating: 4.8, total_reviews: 45, seller_whatsapp: '6281234567890', 
    seller_name: 'UMKM English Style'
  };
  const productData = product || simulatedProduct;

  const [mainImage, setMainImage] = useState(productData.image_gallery[0]);
  const [quantity, setQuantity] = useState(1);
  
  if (productLoading) return <div className="text-center p-8">Memuat detail produk...</div>;

  const handleCheckoutViaWA = () => {
    const message = `Halo ${productData.seller_name}, saya tertarik membeli produk: ${productData.name}. Jumlah: ${quantity}. Total Harga: Rp ${(productData.price * quantity).toLocaleString('id-ID')}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${productData.seller_whatsapp}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Product Gallery */}
      <div className="relative bg-gray-100">
        <img src={mainImage} alt={productData.name} className="w-full h-80 object-cover" />
        <div className="flex justify-center space-x-2 p-2 bg-white/80 absolute bottom-0 w-full">
            {productData.image_gallery.map((img, index) => (
                <img key={index} src={img} alt={`thumb ${index}`} 
                    className={`w-12 h-12 object-cover border-2 cursor-pointer ${img === mainImage ? 'border-green-500' : 'border-gray-300'}`}
                    onClick={() => setMainImage(img)}
                />
            ))}
        </div>
      </div>

      <div className="p-4">
        {/* Nama & Harga */}
        <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{productData.name}</h1>
            <button className="p-1 text-gray-500 hover:text-red-500">
                <Heart size={24} /> {/* Logic Favorite Produk */}
            </button>
        </div>
        <p className="text-3xl font-extrabold text-green-600 mt-2">
            Rp {productData.price.toLocaleString('id-ID')}
        </p>

        {/* Info Penjual */}
        <div className="mt-4 flex items-center text-gray-700">
            <MapPin size={16} className="mr-2 text-green-500" />
            <span className="font-semibold">{productData.seller_name}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-sm">Stock: {productData.stock}</span>
        </div>
        
        {/* Deskripsi */}
        <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-700 text-sm">{productData.description}</p>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="font-semibold">Jumlah Beli:</span>
            <div className="flex items-center space-x-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 border rounded-full text-lg w-8 h-8 hover:bg-gray-100">-</button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(productData.stock, quantity + 1))} className="p-1 border rounded-full text-lg w-8 h-8 hover:bg-gray-100">+</button>
            </div>
        </div>

        {/* Total Harga */}
        <div className="mt-4 text-right border-t pt-4">
            <p className="text-lg text-gray-600">Total Pembelian:</p>
            <p className="text-3xl font-extrabold text-red-500">Rp {(productData.price * quantity).toLocaleString('id-ID')}</p>
        </div>
      </div>
      
      {/* Bottom Floating Bar Checkout */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-2xl flex space-x-3 md:hidden">
        <button 
            className="flex-1 flex items-center justify-center bg-green-500 text-white p-3 rounded-xl font-bold hover:bg-green-600 transition-colors"
            onClick={handleCheckoutViaWA}
        >
            <MessageSquare size={20} className="mr-2"/> Checkout via WA
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
