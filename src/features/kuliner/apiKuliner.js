// src/features/kuliner/apiKuliner.js

import { db } from '../../firebaseConfig';
import { doc, addDoc, runTransaction, getDoc, collection, serverTimestamp } from 'firebase/firestore';

export const addReviewAndUpdateRating = async (placeId, rating, comment, user) => {
    const placeRef = doc(db, 'places', placeId);

    const reviewData = {
        userId: user.uid,
        userName: user.displayName || 'Anonim',
        rating: rating,
        comment: comment,
        timestamp: serverTimestamp(),
    };

    try {
        await runTransaction(db, async (transaction) => {
            // 1. Tambah Review Baru ke Sub-Koleksi
            const newReviewRef = doc(collection(placeRef, 'reviews'));
            transaction.set(newReviewRef, reviewData);

            // 2. Update Rata-rata Rating di Dokumen Utama (places)
            const placeDoc = await transaction.get(placeRef);
            if (!placeDoc.exists()) throw "Dokumen tempat tidak ditemukan!";

            const currentTotalReviews = (placeDoc.data().total_reviews || 0);
            const currentAverageRating = (placeDoc.data().average_rating || 0);
            const totalReviews = currentTotalReviews + 1;
            const currentSumRating = currentAverageRating * currentTotalReviews;
            const newAverageRating = (currentSumRating + rating) / totalReviews;

            transaction.update(placeRef, {
                average_rating: newAverageRating,
                total_reviews: totalReviews,
            });
        });
        return { success: true };
    } catch (e) {
        console.error("Error adding review or updating rating:", e);
        return { success: false, error: e.message };
    }
};
