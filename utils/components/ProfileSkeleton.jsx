"use client";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Profile Image Section Skeleton */}
      <div className="space-y-4">
        <div className="w-24 h-4 bg-gray-200 rounded"></div>
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="flex space-x-3">
              <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="w-48 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Personal Information Section Skeleton */}
      <div className="space-y-6">
        <div className="w-48 h-6 bg-gray-200 rounded border-b border-gray-200 pb-2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name Skeleton */}
          <div className="space-y-1">
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Email Skeleton */}
          <div className="space-y-1">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Phone Skeleton */}
          <div className="space-y-1">
            <div className="w-28 h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Account Information Section Skeleton */}
      <div className="space-y-6">
        <div className="w-40 h-6 bg-gray-200 rounded border-b border-gray-200 pb-2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User ID Skeleton */}
          <div className="space-y-1">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Member Since Skeleton */}
          <div className="space-y-1">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-12 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Save Button Skeleton */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
} 