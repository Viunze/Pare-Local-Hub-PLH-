// src/pages/maps.jsx

import React from 'react';
import { BottomNav } from '../components/common/BottomNav';
import { MapPin } from 'lucide-react';

const MapsPage = () => {
    // TODO: Implementasi integrasi Google Maps JS API di sini
    // Data pin (places) akan diambil menggunakan useFirestore('places')

    return (
        <div className="min-h-screen">
            <header className="p-4 bg-white shadow-sm">
                <h1 className="text-2xl font-bold text-green-600 flex items-center"><MapPin className="mr-2" /> Peta Kuliner Pare</h1>
            </header>

            <div className="h-[calc(100vh-8rem)] bg-gray-200 flex items-center justify-center text-center">
                <div className="p-4 text-gray-600">
                    <p className="font-semibold">Simulasi Peta Interaktif</p>
                    <p className="text-sm mt-1">Implementasikan Google Maps API di sini untuk menampilkan pin lokasi tempat makan dari Firestore (GeoPoint).</p>
                    <p className="text-xs mt-2 text-green-700">Tips: Gunakan data `location` (GeoPoint) dari koleksi `places`.</p>
                </div>
            </div>

            <BottomNav activePath="/maps" />
        </div>
    );
};

export default MapsPage;
