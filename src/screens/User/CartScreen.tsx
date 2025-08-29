import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { removeFromCart, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';

interface CartScreenProps {
  navigation: any;
}

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => dispatch(removeFromCart(id)) },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: () => dispatch(clearCart()) },
      ]
    );
  };

  const handleCheckout = () => {
    navigation.navigate('Checkout');
  };

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-green-50">
        <Header title="Shopping Cart" />
        <View className="flex-1 justify-center items-center px-6">
          <Ionicons name="bag-outline" size={80} color="#CED4DA" />
          <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mb-8">
            Add some products to your cart to see them here
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
      <Header
        title="Shopping Cart"
        rightComponent={
          <TouchableOpacity onPress={handleClearCart}>
            <Text className="text-white font-medium">Clear</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView className="flex-1 px-4 py-4">
        {items.map((item) => (
          <View key={item.id} className="bg-white rounded-lg mb-3 p-4 shadow-sm">
            <View className="flex-row">
              <Image
                source={{ uri: item.image }}
                className="w-20 h-20 rounded-lg"
                resizeMode="cover"
              />
              
              <View className="flex-1 ml-4">
                <View className="flex-row justify-between items-start">
                  <Text className="text-gray-800 font-semibold text-base flex-1" numberOfLines={2}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveItem(item.id)}
                    className="ml-2"
                  >
                    <Ionicons name="trash-outline" size={20} color="#E74C3C" />
                  </TouchableOpacity>
                </View>
                
                <Text className="text-gray-500 text-sm mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
                
                <View className="flex-row justify-between items-center mt-3">
                  <View>
                    <Text className="text-green-600 font-bold text-lg">
                      ${item.price}
                    </Text>
                    {item.originalPrice && (
                      <Text className="text-gray-400 text-sm line-through">
                        ${item.originalPrice}
                      </Text>
                    )}
                  </View>
                  
                  <View className="flex-row items-center border border-gray-300 rounded-lg">
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, item.cartQuantity - 1)}
                      className="p-2"
                    >
                      <Ionicons name="remove" size={16} color="#2ECC71" />
                    </TouchableOpacity>
                    <Text className="px-3 py-2 font-medium">{item.cartQuantity}</Text>
                    <TouchableOpacity
                      onPress={() => handleQuantityChange(item.id, item.cartQuantity + 1)}
                      className="p-2"
                    >
                      <Ionicons name="add" size={16} color="#2ECC71" />
                    </TouchableOpacity>
                  </View>
                </View>
                
                <View className="flex-row justify-between items-center mt-2">
                  <Text className="text-gray-600">Subtotal:</Text>
                  <Text className="text-gray-800 font-semibold">
                    ${(item.price * item.cartQuantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Cart Summary */}
      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600">Subtotal:</Text>
          <Text className="text-lg font-semibold">${total.toFixed(2)}</Text>
        </View>
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600">Shipping:</Text>
          <Text className="text-lg font-semibold">Free</Text>
        </View>
        <View className="border-t border-gray-200 pt-2 mb-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold">Total:</Text>
            <Text className="text-xl font-bold text-green-600">${total.toFixed(2)}</Text>
          </View>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
        />
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;