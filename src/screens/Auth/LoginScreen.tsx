import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { loginSuccess } from '../../store/slices/authSlice';

const { height } = Dimensions.get('window');

interface LoginScreenProps {
  navigation: any;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const isAdmin = email === 'admin@example.com';
      
      dispatch(loginSuccess({
        id: '1',
        email,
        name: isAdmin ? 'Admin User' : 'John Doe',
        isAdmin,
      }));
      
      setLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (isAdmin: boolean) => {
    const demoUser = {
      id: isAdmin ? 'admin1' : 'user1',
      email: isAdmin ? 'admin@example.com' : 'user@example.com',
      name: isAdmin ? 'Admin User' : 'Demo User',
      isAdmin,
    };
    
    dispatch(loginSuccess(demoUser));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#F4F9F4' }}>
      {/* Header with gradient-like effect */}
      <View className="bg-green-500 px-6 pt-8 pb-12 rounded-b-3xl">
        <View className="items-center">
          <View className="bg-white/20 rounded-full p-4 mb-4">
            <Ionicons name="storefront" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">EcoShop</Text>
          <Text className="text-green-100 text-lg">Your Sustainable Store</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 -mt-6">
        {/* Login Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back!</Text>
          
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-closed-outline"
          />

          <TouchableOpacity 
            className="self-end mb-6"
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text className="text-green-600 font-medium">Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />
        </View>

        {/* Demo Accounts Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <View className="items-center mb-4">
            <View className="bg-green-100 rounded-full p-2 mb-2">
              <Ionicons name="flash" size={20} color="#2ECC71" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">Quick Demo Access</Text>
            <Text className="text-gray-500 text-center text-sm">Try the app instantly with demo accounts</Text>
          </View>
          
          <View className="gap-3">
            <TouchableOpacity
              onPress={() => handleDemoLogin(false)}
              className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex-row items-center"
            >
              <View className="bg-green-500 rounded-full p-2 mr-4">
                <Ionicons name="person" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-green-700 font-semibold text-base">Login as Customer</Text>
                <Text className="text-green-600 text-sm">Browse, shop, and checkout</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#2ECC71" />
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={() => handleDemoLogin(true)}
              className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex-row items-center"
            >
              <View className="bg-blue-500 rounded-full p-2 mr-4">
                <Ionicons name="shield-checkmark" size={20} color="white" />
              </View>
              <View className="flex-1">
                <Text className="text-blue-700 font-semibold text-base">Login as Admin</Text>
                <Text className="text-blue-600 text-sm">Manage products and orders</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-600">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text className="text-green-600 font-semibold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;