// src/hooks/useFirestore.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
// Asumsi Anda telah mengatur Firebase di file ini:
import { db } from '../firebase/firebaseConfig'; 
import { collection, query, onSnapshot, orderBy, limit, where } from 'firebase/firestore'; 

// 1. Definisikan Context
const FirestoreContext = createContext();

// 2. Definisikan Hook untuk Konsumsi Data
// Hook ini menerima nama koleksi dan opsi query (where, limit, orderBy)
export const useFirestore = (collectionName, options = {}) => {
    const context = useContext(FirestoreContext);
    if (!context) {
        // Ini adalah error kritis jika hook digunakan tanpa dibungkus Provider
        throw new Error('useFirestore must be used within a FirestoreProvider');
    }
    
    // Logika mengambil data dari Firestore (menggunakan onSnapshot untuk real-time)
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!collectionName) {
            setIsLoading(false);
            return;
        }

        let q = collection(db, collectionName);
        
        // Tambahkan query options (where)
        if (options.where && Array.isArray(options.where)) {
            options.where.forEach(condition => {
                if (Array.isArray(condition) && condition.length === 3) {
                    q = query(q, where(condition[0], condition[1], condition[2]));
                }
            });
        }
        
        // Tambahkan query options (orderBy)
        if (options.orderBy && Array.isArray(options.orderBy)) {
            options.orderBy.forEach(field => {
                q = query(q, orderBy(field, options.orderDirection || 'asc'));
            });
        }

        // Tambahkan query options (limit)
        if (options.limit) {
            q = query(q, limit(options.limit));
        }

        // Setup Real-time Listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const list = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setData(list);
            setIsLoading(false);
        }, (err) => {
            setError(err.message);
            setIsLoading(false);
            console.error("Firestore error:", err);
        });

        // Cleanup listener saat komponen unmount
        return () => unsubscribe();
        
    }, [collectionName, JSON.stringify(options)]); // Dependency yang sensitif

    return { data, isLoading, error };
};

// 3. Definisikan Provider (Wajib Diekspor sebagai Named Export)
// Provider ini hanya berfungsi sebagai wrapper untuk membuat Context tersedia.
export const FirestoreProvider = ({ children }) => { // ✅ Ini memperbaiki error export
    const value = {}; // Tidak perlu state/value di sini jika data diambil langsung di hook

    return (
        <FirestoreContext.Provider value={value}>
            {children}
        </FirestoreContext.Provider>
    );
};
