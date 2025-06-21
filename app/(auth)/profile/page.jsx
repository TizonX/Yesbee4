"use client";

import { useState } from "react";
import { useAuthGuard } from "@/utils/hooks/useAuthGuard";
import { useAuth } from "@/app/context/AuthContext";
import Container from "@/app/components/Container";
import ProfileForm from "@/app/components/ProfileForm";
import ProfileSkeleton from "@/utils/components/ProfileSkeleton";
import { apiRequest } from "@/app/lib/api";

export default function ProfilePage() {
  const { user, isLoading: isLoadingGuard } = useAuthGuard();
  const { user: authUser, refreshUser, isLoading: isLoadingAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // Show skeleton while auth is loading or user is not available
  if (isLoadingGuard || isLoadingAuth || !authUser) {
    return (
      <div className="min-h-screen bg-background-dark pt-20">
        <Container>
          <div className="max-w-4xl mx-auto py-8">
            {/* Page Header Skeleton */}
            <div className="mb-8">
              <div className="w-64 h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="w-96 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Profile Form Card Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <ProfileSkeleton />
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const handleSaveProfile = async (updateData) => {
    setIsLoading(true);
    
    try {
      // Create FormData if there's an image to upload
      let requestData;
      let headers = {};
      
      if (updateData.profileImage) {
        const formData = new FormData();
        formData.append("fullname", updateData.fullname);
        formData.append("profile_image", updateData.profileImage);

        requestData = formData;
        // Don't set Content-Type header for FormData, let the browser set it with boundary
      } else {
        requestData = { fullname: updateData.fullname };
        headers = { "Content-Type": "application/json" };
      }

      await apiRequest({
        method: "PUT",
        url: "/users/profile",
        data: requestData,
        headers,
        showSuccessToast: true,
        successMessage: "Profile updated successfully!",
      });

      // Refresh user data
      await refreshUser();
    } catch (error) {
      console.error("Error updating profile:", error);
      // Error is already handled by apiRequest with toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark pt-20">
      <Container>
        <div className="max-w-4xl mx-auto py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Profile Settings
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          {/* Profile Form Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <ProfileForm
              user={authUser}
              onSave={handleSaveProfile}
              isLoading={isLoading}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
