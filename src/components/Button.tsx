import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../utils/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const sizeStyles = {
      sm: { paddingHorizontal: 12, paddingVertical: 8 },
      md: { paddingHorizontal: 16, paddingVertical: 12 },
      lg: { paddingHorizontal: 20, paddingVertical: 16 },
    };

    const variantStyles = {
      primary: { backgroundColor: theme.colors.primary },
      secondary: { backgroundColor: theme.colors.secondary },
      outline: { 
        backgroundColor: 'transparent', 
        borderWidth: 1, 
        borderColor: theme.colors.primary 
      },
      ghost: { backgroundColor: 'transparent' },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled || loading ? 0.6 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
    };

    const sizeStyles = {
      sm: { fontSize: theme.fontSize.sm },
      md: { fontSize: theme.fontSize.md },
      lg: { fontSize: theme.fontSize.lg },
    };

    const variantStyles = {
      primary: { color: theme.colors.textLight },
      secondary: { color: theme.colors.textLight },
      outline: { color: theme.colors.primary },
      ghost: { color: theme.colors.primary },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary : theme.colors.textLight}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};