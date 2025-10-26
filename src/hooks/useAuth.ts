import { useState, useEffect, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../utils/firebase";

interface AuthError {
  code: string;
  message: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Helper to handle Firebase auth errors
  const handleAuthError = useCallback((error: AuthError): string => {
    switch (error.code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/invalid-email":
        return "Invalid email address.";
      case "auth/network-request-failed":
        return "Network error. Please check your connection.";
      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";
      case "auth/popup-closed-by-user":
        return "Sign-in popup was closed.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  }, []);

  // Sign in with email and password
  const signIn = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        setError(null);
        await signInWithEmailAndPassword(auth, email, password);
        return true;
      } catch (err) {
        const errorMessage = handleAuthError(err as AuthError);
        setError(errorMessage);
        return false;
      }
    },
    [handleAuthError]
  );

  // Register with email and password
  const register = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      try {
        setError(null);
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
      } catch (err) {
        const errorMessage = handleAuthError(err as AuthError);
        setError(errorMessage);
        return false;
      }
    },
    [handleAuthError]
  );

  // Sign in with Google
  const signInWithGoogle = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err as AuthError);
      setError(errorMessage);
      return false;
    }
  }, [handleAuthError]);

  // Send password reset email
  const resetPassword = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setError(null);
        await sendPasswordResetEmail(auth, email);
        return true;
      } catch (err) {
        const errorMessage = handleAuthError(err as AuthError);
        setError(errorMessage);
        return false;
      }
    },
    [handleAuthError]
  );

  // Sign out
  const logout = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      await signOut(auth);
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err as AuthError);
      setError(errorMessage);
      return false;
    }
  }, [handleAuthError]);

  // Get Firebase ID token for API calls
  const getIdToken = useCallback(async (): Promise<string | null> => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (err) {
      console.error("Error getting ID token:", err);
      return null;
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    signIn,
    register,
    signInWithGoogle,
    resetPassword,
    logout,
    getIdToken,
    isAuthenticated: !!user,
  };
};
