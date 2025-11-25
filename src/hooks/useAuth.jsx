// src/hooks/useAuth.js

import React, { useState, useEffect, useContext, createContext } from 'react';
import { onAuthStateChanged, /* signInWithPopup, signOut, GoogleAuthProvider */ } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'; // Asumsi auth sudah diimpor

// 1. Definisikan Context
const AuthContext = createContext(null);

// 2. Definisikan Hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Definisikan Provider
export const AuthProvider = ({ children }) => { // 🛑 HARUS DIEKSPOR SEBAGAI NAMED EXPORT
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Gabungkan signIn/signOut/logOut jika Anda memilikinya di sini
    const value = { user, isLoading, /* signIn, logOut */ };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};
