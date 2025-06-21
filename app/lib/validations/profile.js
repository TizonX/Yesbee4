// Profile validation utilities

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\d{10}$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) return "Phone number must be 10 digits";
  return null;
};

export const validateFullName = (fullname) => {
  if (!fullname) return "Full name is required";
  if (fullname.trim().length < 2) return "Full name must be at least 2 characters";
  if (fullname.trim().length > 50) return "Full name must be less than 50 characters";
  return null;
};

export const validateProfileImage = (file) => {
  if (!file) return null; // Optional field
  
  const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    return "Please select a valid image file (PNG, JPG, JPEG, or WebP)";
  }
  
  if (file.size > maxSize) {
    return "Image size must be less than 5MB";
  }
  
  return null;
};

export const validateProfileForm = (data) => {
  const errors = {};
  
  errors.fullname = validateFullName(data.fullname);
  errors.email = validateEmail(data.email);
  errors.phone = validatePhone(data.phone);
  
  // Remove null values
  Object.keys(errors).forEach(key => {
    if (errors[key] === null) {
      delete errors[key];
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 