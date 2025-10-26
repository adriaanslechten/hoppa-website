import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../../contexts/AuthContext";
import styles from "./Login.module.css";

export const LoginScreen: React.FC = () => {
  const router = useRouter();
  const { signIn, register, signInWithGoogle, error, isAuthenticated } = useAuthContext();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/forum");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setLoading(true);

    // Validation
    if (!email || !password) {
      setLocalError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setLocalError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      let success = false;
      if (isSignUp) {
        success = await register(email, password);
      } else {
        success = await signIn(email, password);
      }

      if (success) {
        router.push("/forum");
      }
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    setLoading(true);
    try {
      const success = await signInWithGoogle();
      if (success) {
        router.push("/forum");
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  const displayError = localError || error;

  return (
    <div className={styles.Container}>
      <div className={styles.LoginBox}>
        <h1 className={styles.Title}>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p className={styles.Subtitle}>
          {isSignUp ? "Sign up to join the Hoppa community" : "Sign in to continue to Hoppa"}
        </p>

        {displayError && <div className={styles.Error}>{displayError}</div>}

        <form onSubmit={handleSubmit} className={styles.Form}>
          <div className={styles.InputGroup}>
            <label htmlFor="email" className={styles.Label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.Input}
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className={styles.InputGroup}>
            <label htmlFor="password" className={styles.Label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.Input}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {isSignUp && (
            <div className={styles.InputGroup}>
              <label htmlFor="confirmPassword" className={styles.Label}>
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.Input}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
          )}

          <button type="submit" className={styles.SubmitButton} disabled={loading}>
            {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <div className={styles.Divider}>
          <span>or</span>
        </div>

        <button onClick={handleGoogleSignIn} className={styles.GoogleButton} disabled={loading}>
          <svg className={styles.GoogleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <div className={styles.Toggle}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setLocalError(null);
            }}
            className={styles.ToggleButton}
            disabled={loading}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
