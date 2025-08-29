import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button';

interface OrderSuccessScreenProps {
  navigation: any;
  route: {
    params: {
      orderId: string;
      total: number;
    };
  };
}

const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({ navigation, route }) => {
  const { orderId, total } = route.params;

  const handleContinueShopping = () => {
    navigation.navigate('UserTabs', { screen: 'Home' });
  };

  const handleViewOrders = () => {
    navigation.navigate('UserTabs', { screen: 'Profile' });
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-green-100 rounded-full p-6 mb-6">
          <Ionicons name="checkmark-circle" size={80} color="#2ECC71" />
        </View>
        
        <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Order Placed Successfully!
        </Text>
        
        <Text className="text-gray-600 text-center mb-6">
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </Text>
        
        <View className="bg-white rounded-lg p-4 mb-8 w-full shadow-sm">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Order ID:</Text>
            <Text className="font-semibold text-gray-800">{orderId}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-gray-600">Total Amount:</Text>
            <Text className="font-bold text-green-600 text-lg">${total.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Status:</Text>
            <View className="bg-yellow-100 px-3 py-1 rounded-full">
              <Text className="text-yellow-700 font-medium">Processing</Text>
            </View>
          </View>
        </View>
        
        <View className="w-full" style={{ gap: 12 }}>
          <Button
            title="Continue Shopping"
            onPress={handleContinueShopping}
          />
          
          <Button
            title="View Orders"
            onPress={handleViewOrders}
            variant="outline"
          />
        </View>
        
        <Text className="text-gray-500 text-center mt-6">
          You will receive an email confirmation shortly with tracking details.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccessScreen;