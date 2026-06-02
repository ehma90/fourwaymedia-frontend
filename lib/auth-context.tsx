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

import { apiGet, apiPost, type AuthUser } from "@/lib/api";

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
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const data = await apiGet<{ user: AuthUser }>("/api/me");
      setUser(data.user);
    } catch {
      setUser(null);
    }
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
    }),
    [user, isLoading, signIn, signUp, signOut, refreshSession],
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
