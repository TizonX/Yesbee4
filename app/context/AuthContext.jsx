"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "../lib/api";
import toast from "react-hot-toast";
const AuthContext = createContext({ isLoggedIn: false });

export function AuthProvider({ children, isLoggedIn }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiRequest({ url: "/auth/me" });
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await apiRequest({
      method: "POST",
      url: "/auth/login",
      data: { email, password },
      showSuccessToast: true,
      successMessage: "Welcome back!",
    });
    setUser(data.user);
  };

  const signup = async (name, email, phone, password) => {
    const data = await apiRequest({
      method: "POST",
      url: "/users/register",
      data: { name, email, phone, password },
      showSuccessToast: true,
      successMessage: "Account created successfully!",
    });
    setUser(data.user);
  };

  const logout = async () => {
    await apiRequest({
      method: "POST",
      url: "/auth/logout",
      showSuccessToast: true,
      successMessage: "Logged out successfully",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, signup, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
