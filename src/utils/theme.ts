export const theme = {
  colors: {
    primary: '#2ECC71',      // Emerald Green
    secondary: '#27AE60',    // Leafy Green
    accent: '#1ABC9C',       // Aqua Green
    background: '#F4F9F4',   // Mist White
    surface: '#FFFFFF',      // White
    text: '#2C3E50',         // Charcoal
    textLight: '#FFFFFF',    // White
    error: '#E74C3C',        // Coral Red
    warning: '#F39C12',      // Orange
    success: '#2ECC71',      // Same as primary
    gray: {
      100: '#F8F9FA',
      200: '#E9ECEF',
      300: '#DEE2E6',
      400: '#CED4DA',
      500: '#ADB5BD',
      600: '#6C757D',
      700: '#495057',
      800: '#343A40',
      900: '#212529',
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  }
};

export type Theme = typeof theme;