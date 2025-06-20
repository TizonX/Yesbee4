"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { apiRequest } from "../lib/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
const AuthContext = createContext({ isLoggedIn: false });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Only call checkAuth if session_token is present in cookies and not already checked
    const token = Cookies.get("session_token");
    if (token && !hasCheckedAuth.current) {
      hasCheckedAuth.current = true;
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiRequest({ url: "/users/me" });
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
      url: "/users/login",
      data: { email, password },
      showSuccessToast: true,
      successMessage: "Welcome back!",
    });
    if (data.data.access_token) {
      localStorage.setItem("session_token", data?.data?.access_token);
      // Also store in cookies
      Cookies.set("session_token", data?.data?.access_token, { expires: 7 }); // Expires in 7 days
      await checkAuth(); // Call checkAuth after cookie is set
      window.location.href = "/";
    }
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
      value={{ user, isLoading, login, signup, logout, isLoggedIn: !!user }}
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
