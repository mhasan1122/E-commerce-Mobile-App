import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store/store';
import { Product } from '../../types';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  navigation: any;
  route: {
    params: {
      product: Product;
    };
  };
}

const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({ navigation, route }) => {
  const { product } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const cartItem = cartItems.find(item => item.id === product.id);

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header
        title="Product Details"
        showBack
        showCart
        onBackPress={() => navigation.goBack()}
        onCartPress={() => navigation.navigate('UserTabs', { screen: 'Cart' })}
      />

      <ScrollView className="flex-1">
        {/* Product Images */}
        <View className="bg-gray-100">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(index);
            }}
          >
            {images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width, height: width }}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          
          {/* Image Indicators */}
          {images.length > 1 && (
            <View className="flex-row justify-center py-3">
              {images.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === selectedImageIndex ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </View>
          )}

          {/* Wishlist Button */}
          <TouchableOpacity
            onPress={handleWishlistToggle}
            className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-sm"
          >
            <Ionicons
              name={isInWishlist ? 'heart' : 'heart-outline'}
              size={24}
              color={isInWishlist ? '#E74C3C' : '#6C757D'}
            />
          </TouchableOpacity>

          {/* Discount Badge */}
          {product.originalPrice && (
            <View className="absolute top-4 left-4 bg-red-500 rounded px-3 py-1">
              <Text className="text-white font-bold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View className="p-4">
          <Text className="text-2xl font-bold text-gray-800 mb-2">{product.name}</Text>
          
          {/* Rating */}
          <View className="flex-row items-center mb-3">
            <View className="flex-row items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color={star <= Math.floor(product.rating) ? '#FFD700' : '#E5E5E5'}
                />
              ))}
            </View>
            <Text className="text-gray-600 ml-2">
              {product.rating} ({product.reviewCount} reviews)
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center mb-4">
            <Text className="text-3xl font-bold text-green-600">${product.price}</Text>
            {product.originalPrice && (
              <Text className="text-lg text-gray-400 line-through ml-3">
                ${product.originalPrice}
              </Text>
            )}
          </View>

          {/* Stock Status */}
          <View className="flex-row items-center mb-4">
            <Ionicons
              name={product.inStock ? 'checkmark-circle' : 'close-circle'}
              size={20}
              color={product.inStock ? '#2ECC71' : '#E74C3C'}
            />
            <Text className={`ml-2 font-medium ${
              product.inStock ? 'text-green-600' : 'text-red-500'
            }`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
            {cartItem && (
              <Text className="ml-4 text-gray-600">
                {cartItem.cartQuantity} in cart
              </Text>
            )}
          </View>

          {/* Quantity Selector */}
          {product.inStock && (
            <View className="flex-row items-center mb-6">
              <Text className="text-lg font-medium text-gray-800 mr-4">Quantity:</Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg">
                <TouchableOpacity
                  onPress={() => handleQuantityChange(-1)}
                  className="p-3"
                  disabled={quantity <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={quantity <= 1 ? '#CED4DA' : '#2ECC71'}
                  />
                </TouchableOpacity>
                <Text className="px-4 py-3 text-lg font-medium">{quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(1)}
                  className="p-3"
                  disabled={quantity >= 10}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={quantity >= 10 ? '#CED4DA' : '#2ECC71'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Description</Text>
            <Text className="text-gray-600 leading-6">{product.description}</Text>
          </View>

          {/* Category */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">Category</Text>
            <View className="bg-green-100 self-start px-3 py-1 rounded-full">
              <Text className="text-green-700 font-medium">{product.category}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      {product.inStock && (
        <View className="p-4 bg-white border-t border-gray-200">
          <Button
            title={`Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}`}
            onPress={handleAddToCart}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProductDetailScreen;