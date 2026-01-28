/**
 * Utility functions for form validation
 */

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid email
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone number
 * @returns {boolean} True if valid phone
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @param {number} minLength - Minimum length (default: 6)
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password, minLength = 6) => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  if (password.length < minLength) {
    return {
      isValid: false,
      message: `Password must be at least ${minLength} characters`,
    };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate required field
 * @param {string} value - Field value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (!value || value.trim() === '') {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true, message: '' };
};

/**
 * Validate form data
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules
 * @returns {Object} Validation result with errors
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];
    
    // Required validation
    if (rule.required && !validateRequired(value, rule.label || field).isValid) {
      errors[field] = validateRequired(value, rule.label || field).message;
      return;
    }
    
    // Email validation
    if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Invalid email format';
      return;
    }
    
    // Phone validation
    if (rule.phone && value && !validatePhone(value)) {
      errors[field] = 'Invalid phone number';
      return;
    }
    
    // Password validation
    if (rule.password && value) {
      const passwordValidation = validatePassword(value, rule.minLength);
      if (!passwordValidation.isValid) {
        errors[field] = passwordValidation.message;
        return;
      }
    }
    
    // Custom validation
    if (rule.custom && value) {
      const customResult = rule.custom(value);
      if (!customResult.isValid) {
        errors[field] = customResult.message;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
