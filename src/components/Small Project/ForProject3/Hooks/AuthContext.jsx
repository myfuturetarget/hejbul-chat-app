import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, storage, db } from '../../../../../firebase';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      console.log(user);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Signup function.....
  async function signup(email, password, displayName, file) {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);

    await uploadBytesResumable(storageRef, file).then(() => {
      getDownloadURL(storageRef).then(async downloadURL => {
        await updateProfile(res.user, {
          displayName: displayName,
          photoURL: downloadURL,
        });
        const user = res.user;
        setCurrentUser({
          ...user,
        });
        await setDoc(doc(db, 'users', res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, 'userChats', res.user.uid), {});
      });
    });
  }

  // login function...
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout function...
  function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
