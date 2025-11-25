// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics"; // Opsional

// Your web app's Firebase configuration (gunakan yang Anda berikan)
const firebaseConfig = {
  apiKey: "AIzaSyBaPUJWt_E0aDPRTsB7KhMx9gQ6MbNas5c",
  authDomain: "lyntrix-d309a.firebaseapp.com",
  projectId: "lyntrix-d309a",
  storageBucket: "lyntrix-d309a.firebasestorage.app",
  messagingSenderId: "481360999219",
  appId: "1:481360999219:web:92a5c7097f5fe7fb1a4446",
  measurementId: "G-ZJD7XR61WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Inisialisasi Analytics jika diperlukan

// Inisialisasi layanan yang akan digunakan
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export app instance
export default app;
