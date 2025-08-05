"use client";

import { auth } from "@/lib/auth";
import { AuthState } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType extends AuthState {
  login: (email: string, role: "admin" | "shareholder") => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      console.log("AuthProvider: Chargement de l'utilisateur...");
      const user = await auth.getCurrentUser();

      setState({
        user,
        isAuthenticated: !!user,
        isLoading: false,
      });
    };

    fetchUser();
  }, []);

  const login = async (
    email: string,
    role: "admin" | "shareholder"
  ): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      const user = await auth.login(email, role);
      if (user) {
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        return false;
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      return false;
    }
  };

  const logout = () => {
    auth.logout();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
