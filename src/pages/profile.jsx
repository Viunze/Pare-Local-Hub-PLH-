// src/pages/profile.jsx

import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { BottomNav } from '../components/common/BottomNav';
import { LogOut, User, Star, History, ShoppingBag, Utensils } from 'lucide-react';

const ProfilePage = () => {
  const { user, isLoading, logout, signInWithGoogle } = useAuth();

  if (isLoading) return <div className="text-center p-8">Memuat profil...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="p-4 bg-green-500 shadow-md">
        <h1 className="text-2xl font-bold text-white">Profil Saya</h1>
      </header>

      <main className="p-4">
        {user ? (
          <>
            {/* Kartu Profil */}
            <div className="bg-white p-6 rounded-xl shadow-lg flex items-center mb-6">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Avatar" 
                  className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-green-500"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <User size={30} className="text-gray-500" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{user.displayName || 'Pengguna PareHub'}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Menu Aksi */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <h3 className="text-lg font-bold p-4 border-b bg-gray-50">Aktivitas Saya</h3>

              {/* Riwayat Review */}
              <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b">
                <Star size={20} className="text-yellow-500 mr-3" />
                <span className="font-medium flex-1">Riwayat Ulasan Kuliner</span>
                <span>(3)</span>
              </div>
              
              {/* Riwayat Belanja (Simulasi) */}
              <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer border-b">
                <ShoppingBag size={20} className="text-blue-500 mr-3" />
                <span className="font-medium flex-1">Riwayat Belanja Produk</span>
                <span>(5)</span>
              </div>

              {/* Tombol Logout */}
              <button
                onClick={logout}
                className="w-full flex items-center p-4 text-red-600 font-bold hover:bg-red-50 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                Keluar (Logout)
              </button>
            </div>
          </>
        ) : (
          /* Tampilan Jika Belum Login */
          <div className="text-center p-10 bg-white rounded-xl shadow-lg">
            <User size={40} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Selamat Datang di Pare Hub</h2>
            <p className="text-gray-600 mb-4">Silakan masuk untuk menyimpan favorit dan memberikan ulasan.</p>
            
            <button
              onClick={signInWithGoogle}
              className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
            >
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="mr-2" />
              Masuk dengan Google
            </button>
          </div>
        )}
      </main>

      <BottomNav activePath="/profile" />
    </div>
  );
};

export default ProfilePage;
