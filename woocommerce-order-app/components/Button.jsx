import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

export default function Button({ 
  onPress, 
  title, 
  variant = 'primary', 
  size = 'md',
  loading = false,
  disabled = false,
  className = ''
}) {
  const baseClasses = 'rounded-lg justify-center items-center';
  
  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    success: 'bg-success',
    danger: 'bg-danger',
    outline: 'bg-white border-2 border-primary',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-7 py-4',
  };
  
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    success: 'text-white',
    danger: 'text-white',
    outline: 'text-primary',
  };
  
  const disabledClass = (disabled || loading) ? 'opacity-50' : '';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#7c3aed' : 'white'} />
      ) : (
        <Text className={`font-semibold ${textSizeClasses[size]} ${textColorClasses[variant]}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
