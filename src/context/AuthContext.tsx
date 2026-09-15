import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  User as FirebaseUser, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface User {
  email: string;
  id: string;
  role?: string;
  status?: string;
  name?: string;
  emailVerified?: boolean;
}

export interface Session {
  user: User;
}

interface AuthContextType {
  session: Session | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginWithEmail: (e: string, p: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string, phone: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
  isLoading: boolean;
  googleAccessToken: string | null;
  setGoogleAccessToken: (t: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Fetch or create user document
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          let role = 'user';
          let status = 'ACTIVE';
          let name = firebaseUser.displayName || '';

          if (firebaseUser.email?.toLowerCase() === 'eromoseledavidson68@gmail.com') {
            role = 'admin';
          }

          if (!userDoc.exists()) {
            try {
              await setDoc(userDocRef, {
                email: firebaseUser.email,
                name: name,
                role: role,
                status: status,
                emailVerified: firebaseUser.emailVerified,
                createdAt: Date.now(),
                lastLogin: Date.now()
              }, { merge: true });
            } catch (e) {
              console.warn("Could not save user doc (offline):", e);
            }
          } else {
            const data = userDoc.data();
            role = data.role || role;
            status = data.status || status;
            name = data.name || name;
            
            try {
              await setDoc(userDocRef, {
                lastLogin: Date.now(),
                emailVerified: firebaseUser.emailVerified,
              }, { merge: true });
            } catch (e) {
              console.warn("Could not update lastLogin (offline):", e);
            }
          }

          if (status === 'BLACKLISTED') {
            await signOut(auth);
            setSession(null);
            alert('Your account has been blacklisted. Please contact support.');
          } else {
            setSession({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                name: name,
                role: role,
                status: status,
                emailVerified: firebaseUser.emailVerified
              }
            });
          }
        } catch (error: any) {
          if (error.code === 'unavailable' || error.message?.includes('offline')) {
            console.warn("Offline: using fallback session.");
          } else {
            console.error("Error in auth state change handling:", error);
          }
          // Fallback session if offline
          setSession({
            user: {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              name: firebaseUser.displayName || '',
              role: firebaseUser.email?.toLowerCase() === 'eromoseledavidson68@gmail.com' ? 'admin' : 'user',
              status: 'ACTIVE',
              emailVerified: firebaseUser.emailVerified
            }
          });
        }
      } else {
        setSession(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/drive.file');
    provider.addScope('https://www.googleapis.com/auth/drive.appdata');
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (credential?.accessToken) {
      setGoogleAccessToken(credential.accessToken);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signupWithEmail = async (email: string, pass: string, name: string, phone: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName: name });
    
    // Send email verification
    try {
      await sendEmailVerification(user);
    } catch (e) {
      console.warn("Failed to send verification email:", e);
    }

    // Explicitly create user doc here since onAuthStateChanged is async
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      fullName: name,
      name: name,
      email: email,
      phone: phone,
      role: 'user',
      status: 'ACTIVE',
      createdAt: Date.now(),
      lastLogin: Date.now(),
      emailVerified: false
    });
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const resendVerification = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Please check your inbox.");
    }
  };

  const logout = async () => {
    await signOut(auth);
    setGoogleAccessToken(null);
  };

  if (isLoading) return null; // or a loading spinner

  return (
    <AuthContext.Provider value={{ 
      session, login, loginWithEmail, signupWithEmail, resetPassword, resendVerification, logout, isLoading, googleAccessToken, setGoogleAccessToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

