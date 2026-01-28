import React from 'react';

/**
 * Button Component
 * Reusable button component with variants
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const baseClasses = "border-none rounded-full font-medium uppercase cursor-pointer transition-all duration-300 ease-in-out inline-block text-center no-underline";
  
  const variantClasses = {
    primary: "bg-primary border-2 border-primary text-dark hover:bg-primary-light hover:text-white hover:border-primary-light hover:shadow-lg hover:shadow-primary/40 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed",
    secondary: "bg-dark-card text-white border-2 border-dark-card hover:bg-[#3a3835] hover:border-[#3a3835] disabled:opacity-60 disabled:cursor-not-allowed",
    success: "bg-[#28a745] text-white border-2 border-[#28a745] hover:bg-[#218838] hover:border-[#218838] disabled:opacity-60 disabled:cursor-not-allowed",
    danger: "bg-[#dc3545] text-white border-2 border-[#dc3545] hover:bg-[#c82333] hover:border-[#c82333] disabled:opacity-60 disabled:cursor-not-allowed",
  };
  
  const sizeClasses = {
    small: "px-4 py-1.5 text-[11px]",
    medium: "px-6 py-2 text-[13px]",
    large: "px-8 py-3 text-base",
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
