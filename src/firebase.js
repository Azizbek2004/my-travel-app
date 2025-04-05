import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB1UmksGKpf2kG9_kCIaPns1CNpf16ToBc',
  authDomain: 'my-travel-app-43469.firebaseapp.com',
  projectId: 'my-travel-app-43469',
  storageBucket: 'my-travel-app-43469.firebasestorage.app',
  messagingSenderId: '781957445432',
  appId: '1:781957445432:web:b477e1eaa575162b4533cd',
  measurementId: 'G-8WV0WNTLBJ',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
