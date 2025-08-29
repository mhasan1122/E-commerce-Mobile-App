import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { theme } from '../utils/theme';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  onBackPress?: () => void;
  onCartPress?: () => void;
  onSearchPress?: () => void;
  rightComponent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCart = false,
  showSearch = false,
  onBackPress,
  onCartPress,
  onSearchPress,
  rightComponent,
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);

  return (
    <SafeAreaView className="bg-green-500">
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center flex-1">
          {showBack && (
            <TouchableOpacity onPress={onBackPress} className="mr-3">
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          )}
          <Text className="text-white text-lg font-semibold flex-1" numberOfLines={1}>
            {title}
          </Text>
        </View>
        
        <View className="flex-row items-center">
          {showSearch && (
            <TouchableOpacity onPress={onSearchPress} className="mr-3">
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
          )}
          
          {showCart && (
            <TouchableOpacity onPress={onCartPress} className="relative">
              <Ionicons name="bag-outline" size={24} color="white" />
              {cartItemCount > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          
          {rightComponent}
        </View>
      </View>
    </SafeAreaView>
  );
};