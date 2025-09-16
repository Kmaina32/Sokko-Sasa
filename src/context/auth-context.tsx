
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, getAdditionalUserInfo, UserCredential } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { addUserData } from '@/lib/firestore';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signup: typeof createUserWithEmailAndPassword;
  login: typeof signInWithEmailAndPassword;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: createUserWithEmailAndPassword,
  login: signInWithEmailAndPassword,
  loginWithGoogle: () => signInWithPopup(auth, googleProvider),
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const loginWithGoogle = async () => {
      const result = await signInWithPopup(auth, googleProvider);
      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser) {
        await addUserData(result.user, { name: result.user.displayName });
      }
      return result;
  }

  const value = {
    user,
    loading,
    signup: (email, password) => createUserWithEmailAndPassword(auth, email, password),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    loginWithGoogle,
    logout: () => signOut(auth),
  };

  if (loading) {
     return (
       <div className="flex items-center justify-center h-screen">
          <Skeleton className="w-24 h-24 rounded-full" />
       </div>
     )
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
