// src/api_data/apiUser.js

import { db } from '../firebaseConfig';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc, setDoc } from 'firebase/firestore';

// Fungsi dasar untuk membuat/memastikan dokumen user ada
export const ensureUserDocument = async (uid, email, displayName) => {
    const userRef = doc(db, 'users', uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
        await setDoc(userRef, {
            email: email,
            displayName: displayName,
            favorite_places: [],
            favorite_products: [],
            createdAt: new Date(),
        });
    }
};

// Toggle Favorite untuk Kuliner atau Produk
export const toggleFavorite = async (uid, itemId, itemType) => {
    if (!uid) throw new Error("User ID tidak ditemukan.");
    
    const userRef = doc(db, 'users', uid);
    const fieldName = itemType === 'place' ? 'favorite_places' : 'favorite_products';
    
    // Ambil data user
    const docSnap = await getDoc(userRef);
    const currentFavorites = docSnap.data()?.[fieldName] || [];
    const isFavorited = currentFavorites.includes(itemId);

    if (isFavorited) {
        // Hapus dari favorit
        await updateDoc(userRef, {
            [fieldName]: arrayRemove(itemId)
        });
        return false; // Not favorited anymore
    } else {
        // Tambahkan ke favorit
        await updateDoc(userRef, {
            [fieldName]: arrayUnion(itemId)
        });
        return true; // Now favorited
    }
};

// Fungsi untuk mendapatkan semua data favorit user
export const getUserFavorites = async (uid) => {
    if (!uid) return { places: [], products: [] };
    const docSnap = await getDoc(doc(db, 'users', uid));
    if (docSnap.exists()) {
        const data = docSnap.data();
        return {
            favorite_places_ids: data.favorite_places || [],
            favorite_products_ids: data.favorite_products || [],
        };
    }
    return { favorite_places_ids: [], favorite_products_ids: [] };
};
