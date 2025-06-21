"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export const useAuthGuard = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      if (!isLoading) {
        router.push("/");
      }
    }
  }, [user, router, isLoading]);

  return { user, isLoading };
};
