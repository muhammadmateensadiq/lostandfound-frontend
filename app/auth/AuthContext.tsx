"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

type User = {
  email: string;
  full_name: string;
  avatar?: string;
  phone?: string;
  gender?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
};

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = async () => {
    try {
      const res = await api.get("/accounts/auth/me/");
      setUser(res.data);
      return res.data;
    } catch (err: any) {
      setUser(null);

      if (err.response?.status === 401) {
        return null;
      }

      throw err;
    }

  };

  useEffect(() => {
    const init = async () => {
      try {
        await fetchMe();
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const handleLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth:logout", handleLogout);

    return () => {
      window.removeEventListener("auth:logout", handleLogout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, fetchMe, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);