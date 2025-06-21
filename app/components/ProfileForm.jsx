"use client";

import { useState, useEffect } from 'react';
import Input from './ui/Input';
import ProfileImage from './ProfileImage';
import { validateProfileForm } from '../lib/validations/profile';

export default function ProfileForm({ user, onSave, isLoading = false }) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
  });
  
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(null);

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleImageChange = (file, error) => {
    setSelectedImage(file);
    setImageError(error);
  };

  const validateForm = () => {
    const validation = validateProfileForm(formData);
    setErrors(validation.errors);
    return validation.isValid && !imageError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const updateData = {
      fullname: formData.fullname,
      ...(selectedImage && { profileImage: selectedImage })
    };

    await onSave(updateData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image Section */}
      <ProfileImage
        currentImageUrl={user?.profile_image_url}
        onImageChange={handleImageChange}
        error={imageError}
      />

      {/* Personal Information Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            value={formData.fullname}
            onChange={(e) => handleInputChange('fullname', e.target.value)}
            error={errors.fullname}
            placeholder="Enter your full name"
            required
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="Enter your email address"
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />

          {/* Phone */}
          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            placeholder="Enter your phone number"
            disabled
            className="bg-gray-50 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Account Information Section (Read-only) */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary border-b border-gray-200 pb-2">
          Account Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-500">User ID</label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600 font-mono">
              {user?.id || 'N/A'}
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-500">Member Since</label>
            <div className="px-4 py-2 bg-gray-50 rounded-lg text-sm text-gray-600">
              {user?.registered_at ? new Date(user.registered_at).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Saving...</span>
            </div>
          ) : (
            'Save Profile'
          )}
        </button>
      </div>
    </form>
  );
} 