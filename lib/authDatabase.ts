import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5cAhv5lr4OYRLAa567MlgGE4D6gTRuf8",
  authDomain: "auth-project-5b981.firebaseapp.com",
  projectId: "auth-project-5b981",
  storageBucket: "auth-project-5b981.firebasestorage.app",
  messagingSenderId: "179619369617",
  appId: "1:179619369617:web:f3150a9c4620c2d1dfe530",
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

export { firestoreDB, app };
