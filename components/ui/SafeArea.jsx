import React from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { styled } from 'nativewind';

/**
 * @typedef {Object} SafeAreaProps
 * @property {React.ReactNode} children - Child components
 * @property {string} [className] - Additional class names
 * @property {string} [backgroundColor='white'] - Background color
 */

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);

/**
 * SafeArea component that handles device notches and status bars
 * @param {SafeAreaProps} props - Component props
 */
export const SafeArea = ({
  children,
  className = '',
  backgroundColor = 'white',
}) => {
  // Determine if we need extra padding for status bar (Android)
  const needsStatusBarPadding = Platform.OS === 'android';
  
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
        translucent={true}
      />
      <StyledSafeAreaView
        className={`flex-1 ${className}`}
        style={{ backgroundColor }}
      >
        {needsStatusBarPadding && (
          <StyledView style={{ height: StatusBar.currentHeight }} />
        )}
        {children}
      </StyledSafeAreaView>
    </>
  );
};

export default SafeArea;