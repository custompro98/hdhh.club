import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';

import { getAuth, User } from "firebase/auth"

import authenticate from '../lib/firebase/auth'
import firebase from '../lib/firebase/client';

export type AuthUser = {
  uid: string
  email: string
  name: string
  provider: string
  photoUrl: string
  token: string
  expirationTime: string
}

export type AuthContext = {
  user: AuthUser
  loading: boolean
  signinWithGoogle: (_: string) => void
  signout: () => void
  getFreshToken: () => Promise<string>
}

const authContext = createContext({});

export function AuthProvider({ children }) {
  const auth = useFirebaseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleUser = async (rawUser: (User | false)) => {
    if (rawUser) {
      const user = await formatUser(rawUser);

      setUser(user);

      setLoading(false);
      return user;
    } else {
      setUser(false);
      setLoading(false);
      return false;
    }
  };

  const signinWithGoogle = async () => {
    setLoading(true);

    const user = await authenticate()
    handleUser(user)
  };

  const signout = async () => {
    await getAuth(firebase).signOut()
    handleUser(false)
  };

  useEffect(() => {
    const unsubscribe = getAuth(firebase).onIdTokenChanged(handleUser);
    return () => unsubscribe();
  }, []);

  const getFreshToken = async (): Promise<string> => {
    console.log('getFreshToken called', new Date());
    const currentUser = getAuth(firebase).currentUser;
    if (currentUser) {
      const token = await currentUser.getIdToken(false);
      return `${token}`;
    } else {
      return '';
    }
  };

  return {
    user,
    loading,
    signinWithGoogle,
    signout,
    getFreshToken,
  };
}

const formatUser = async (user: User) => {
  const decodedToken = await user.getIdTokenResult(/*forceRefresh*/ true);
  const { token, expirationTime } = decodedToken;

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
    expirationTime,
  };
};
