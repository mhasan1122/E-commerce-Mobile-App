import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { RootState } from '../../store/store';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

interface AdminDashboardScreenProps {
  navigation: any;
}

const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ navigation }) => {
  const products = useSelector((state: RootState) => state.products.products);
  
  // Mock data for dashboard
  const dashboardStats = {
    totalProducts: products.length,
    totalOrders: 156,
    totalRevenue: 12450.50,
    pendingOrders: 23,
  };

  const quickActions = [
    {
      id: 'add-product',
      title: 'Add Product',
      subtitle: 'Add new product to store',
      icon: 'add-circle',
      color: '#2ECC71',
      onPress: () => navigation.navigate('Products'),
    },
    {
      id: 'manage-orders',
      title: 'Manage Orders',
      subtitle: 'View and update orders',
      icon: 'receipt',
      color: '#3498DB',
      onPress: () => navigation.navigate('Orders'),
    },
    {
      id: 'view-products',
      title: 'View Products',
      subtitle: 'Manage product inventory',
      icon: 'cube',
      color: '#9B59B6',
      onPress: () => navigation.navigate('Products'),
    },
    {
      id: 'analytics',
      title: 'Analytics',
      subtitle: 'View sales analytics',
      icon: 'analytics',
      color: '#E67E22',
      onPress: () => {
        // Navigate to analytics (not implemented)
      },
    },
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 89.99, status: 'processing' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 156.50, status: 'shipped' },
    { id: 'ORD-003', customer: 'Mike Johnson', amount: 45.00, status: 'delivered' },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: 234.99, status: 'processing' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title="Admin Dashboard" />

      <ScrollView className="flex-1 px-4 py-4">
        {/* Stats Cards */}
        <View className="flex-row flex-wrap justify-between mb-6">
          <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: cardWidth }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-gray-800">{dashboardStats.totalProducts}</Text>
                <Text className="text-gray-600 text-sm">Total Products</Text>
              </View>
              <View className="bg-green-100 rounded-full p-2">
                <Ionicons name="cube" size={24} color="#2ECC71" />
              </View>
            </View>
          </View>

          <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: cardWidth }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-gray-800">{dashboardStats.totalOrders}</Text>
                <Text className="text-gray-600 text-sm">Total Orders</Text>
              </View>
              <View className="bg-blue-100 rounded-full p-2">
                <Ionicons name="receipt" size={24} color="#3498DB" />
              </View>
            </View>
          </View>

          <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: cardWidth }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-gray-800">${dashboardStats.totalRevenue.toLocaleString()}</Text>
                <Text className="text-gray-600 text-sm">Total Revenue</Text>
              </View>
              <View className="bg-purple-100 rounded-full p-2">
                <Ionicons name="trending-up" size={24} color="#9B59B6" />
              </View>
            </View>
          </View>

          <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: cardWidth }}>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold text-gray-800">{dashboardStats.pendingOrders}</Text>
                <Text className="text-gray-600 text-sm">Pending Orders</Text>
              </View>
              <View className="bg-orange-100 rounded-full p-2">
                <Ionicons name="time" size={24} color="#E67E22" />
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                onPress={action.onPress}
                className="bg-white rounded-lg p-4 shadow-sm mb-3"
                style={{ width: cardWidth }}
              >
                <View className="items-center">
                  <View className="rounded-full p-3 mb-2" style={{ backgroundColor: `${action.color}20` }}>
                    <Ionicons
                      name={action.icon as keyof typeof Ionicons.glyphMap}
                      size={24}
                      color={action.color}
                    />
                  </View>
                  <Text className="text-gray-800 font-medium text-center">{action.title}</Text>
                  <Text className="text-gray-500 text-xs text-center mt-1">{action.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Orders */}
        <View className="bg-white rounded-lg shadow-sm mb-4">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <Text className="text-lg font-semibold text-gray-800">Recent Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Orders')}>
              <Text className="text-green-600 font-medium">View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order, index) => (
            <View
              key={order.id}
              className={`flex-row items-center justify-between p-4 ${
                index < recentOrders.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <View className="flex-1">
                <Text className="font-medium text-gray-800">{order.id}</Text>
                <Text className="text-gray-600 text-sm">{order.customer}</Text>
              </View>
              <View className="items-end">
                <Text className="font-semibold text-gray-800">${order.amount}</Text>
                <View className={`px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                  <Text className="text-xs font-medium capitalize">{order.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;