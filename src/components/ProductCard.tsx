import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Product, ViewMode } from '../types';
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { theme } from '../utils/theme';

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 2 columns with padding

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode, onPress }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleWishlistToggle = (e: any) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  if (viewMode === 'list') {
    return (
      <TouchableOpacity 
        onPress={onPress}
        className="bg-white rounded-lg mb-3 p-4 flex-row shadow-sm border border-gray-100"
        activeOpacity={0.8}
      >
        <Image 
          source={{ uri: product.image }} 
          className="w-20 h-20 rounded-lg"
          resizeMode="cover"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <Text className="text-gray-800 font-semibold text-base flex-1" numberOfLines={2}>
              {product.name}
            </Text>
            <TouchableOpacity onPress={handleWishlistToggle} className="ml-2">
              <Ionicons 
                name={isInWishlist ? 'heart' : 'heart-outline'} 
                size={20} 
                color={isInWishlist ? theme.colors.error : theme.colors.gray[400]} 
              />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
            {product.description}
          </Text>
          <View className="flex-row items-center mt-2">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="text-gray-600 text-sm ml-1">
              {product.rating} ({product.reviewCount})
            </Text>
          </View>
          <View className="flex-row justify-between items-center mt-2">
            <View className="flex-row items-center">
              <Text className="text-green-600 font-bold text-lg">
                ${product.price}
              </Text>
              {product.originalPrice && (
                <Text className="text-gray-400 text-sm line-through ml-2">
                  ${product.originalPrice}
                </Text>
              )}
            </View>
            <TouchableOpacity 
              onPress={handleAddToCart}
              className="bg-green-500 rounded-full p-2"
            >
              <Ionicons name="add" size={16} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white rounded-lg mb-4 shadow-sm border border-gray-100"
      style={{ width: cardWidth }}
      activeOpacity={0.8}
    >
      <View className="relative">
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-40 rounded-t-lg"
          resizeMode="cover"
        />
        <TouchableOpacity 
          onPress={handleWishlistToggle}
          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm"
        >
          <Ionicons 
            name={isInWishlist ? 'heart' : 'heart-outline'} 
            size={16} 
            color={isInWishlist ? theme.colors.error : theme.colors.gray[400]} 
          />
        </TouchableOpacity>
        {product.originalPrice && (
          <View className="absolute top-2 left-2 bg-red-500 rounded px-2 py-1">
            <Text className="text-white text-xs font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>
      
      <View className="p-3">
        <Text className="text-gray-800 font-semibold text-sm" numberOfLines={2}>
          {product.name}
        </Text>
        <View className="flex-row items-center mt-1">
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text className="text-gray-600 text-xs ml-1">
            {product.rating} ({product.reviewCount})
          </Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <View>
            <Text className="text-green-600 font-bold text-base">
              ${product.price}
            </Text>
            {product.originalPrice && (
              <Text className="text-gray-400 text-xs line-through">
                ${product.originalPrice}
              </Text>
            )}
          </View>
          <TouchableOpacity 
            onPress={handleAddToCart}
            className="bg-green-500 rounded-full p-2"
          >
            <Ionicons name="add" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};