// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import 'firebase/compat/database';

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
//   authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_REACT_APP_APP_ID,
//   databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
// };

// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const auth = firebaseApp.auth();
// const firestore = firebaseApp.firestore();
// const database = firebaseApp.database();

// export default firebase; // Export the entire Firebase module
// export { auth, firestore, database };

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_APP_ID,
  // databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const database = getDatabase();
const storage = getStorage();

export { auth, db, database, storage };
export default firebaseApp;
