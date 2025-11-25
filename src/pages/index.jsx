// src/pages/index.jsx (Sederhanakan untuk Debugging)

import React from 'react';

// Hapus semua import hooks dan komponen lain untuk sementara
// import { useAuth } from '../hooks/useAuth'; 
// import CustomCard from '../components/common/CustomCard'; 
// import LogoSVG from '../assets/logo.svg'; 

const HomeDashboard = () => {
    // Jika Anda melihat ini, masalahnya BUKAN pada inisialisasi React/DOM.
    return (
        <div style={{ 
            height: '100vh', 
            backgroundColor: '#FFEBEE', // Warna terang agar terlihat jelas
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '24px',
            color: '#D32F2F' 
        }}>
            <h1>✅ RENDER SUKSES! APLIKASI SEHARUSNYA MUNCUL!</h1>
        </div>
    );
};

export default HomeDashboard;
