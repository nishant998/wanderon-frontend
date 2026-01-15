import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { meApi } from "../api/auth";

type AuthState = {
  user: any | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
  refetchMe: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refetchMe = async () => {
    try {
      const data = await meApi();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchMe();
  }, []);

  const value = useMemo(
    () => ({ user, loading, setUser, refetchMe }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
