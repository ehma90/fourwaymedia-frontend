"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { apiGet, apiPost, ApiError, type AuthUser } from "@/lib/api";

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
    acceptedTerms: boolean,
  ) => Promise<void>;
  signOut: () => Promise<void>;
  /** Re-fetch session from the server. Returns false on transient errors without clearing the user. */
  refreshSession: () => Promise<boolean>;
  /** Apply a user payload from a successful profile mutation without a full session refetch. */
  applyUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    try {
      const data = await apiGet<{ user: AuthUser }>("/api/me");
      setUser(data.user);
      return true;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
      }
      return false;
    }
  }, []);

  const applyUser = useCallback((next: AuthUser) => {
    setUser(next);
  }, []);

  useEffect(() => {
    void (async () => {
      setIsLoading(true);
      await refreshSession();
      setIsLoading(false);
    })();
  }, [refreshSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    const data = await apiPost<{ user: AuthUser }>("/api/auth/login", {
      email,
      password,
    });
    setUser(data.user);
  }, []);

  const signUp = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      acceptedTerms: boolean,
    ) => {
      const data = await apiPost<{ user: AuthUser }>("/api/auth/register", {
        email,
        password,
        displayName,
        acceptedTerms,
      });
      setUser(data.user);
    },
    [],
  );

  const signOut = useCallback(async () => {
    try {
      await apiPost("/api/auth/logout");
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshSession,
      applyUser,
    }),
    [user, isLoading, signIn, signUp, signOut, refreshSession, applyUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
