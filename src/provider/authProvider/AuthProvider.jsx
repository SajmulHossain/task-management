/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../firebase/firebase.init";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const createNewUser = (email, password) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if(currentUser) {
        setUser(currentUser);
      } else {
        currentUser(null);
      }
      setLoading(false);
    })

    return () => {
      unsubscribe();
    }
  }, [])

  const data = { user, signInWithGoogle, createNewUser, loading };
  return <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>;
};

export default AuthProvider;
