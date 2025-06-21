"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { apiRequest } from "../lib/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const AuthContext = createContext({ isLoggedIn: false });

export function AuthProvider({ children }, isLoggedIn) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasCheckedAuth = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const data = await apiRequest({ url: "/users/me" });
      setUser(data.data);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      const data = await apiRequest({ url: "/users/me" });
      setUser(data.data);
      return data.data;
    } catch (error) {
      setUser(null);
      throw error;
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
    // await checkAuth(); // Call checkAuth after backend sets cookie
    // setUser(data.user);
    // router.push("/"); // Redirect to home page
    window.location.href = "/";
  };

  const signup = async (name, email, phone, password) => {
    const data = await apiRequest({
      method: "POST",
      url: "/users/register",
      data: { name, email, phone, password },
      showSuccessToast: true,
      successMessage: "Account created successfully!",
    });
    // setUser(data.user);
  };

  const logout = async () => {
    await apiRequest({
      method: "POST",
      url: "/auth/logout",
      showSuccessToast: true,
      successMessage: "Logged out successfully",
    });
    setUser(null);
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        refreshUser,
        isLoggedIn: !!user,
      }}
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
