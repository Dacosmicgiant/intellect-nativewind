import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { styled } from 'nativewind';

/**
 * @typedef {Object} ButtonProps
 * @property {string} text - The text to display on the button
 * @property {function} onPress - Function to call when button is pressed
 * @property {'primary' | 'secondary' | 'outline'} [type='primary'] - Button style variant
 * @property {boolean} [loading=false] - Whether to show loading indicator
 * @property {boolean} [disabled=false] - Whether button is disabled
 * @property {React.ReactNode} [icon] - Optional icon to display
 * @property {boolean} [fullWidth=true] - Whether button should take full width
 * @property {string} [className=''] - Additional className to apply
 * @property {string} [textVariant] - Optional override for text style
 */

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledView = styled(View);

/**
 * Button component with various style options
 * @param {ButtonProps} props - Component props
 */
export const Button = ({
  text,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
  icon,
  fullWidth = true,
  className = '',
  textVariant,
}) => {
  // Define button variants
  const buttonVariants = {
    primary: 'bg-primary',
    secondary: 'bg-neutral-200',
    outline: 'bg-white border border-primary',
  };

  // Define text variants
  const textVariants = {
    primary: 'text-white',
    secondary: 'text-neutral-700',
    outline: 'text-primary',
  };

  // Combine classes based on props
  const buttonClasses = `
    py-4 rounded-xl
    ${buttonVariants[type]}
    ${disabled || loading ? 'opacity-60' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  const textClasses = `
    text-center font-bold text-base
    ${textVariant || textVariants[type]}
  `;

  return (
    <StyledTouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'primary' ? 'white' : type === 'outline' ? '#0075FF' : '#374151'} 
        />
      ) : (
        <StyledView className="flex-row items-center justify-center">
          {icon && <View className="mr-2">{icon}</View>}
          <StyledText className={textClasses}>{text}</StyledText>
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
};

export default Button;