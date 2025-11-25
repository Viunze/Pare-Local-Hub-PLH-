// src/firebase/firebaseConfig.js (Perbaikan Penuh)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- Tambahkan ini untuk Auth
import { getFirestore } from "firebase/firestore"; // <-- Tambahkan ini untuk Firestore

const firebaseConfig = {
  // Pastikan semua VITE_... environment variables ada di Vercel
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Services dan Export sebagai Named Exports
export const auth = getAuth(app);    // <-- PENTING: Export 'auth'
export const db = getFirestore(app); // <-- Export 'db' untuk useFirestore

// Catatan: 'app' juga bisa diekspor jika diperlukan
// export { app };
