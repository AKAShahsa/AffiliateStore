import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { ref, set, get } from 'firebase/database';

interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  phone?: string;
  notifications?: {
    emailUpdates: boolean;
    smsUpdates: boolean;
    pushNotifications: boolean;
    marketing: boolean;
  };
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
  updateUserNotifications: (notifications: UserData['notifications']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const { displayName, email, photoURL, uid } = firebaseUser;
        const userRef = ref(database, `users/${uid}`);
        const snap = await get(userRef);
        let dbUser = snap.exists() ? snap.val() : {};
        let userData: UserData = {
          uid,
          name: dbUser.name ?? displayName ?? '',
          email: dbUser.email ?? email ?? '',
          photoURL: dbUser.photoURL ?? photoURL ?? '',
          phone: dbUser.phone ?? '',
          notifications: dbUser.notifications ?? {
            emailUpdates: false,
            smsUpdates: false,
            pushNotifications: false,
            marketing: false
          }
        };
        if (!snap.exists()) {
          await set(userRef, userData);
        }
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const firebaseUser: FirebaseUser = result.user;
    const { displayName, email, photoURL, uid } = firebaseUser;
    const userRef = ref(database, `users/${uid}`);
    const snap = await get(userRef);
    let dbUser = snap.exists() ? snap.val() : {};
    let userData: UserData = {
      uid,
      name: dbUser.name ?? displayName ?? '',
      email: dbUser.email ?? email ?? '',
      photoURL: dbUser.photoURL ?? photoURL ?? '',
      phone: dbUser.phone ?? '',
      notifications: dbUser.notifications ?? {
        emailUpdates: false,
        smsUpdates: false,
        pushNotifications: false,
        marketing: false
      }
    };
    await set(userRef, userData);
    setUser(userData);
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUserProfile = async (data: Partial<UserData>) => {
    if (!user) return;
    const userRef = ref(database, `users/${user.uid}`);
    const snap = await get(userRef);
    const dbUser = snap.exists() ? snap.val() : {};
    const updatedUser = { ...dbUser, ...data };
    await set(userRef, updatedUser);
    setUser((prev) => prev ? { ...prev, ...data } : prev);
  };

  const updateUserNotifications = async (notifications: UserData['notifications']) => {
    if (!user) return;
    const userRef = ref(database, `users/${user.uid}`);
    const snap = await get(userRef);
    const dbUser = snap.exists() ? snap.val() : {};
    const updatedUser = { ...dbUser, notifications };
    await set(userRef, updatedUser);
    setUser((prev) => prev ? { ...prev, notifications } : prev);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOutUser, updateUserProfile, updateUserNotifications }}>
      {children}
    </AuthContext.Provider>
  );
}; 