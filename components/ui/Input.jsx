import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

/**
 * @typedef {Object} InputProps
 * @property {string} placeholder - Placeholder text for the input
 * @property {string} value - Current value of the input
 * @property {Function} onChangeText - Function to call when text changes
 * @property {boolean} [secureTextEntry=false] - Whether to hide the input text
 * @property {'default' | 'email-address' | 'numeric' | 'phone-pad' | 'url'} [keyboardType='default'] - Keyboard type
 * @property {'none' | 'sentences' | 'words' | 'characters'} [autoCapitalize='none'] - Auto capitalize behavior
 * @property {string} [error] - Error message to display
 * @property {string} [label] - Label text to display above input
 * @property {boolean} [multiline=false] - Whether input can have multiple lines
 * @property {number} [numberOfLines=1] - Number of lines to show for multiline input
 * @property {string} [className] - Additional class names
 * @property {React.ReactNode} [icon] - Icon to display inside input
 */

const StyledView = styled(View);
const StyledTextInput = styled(TextInput);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

/**
 * Input component with various styling options
 * @param {InputProps} props - Component props
 */
export const Input = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  error,
  label,
  multiline = false,
  numberOfLines = 1,
  className = '',
  icon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <StyledView className={`mb-4 ${className}`}>
      {label && (
        <StyledText className="text-neutral-700 font-bold mb-2 text-base">
          {label}
        </StyledText>
      )}
      
      <StyledView 
        className={`
          flex-row items-center
          border rounded-lg px-4 py-3
          ${isFocused ? 'border-primary' : 'border-neutral-300'}
          ${error ? 'border-error' : ''}
          ${multiline ? 'min-h-[100px]' : ''}
          bg-white
        `}
      >
        {icon && <StyledView className="mr-2">{icon}</StyledView>}
        
        <StyledTextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          className="flex-1 font-sans text-base text-neutral-800"
          placeholderTextColor="#9CA3AF"
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        
        {secureTextEntry && (
          <StyledTouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons 
              name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
              size={20} 
              color="#6B7280" 
            />
          </StyledTouchableOpacity>
        )}
      </StyledView>
      
      {error && (
        <StyledText className="text-error text-sm mt-1">
          {error}
        </StyledText>
      )}
    </StyledView>
  );
};

export default Input;