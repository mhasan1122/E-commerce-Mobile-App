import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../utils/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  secureTextEntry,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[{ marginBottom: theme.spacing.md }, containerStyle]}>
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-base">
          {label}
        </Text>
      )}
      <View className={`flex-row items-center bg-white border rounded-lg px-4 py-3 ${
        error ? 'border-red-500' : 'border-gray-200'
      }`}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={theme.colors.gray[500]} 
            style={{ marginRight: theme.spacing.sm }}
          />
        )}
        <TextInput
          className="flex-1 text-gray-800 text-base"
          placeholderTextColor={theme.colors.gray[400]}
          secureTextEntry={isSecure}
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={toggleSecureEntry}>
            <Ionicons 
              name={isSecure ? 'eye-off' : 'eye'} 
              size={20} 
              color={theme.colors.gray[500]} 
            />
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <TouchableOpacity onPress={onRightIconPress}>
            <Ionicons 
              name={rightIcon} 
              size={20} 
              color={theme.colors.gray[500]} 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};