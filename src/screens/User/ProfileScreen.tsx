import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { logout } from '../../store/slices/authSlice';
import { clearCart } from '../../store/slices/cartSlice';
import { clearWishlist } from '../../store/slices/wishlistSlice';
import { RootState } from '../../store/store';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
            dispatch(clearCart());
            dispatch(clearWishlist());
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: 'View your order history',
      icon: 'receipt-outline',
      onPress: () => {
        // Navigate to orders screen (not implemented in this demo)
        Alert.alert('Feature', 'Order history feature coming soon!');
      },
    },
    {
      id: 'addresses',
      title: 'Shipping Addresses',
      subtitle: 'Manage your addresses',
      icon: 'location-outline',
      onPress: () => {
        Alert.alert('Feature', 'Address management feature coming soon!');
      },
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      subtitle: 'Manage your payment options',
      icon: 'card-outline',
      onPress: () => {
        Alert.alert('Feature', 'Payment methods feature coming soon!');
      },
    },
    {
      id: 'notifications',
      title: 'Notifications',
      subtitle: 'Manage your preferences',
      icon: 'notifications-outline',
      onPress: () => {
        Alert.alert('Feature', 'Notification settings feature coming soon!');
      },
    },
    {
      id: 'support',
      title: 'Help & Support',
      subtitle: 'Get help with your account',
      icon: 'help-circle-outline',
      onPress: () => {
        Alert.alert('Support', 'Contact us at support@ecoshop.com');
      },
    },
    {
      id: 'about',
      title: 'About EcoShop',
      subtitle: 'Learn more about us',
      icon: 'information-circle-outline',
      onPress: () => {
        Alert.alert('About', 'EcoShop - Your sustainable shopping destination');
      },
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title="Profile" />

      <ScrollView className="flex-1 px-4 py-4">
        {/* User Info */}
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row items-center">
            <View className="bg-green-100 rounded-full p-4">
              <Ionicons name="person" size={32} color="#2ECC71" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-xl font-bold text-gray-800">{user?.name}</Text>
              <Text className="text-gray-600">{user?.email}</Text>
              {user?.isAdmin && (
                <View className="bg-green-100 self-start px-2 py-1 rounded-full mt-1">
                  <Text className="text-green-700 text-xs font-medium">Admin</Text>
                </View>
              )}
            </View>
            <TouchableOpacity className="p-2">
              <Ionicons name="pencil" size={20} color="#6C757D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row mb-4" style={{ gap: 8 }}>
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-2xl font-bold text-green-600">{cartItems.length}</Text>
            <Text className="text-gray-600 text-sm">Items in Cart</Text>
          </View>
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-2xl font-bold text-red-500">{wishlistItems.length}</Text>
            <Text className="text-gray-600 text-sm">Wishlist Items</Text>
          </View>
          <View className="flex-1 bg-white rounded-lg p-4 shadow-sm">
            <Text className="text-2xl font-bold text-blue-500">0</Text>
            <Text className="text-gray-600 text-sm">Total Orders</Text>
          </View>
        </View>

        {/* Profile Options */}
        <View className="bg-white rounded-lg shadow-sm mb-4">
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={option.id}
              onPress={option.onPress}
              className={`flex-row items-center p-4 ${
                index < profileOptions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <View className="bg-gray-100 rounded-full p-2">
                <Ionicons
                  name={option.icon as keyof typeof Ionicons.glyphMap}
                  size={20}
                  color="#6C757D"
                />
              </View>
              <View className="ml-3 flex-1">
                <Text className="text-gray-800 font-medium">{option.title}</Text>
                <Text className="text-gray-500 text-sm">{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CED4DA" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <Button
          title="Logout"
          onPress={handleLogout}
          variant="outline"
        />

        <View className="items-center mt-6 mb-4">
          <Text className="text-gray-500 text-sm">Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;