"use client";
import { useAuthGuard } from "@/utils/hooks/useAuthGuard";

export default function ProfilePage() {
  const user = useAuthGuard();
  console.log("profile user: ", user);
  if (!user) return null;

  
  return (
    <div>
      This is a protected profile page. If you can see this, you are logged in.
    </div>
  );
}
