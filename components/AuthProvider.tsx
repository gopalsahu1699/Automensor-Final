'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { account } from "@/lib/appwrite";
import { Models, ID, OAuthProvider } from "appwrite";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Email/password login
  const login = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };

  // Email/password signup and auto-login
  const signup = async (email: string, password: string, name: string) => {
    try {
      await account.create(ID.unique(), email, password, name);
      await login(email, password);
      toast.success("Signup successful");
    } catch (error) {
      toast.error("Signup failed");
      throw error;
    }
  };

  // Google OAuth login
  const loginWithGoogle = async () => {
    try {
      await account.createOAuth2Session(
        OAuthProvider.Google,
        `${window.location.origin}/`,
        `${window.location.origin}/auth-error`
      );
      // No need to set user here: OAuth redirect reloads the app and triggers effect
    } catch (error) {
      toast.error("Google login failed");
      throw error;
    }
  };

  // Logout current session
  const logout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      toast.success("You are logged out");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
