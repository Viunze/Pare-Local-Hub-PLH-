// src/features/marketplace/pages/ProductDetail.jsx
// Menggunakan hook dan API yang baru

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { useDocument } from '../../../hooks/useDocument';
import { toggleFavorite } from '../../../api_data/apiUser';
import { Heart, MessageSquare, MapPin } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { document: product, loading } = useDocument('products', id);

  const sellerInfo = { 
      name: product?.seller_name || 'UMKM Lokal', 
      whatsapp: product?.seller_whatsapp || '6281234567890' // Asumsi data WhatsApp ada
  };
  
  const [mainImage, setMainImage] = useState(product?.image_gallery?.[0] || 'https://via.placeholder.com/400x300?text=Produk');
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false); 

  if (loading) return <div className="text-center p-8">Memuat detail produk...</div>;
  if (!product) return <div className="text-center p-8 text-red-500">Produk tidak ditemukan.</div>;

  React.useEffect(() => {
    if (product && product.image_gallery && product.image_gallery.length > 0) {
        setMainImage(product.image_gallery[0]);
    }
  }, [product]);

  const handleCheckoutViaWA = () => {
    const total = product.price * quantity;
    const message = `Halo ${sellerInfo.name}, saya tertarik membeli produk: ${product.name}. Jumlah: ${quantity}. Total Harga: Rp ${total.toLocaleString('id-ID')}.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${sellerInfo.whatsapp}?text=${encodedMessage}`, '_blank');
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Silakan login untuk menyimpan favorit.");
      return;
    }
    try {
        const result = await toggleFavorite(user.uid, id, 'product');
        setIsFavorited(result); 
        alert(`${result ? 'Ditambahkan ke' : 'Dihapus dari'} Wishlist!`);
    } catch (e) {
        alert("Gagal mengupdate favorit.");
    }
  };


  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="relative bg-gray-100">
        <img src={mainImage} alt={product.name} className="w-full h-80 object-cover" />
        <div className="flex justify-center space-x-2 p-2 bg-white/80 absolute bottom-0 w-full">
            {product.image_gallery?.map((img, index) => (
                <img key={index} src={img} alt={`thumb ${index}`} 
                    className={`w-12 h-12 object-cover border-2 cursor-pointer ${img === mainImage ? 'border-green-500' : 'border-gray-300'}`}
                    onClick={() => setMainImage(img)}
                />
            ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <button onClick={handleToggleFavorite} className="p-1 text-gray-500 hover:text-red-500">
                <Heart size={24} className={isFavorited ? 'text-red-500 fill-red-500' : 'text-gray-500'} /> 
            </button>
        </div>
        <p className="text-3xl font-extrabold text-green-600 mt-2">
            Rp {product.price.toLocaleString('id-ID')}
        </p>

        <div className="mt-4 flex items-center text-gray-700">
            <MapPin size={16} className="mr-2 text-green-500" />
            <span className="font-semibold">{sellerInfo.name}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-sm">Stock: {product.stock}</span>
        </div>
        
        <div className="mt-6 border-t pt-4">
            <h2 className="text-lg font-bold mb-2">Deskripsi Produk</h2>
            <p className="text-gray-700 text-sm">{product.description}</p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t pt-4">
            <span className="font-semibold">Jumlah Beli:</span>
            <div className="flex items-center space-x-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-1 border rounded-full text-lg w-8 h-8 hover:bg-gray-100">-</button>
                <span className="font-bold">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-1 border rounded-full text-lg w-8 h-8 hover:bg-gray-100">+</button>
            </div>
        </div>

        <div className="mt-4 text-right border-t pt-4">
            <p className="text-lg text-gray-600">Total Pembelian:</p>
            <p className="text-3xl font-extrabold text-red-500">Rp {(product.price * quantity).toLocaleString('id-ID')}</p>
        </div>
      </div>
      
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
