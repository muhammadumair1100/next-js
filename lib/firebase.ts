// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgeMDBGVl1ROilUNRJlbfvbsDyYDuKBSU",
  authDomain: "fir-project-cf757.firebaseapp.com",
  projectId: "fir-project-cf757",
  storageBucket: "fir-project-cf757.firebasestorage.app",
  messagingSenderId: "244309264434",
  appId: "1:244309264434:web:1a19435809e913f60f542b",
  measurementId: "G-JSS1BCTEJM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
