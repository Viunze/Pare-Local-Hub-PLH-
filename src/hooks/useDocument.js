// src/hooks/useDocument.js

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export const useDocument = (collectionName, id) => {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) { setLoading(false); return; }

        const docRef = doc(db, collectionName, id);
        
        const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
                setDocument({ id: docSnap.id, ...docSnap.data() });
            } else {
                setDocument(null);
                setError("Dokumen tidak ditemukan.");
            }
            setLoading(false);
        }, (err) => {
            console.error("Firestore document fetch error:", err);
            setError("Gagal mengambil data dari server.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName, id]);

    return { document, loading, error };
};
