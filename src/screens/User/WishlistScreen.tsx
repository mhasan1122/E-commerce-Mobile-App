import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { Button } from '../../components/Button';
import { RootState } from '../../store/store';

interface WishlistScreenProps {
  navigation: any;
}

const WishlistScreen: React.FC<WishlistScreenProps> = ({ navigation }) => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (wishlistItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-green-50">
        <Header title="Wishlist" />
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="heart-outline" size={80} color="#CED4DA" />
          <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">Your wishlist is empty</Text>
          <Text className="text-gray-500 text-center mb-8">
            Save your favorite products to see them here
          </Text>
          <Button
            title="Continue Shopping"
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title={`Wishlist (${wishlistItems.length})`} />
      
      <ScrollView className="flex-1 px-4 py-4">
        <View className="flex-row flex-wrap justify-between">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              viewMode="grid"
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishlistScreen;