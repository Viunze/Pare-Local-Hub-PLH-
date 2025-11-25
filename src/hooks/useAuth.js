// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// ✅ Import 'auth' yang sudah diexport sebagai Named Export
import { auth } from '../firebase/firebaseConfig';

const googleProvider = new GoogleAuthProvider();

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signIn = () => signInWithPopup(auth, googleProvider);
    const logOut = () => signOut(auth);

    return { user, isLoading, signIn, logOut };
};

// ... (Asumsi Anda punya AuthProvider yang membungkus aplikasi)
