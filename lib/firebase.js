import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYHHB3HEYximUaJPt93azVww54I--zeO8",
  authDomain: "intellect-cosmic.firebaseapp.com",
  projectId: "intellect-cosmic",
  storageBucket: "intellect-cosmic.firebasestorage.app",
  messagingSenderId: "655839747415",
  appId: "1:655839747415:web:d3dfc9de61751f245cf212",
  measurementId: "G-S7EX842DB6",
};

// Initialize Firebase app
let app;
let auth;
let db;
let storage;
let functions;

try {
  // Initialize Firebase
  app = initializeApp(firebaseConfig);

  // Initialize Auth with AsyncStorage persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });

  // Initialize Firestore
  db = getFirestore(app);

  // Initialize Storage
  storage = getStorage(app);

  // Initialize Functions
  functions = getFunctions(app);

} catch (error) {
  console.error("Error initializing Firebase:", error);
  // We don't re-throw to avoid crashing the app, but we've logged the error
}

// Export initialized services
export { app, auth, db, storage, functions };

// Default export
export default { app, auth, db, storage, functions };