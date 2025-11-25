// src/hooks/useFirestore.js

import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useFirestore = (collectionName, queryOptions = {}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    let collectionRef = collection(db, collectionName);
    let q = query(collectionRef);

    // Menambahkan filter (where) jika ada
    if (queryOptions.where) {
      queryOptions.where.forEach(w => {
        q = query(q, where(w[0], w[1], w[2]));
      });
    }

    // Menambahkan ordering
    if (queryOptions.orderBy) {
      q = query(q, orderBy(queryOptions.orderBy[0], queryOptions.orderBy[1] || 'asc'));
    }

    // Menambahkan limit
    if (queryOptions.limit) {
      q = query(q, limit(queryOptions.limit));
    }

    // Menggunakan onSnapshot untuk realtime update
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(results);
      setIsLoading(false);
      setError(null);
    }, (err) => {
      console.error("Firestore data fetch error:", err);
      setError("Gagal mengambil data dari server.");
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, [collectionName, JSON.stringify(queryOptions)]); // Dependensi di-stringify agar objek queryOptions terdeteksi perubahannya

  return { data, isLoading, error };
};
