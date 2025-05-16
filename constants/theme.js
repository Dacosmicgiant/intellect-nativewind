// Color palette for the entire application
export const colors = {
  // Primary colors
  primary: {
    DEFAULT: '#0075FF', // Main primary color from original app
    50: '#E6F0FF',
    100: '#CCE0FF',
    200: '#99C1FF',
    300: '#66A3FF',
    400: '#3384FF',
    500: '#0075FF', // Same as DEFAULT
    600: '#005ECC',
    700: '#004799',
    800: '#002F66',
    900: '#001833',
  },
  // Neutral colors
  neutral: {
    DEFAULT: '#6B7280',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  // Success, error, warning colors
  success: {
    DEFAULT: '#34C759',
    lighter: '#E6F7ED',
    light: '#C8E6C9',
    dark: '#2E7D32',
  },
  error: {
    DEFAULT: '#FF3B30',
    lighter: '#FFEBEB',
    light: '#FFCDD2',
    dark: '#C62828',
  },
  warning: {
    DEFAULT: '#FF9500',
    lighter: '#FFF8E1',
    light: '#FFE082',
    dark: '#F57C00',
  },
  info: {
    DEFAULT: '#0066FF',
    lighter: '#E3F2FD',
    light: '#90CAF9',
    dark: '#1565C0',
  },
  // Basic colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Typography scale
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
};

// Spacing scale for consistent margins and padding
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
};

// Border radius values
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

// Font family configurations
export const fontFamily = {
  regular: 'winky',
  bold: 'winky-bold',
};

// Shadows for different elevations
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
};

// Export a combined theme object
export const theme = {
  colors,
  fontSizes,
  spacing,
  borderRadius,
  fontFamily,
  shadows,
};

export default theme;