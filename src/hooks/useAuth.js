// src/hooks/useAuth.js

import { useState, useEffect } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
// Import 'auth' yang sudah diexport sebagai Named Export
import { auth } from '../firebase/firebaseConfig';

const googleProvider = new GoogleAuthProvider();

// Implementasi useAuth Anda
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // ... (fungsi sign in, sign out, dan useEffect)
    
    // Contoh implementasi dasar:
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

// Asumsi Anda juga memiliki AuthProvider, contoh dasarnya:
export const AuthProvider = ({ children }) => {
    const authValues = useAuth();
    return (
        <AuthContext.Provider value={authValues}>
            {children}
        </AuthContext.Provider>
    );
};
