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

const STORAGE_KEY = "fourwaymedia-mock-auth";

/** Phase A mock — replace with session / profile API */
export const MOCK_USER_DISPLAY_NAME = "Jane Doe";
export const MOCK_USER_EMAIL = "jane@example.com";
/** Prefill avatar when you have a stored URL; `null` shows initials placeholder */
export const MOCK_USER_AVATAR_URL: string | null = null;

type MockAuthContextValue = {
  isAuthenticated: boolean;
  /** Stub until real auth — sets mock session + storage for UI testing */
  signIn: () => void;
  /** Stub — clears mock session */
  signOut: () => void;
};

const MockAuthContext = createContext<MockAuthContextValue | null>(null);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === "1") {
          setIsAuthenticated(true);
        }
      } catch {
        /* ignore */
      }
    });
  }, []);

  const signIn = useCallback(() => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const signOut = useCallback(() => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, signIn, signOut }),
    [isAuthenticated, signIn, signOut],
  );

  return (
    <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>
  );
}

export function useMockAuth(): MockAuthContextValue {
  const ctx = useContext(MockAuthContext);
  if (!ctx) {
    throw new Error("useMockAuth must be used within MockAuthProvider");
  }
  return ctx;
}
