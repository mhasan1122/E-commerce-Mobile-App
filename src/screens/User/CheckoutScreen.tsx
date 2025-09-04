import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { clearCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store/store';

interface CheckoutScreenProps {
  navigation: any;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);

  const shippingCost = 0; // Free shipping
  const tax = total * 0.08; // 8% tax
  const finalTotal = total + shippingCost + tax;

  const handlePlaceOrder = async () => {
    // Validate address
    if (!address.name || !address.street || !address.city || !address.state || !address.zipCode) {
      Alert.alert('Error', 'Please fill in all address fields');
      return;
    }

    // Validate payment
    if (selectedPayment === 'card') {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv || !cardDetails.name) {
        Alert.alert('Error', 'Please fill in all card details');
        return;
      }
    }
    
    // Cash on Delivery doesn't need additional validation
    if (selectedPayment !== 'card' && selectedPayment !== 'cash_on_delivery') {
      Alert.alert('Error', 'This payment method is not available at the moment');
      return;
    }

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      dispatch(clearCart());
      setLoading(false);
      navigation.navigate('OrderSuccess', {
        orderId: `ORD-${Date.now()}`,
        total: finalTotal,
        paymentMethod: selectedPayment,
      });
    }, 2000);
  };

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: 'cash-outline' },
    { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
    { id: 'apple', name: 'Apple Pay', icon: 'logo-apple' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header
        title="Checkout"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView className="flex-1 px-4 py-4">
        {/* Order Summary */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Order Summary</Text>
          {items.map((item) => (
            <View key={item.id} className="flex-row justify-between items-center py-2">
              <Text className="flex-1 text-gray-600" numberOfLines={1}>
                {item.name} x {item.cartQuantity}
              </Text>
              <Text className="text-gray-800 font-medium">
                ${(item.price * item.cartQuantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View className="border-t border-gray-200 pt-3 mt-3">
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600">Subtotal:</Text>
              <Text className="text-gray-800">${total.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600">Shipping:</Text>
              <Text className="text-gray-800">Free</Text>
            </View>
            <View className="flex-row justify-between items-center py-1">
              <Text className="text-gray-600">Tax:</Text>
              <Text className="text-gray-800">${tax.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center pt-2 border-t border-gray-200">
              <Text className="text-lg font-bold">Total:</Text>
              <Text className="text-lg font-bold text-green-600">${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Shipping Address */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Shipping Address</Text>
          
          <Input
            label="Full Name"
            placeholder="Enter full name"
            value={address.name}
            onChangeText={(text) => setAddress({ ...address, name: text })}
          />
          
          <Input
            label="Street Address"
            placeholder="Enter street address"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />
          
          <View className="flex-row" style={{ gap: 8 }}>
            <View className="flex-1">
              <Input
                label="City"
                placeholder="City"
                value={address.city}
                onChangeText={(text) => setAddress({ ...address, city: text })}
              />
            </View>
            <View className="flex-1">
              <Input
                label="State"
                placeholder="State"
                value={address.state}
                onChangeText={(text) => setAddress({ ...address, state: text })}
              />
            </View>
          </View>
          
          <Input
            label="ZIP Code"
            placeholder="Enter ZIP code"
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
            keyboardType="numeric"
          />
        </View>

        {/* Payment Method */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedPayment(method.id)}
              className={`flex-row items-center p-3 rounded-lg mb-2 border ${
                selectedPayment === method.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <Ionicons
                name={method.icon as keyof typeof Ionicons.glyphMap}
                size={24}
                color={selectedPayment === method.id ? '#2ECC71' : '#6C757D'}
              />
              <Text className={`ml-3 font-medium ${
                selectedPayment === method.id ? 'text-green-600' : 'text-gray-700'
              }`}>
                {method.name}
              </Text>
              {selectedPayment === method.id && (
                <Ionicons name="checkmark-circle" size={20} color="#2ECC71" className="ml-auto" />
              )}
            </TouchableOpacity>
          ))}

          {/* Card Details */}
          {selectedPayment === 'card' && (
            <View className="mt-4">
              <Input
                label="Card Number"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChangeText={(text) => setCardDetails({ ...cardDetails, number: text })}
                keyboardType="numeric"
                leftIcon="card-outline"
              />
              
              <View className="flex-row" style={{ gap: 8 }}>
                <View className="flex-1">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, expiry: text })}
                  />
                </View>
                <View className="flex-1">
                  <Input
                    label="CVV"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChangeText={(text) => setCardDetails({ ...cardDetails, cvv: text })}
                    keyboardType="numeric"
                    secureTextEntry
                  />
                </View>
              </View>
              
              <Input
                label="Cardholder Name"
                placeholder="Name on card"
                value={cardDetails.name}
                onChangeText={(text) => setCardDetails({ ...cardDetails, name: text })}
              />
            </View>
          )}
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View className="bg-white border-t border-gray-200 p-4">
        <Button
          title={`Place Order - $${finalTotal.toFixed(2)}`}
          onPress={handlePlaceOrder}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutScreen;