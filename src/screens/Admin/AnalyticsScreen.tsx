import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { LineChart, BarChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`,
  strokeWidth: 2,
  decimalPlaces: 0,
  style: {
    borderRadius: 16,
  },
};

interface AnalyticsScreenProps {
  navigation: any;
}

const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ navigation }) => {
  // Mock analytics data
  const analyticsData = {
    dailySales: 2450.75,
    weeklySales: 15678.90,
    monthlySales: 45890.50,
    salesData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [2450, 3400, 2800, 3900, 2900, 3300, 3150],
      }]
    },
    monthlyData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        data: [35000, 42000, 38000, 45000, 39000, 45890],
      }]
    },
    topSellingProducts: [
      { name: 'Product 1', sales: 156, color: '#2ECC71' },
      { name: 'Product 2', sales: 143, color: '#3498DB' },
      { name: 'Product 3', sales: 98, color: '#9B59B6' },
    ],
    recentTransactions: [
      { date: '2025-09-04', amount: 234.50, items: 3 },
      { date: '2025-09-03', amount: 567.80, items: 5 },
      { date: '2025-09-02', amount: 123.45, items: 2 },
    ],
  };

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title="Analytics" />
      
      <ScrollView className="flex-1 px-4 py-4">
        {/* Sales Overview */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Sales Overview</Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: width * 0.44 }}>
              <Text className="text-gray-600">Daily Sales</Text>
              <Text className="text-xl font-bold text-gray-800">${analyticsData.dailySales.toLocaleString()}</Text>
            </View>
            <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: width * 0.44 }}>
              <Text className="text-gray-600">Weekly Sales</Text>
              <Text className="text-xl font-bold text-gray-800">${analyticsData.weeklySales.toLocaleString()}</Text>
            </View>
            <View className="bg-white rounded-lg p-4 shadow-sm mb-3" style={{ width: width * 0.92 }}>
              <Text className="text-gray-600">Monthly Sales</Text>
              <Text className="text-xl font-bold text-gray-800">${analyticsData.monthlySales.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Weekly Sales Chart */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Weekly Sales Chart</Text>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <LineChart
              data={analyticsData.salesData}
              width={width - 32}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        {/* Monthly Sales Chart */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Monthly Sales Trend</Text>
          <View className="bg-white rounded-lg p-4 shadow-sm">
            <BarChart
              data={analyticsData.monthlyData}
              width={width - 32}
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>

        {/* Top Selling Products */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Top Selling Products</Text>
          <View className="bg-white rounded-lg shadow-sm">
            <BarChart
              data={{
                labels: analyticsData.topSellingProducts.map(product => product.name),
                datasets: [{
                  data: analyticsData.topSellingProducts.map(product => product.sales)
                }]
              }}
              width={width - 32}
              height={220}
              yAxisLabel=""
              yAxisSuffix=""
              chartConfig={{
                ...chartConfig,
                barPercentage: 0.7,
                propsForLabels: {
                  fontSize: 12,
                }
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              showValuesOnTopOfBars={true}
            />
          </View>
        </View>

        {/* Recent Transactions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Recent Transactions</Text>
          <View className="bg-white rounded-lg shadow-sm">
            {analyticsData.recentTransactions.map((transaction, index) => (
              <View 
                key={index}
                className={`p-4 flex-row justify-between items-center ${
                  index !== analyticsData.recentTransactions.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <View>
                  <Text className="text-gray-800">{transaction.date}</Text>
                  <Text className="text-gray-600 text-sm">{transaction.items} items</Text>
                </View>
                <Text className="font-semibold text-gray-800">${transaction.amount.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnalyticsScreen;
