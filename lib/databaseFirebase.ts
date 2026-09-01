import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgeMDBGVl1ROilUNRJlbfvbsDyYDuKBSU",
  authDomain: "fir-project-cf757.firebaseapp.com",
  databaseURL: "https://fir-project-cf757-default-rtdb.firebaseio.com",
  projectId: "fir-project-cf757",
  storageBucket: "fir-project-cf757.firebasestorage.app",
  messagingSenderId: "244309264434",
  appId: "1:244309264434:web:1a19435809e913f60f542b",
  measurementId: "G-JSS1BCTEJM",
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);
const realTimeDB = getDatabase(app);

export { firestoreDB, realTimeDB, app };
