import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';

interface Order {
  id: string;
  customer: string;
  email: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: string;
  createdAt: string;
  paymentMethod: 'cash_on_delivery' | 'card' | 'other';
}

interface OrderManagementScreenProps {
  navigation: any;
}

const OrderManagementScreen: React.FC<OrderManagementScreenProps> = ({ navigation }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      items: [
        { name: 'Wireless Headphones', quantity: 1, price: 99.99 },
        { name: 'Phone Case', quantity: 2, price: 15.99 },
      ],
      total: 131.97,
      status: 'processing',
      address: '123 Main St, New York, NY 10001',
      createdAt: '2024-01-15T10:30:00Z',
      paymentMethod: 'cash_on_delivery',
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      items: [
        { name: 'Smart Watch', quantity: 1, price: 199.99 },
      ],
      total: 199.99,
      status: 'shipped',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      createdAt: '2024-01-14T15:45:00Z',
      paymentMethod: 'card',
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      items: [
        { name: 'Yoga Mat', quantity: 1, price: 49.99 },
      ],
      total: 49.99,
      status: 'delivered',
      address: '789 Pine St, Chicago, IL 60601',
      createdAt: '2024-01-13T09:15:00Z',
      paymentMethod: 'cash_on_delivery',
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      items: [
        { name: 'Leather Bag', quantity: 1, price: 79.99 },
        { name: 'Coffee Mug Set', quantity: 1, price: 39.99 },
      ],
      total: 119.98,
      status: 'processing',
      address: '321 Elm St, Miami, FL 33101',
      createdAt: '2024-01-12T14:20:00Z',
      paymentMethod: 'cash_on_delivery',
    },
  ]);

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length },
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case 'processing': return 'shipped';
      case 'shipped': return 'delivered';
      default: return null;
    }
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    Alert.alert(
      'Update Order Status',
      `Are you sure you want to mark this order as ${newStatus}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Update',
          onPress: () => {
            setOrders(orders.map(order => 
              order.id === orderId ? { ...order, status: newStatus as any } : order
            ));
          },
        },
      ]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderStatusFilter = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => setSelectedStatus(item.value)}
      className={`px-4 py-2 rounded-full mr-3 border ${
        selectedStatus === item.value 
          ? 'bg-green-500 border-green-500' 
          : 'bg-white border-gray-300'
      }`}
    >
      <Text className={`font-medium ${
        selectedStatus === item.value ? 'text-white' : 'text-gray-700'
      }`}>
        {item.label} ({item.count})
      </Text>
    </TouchableOpacity>
  );

  const renderOrder = (order: Order) => (
    <View key={order.id} className="bg-white rounded-lg p-4 mb-3 shadow-sm">
      {/* Order Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">{order.id}</Text>
          <Text className="text-gray-600">{order.customer}</Text>
          <Text className="text-gray-500 text-sm">{order.email}</Text>
        </View>
        <View className="items-end">
          <Text className="text-lg font-bold text-green-600">${order.total.toFixed(2)}</Text>
          <View className={`px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
            <Text className="text-xs font-medium capitalize">{order.status}</Text>
          </View>
        </View>
      </View>

      {/* Order Items */}
      <View className="mb-3">
        <Text className="text-gray-700 font-medium mb-2">Items:</Text>
        {order.items.map((item, index) => (
          <View key={index} className="flex-row justify-between items-center py-1">
            <Text className="text-gray-600 flex-1" numberOfLines={1}>
              {item.name} x {item.quantity}
            </Text>
            <Text className="text-gray-800 font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Address */}
      <View className="mb-3">
        <Text className="text-gray-700 font-medium mb-1">Shipping Address:</Text>
        <Text className="text-gray-600 text-sm">{order.address}</Text>
      </View>

      {/* Order Date and Payment Method */}
      <View className="mb-3">
        <Text className="text-gray-500 text-sm">
          Ordered on {formatDate(order.createdAt)}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Payment Method: {order.paymentMethod === 'cash_on_delivery' ? 'Cash on Delivery' : order.paymentMethod === 'card' ? 'Card' : 'Other'}
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row space-x-2">
        {getNextStatus(order.status) && (
          <Button
            title={`Mark as ${getNextStatus(order.status)}`}
            onPress={() => handleUpdateStatus(order.id, getNextStatus(order.status)!)}
            size="sm"
            style={{ flex: 1 }}
          />
        )}
        
        {order.status === 'processing' && (
          <Button
            title="Cancel Order"
            onPress={() => handleUpdateStatus(order.id, 'cancelled')}
            variant="outline"
            size="sm"
            style={{ flex: 1 }}
          />
        )}
        
        <TouchableOpacity className="bg-gray-100 rounded-lg px-4 py-2">
          <Ionicons name="mail-outline" size={16} color="#6C757D" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title="Order Management" />

      <View className="flex-1">
        {/* Status Filter */}
        <View className="py-3">
          <FlatList
            data={statusOptions}
            renderItem={renderStatusFilter}
            keyExtractor={(item) => item.value}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Orders List */}
        <ScrollView className="flex-1 px-4">
          {filteredOrders.length === 0 ? (
            <View className="flex-1 justify-center items-center py-12">
              <Ionicons name="receipt-outline" size={80} color="#CED4DA" />
              <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">
                No {selectedStatus !== 'all' ? selectedStatus : ''} orders found
              </Text>
              <Text className="text-gray-500 text-center">
                {selectedStatus === 'all' 
                  ? 'Orders will appear here when customers place them'
                  : `No orders with ${selectedStatus} status`
                }
              </Text>
            </View>
          ) : (
            <View className="pb-6">
              {filteredOrders.map(renderOrder)}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default OrderManagementScreen;