import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { loginSuccess } from '../../store/slices/authSlice';

interface ResetPasswordScreenProps {
  navigation: any;
  route: {
    params?: {
      token?: string;
      email?: string;
    };
  };
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation, route }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const dispatch = useDispatch();

  const email = route.params?.email || 'user@example.com';
  const token = route.params?.token || 'demo-token';

  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setPasswordReset(true);
    }, 2000);
  };

  const handleSignIn = () => {
    // Auto-login the user after successful password reset
    dispatch(loginSuccess({
      id: Date.now().toString(),
      email,
      name: 'Demo User',
      isAdmin: false,
    }));
  };

  if (passwordReset) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#F4F9F4' }}>
        {/* Header */}
        <View className="bg-green-500 px-6 pt-8 pb-12 rounded-b-3xl">
          <View className="items-center mt-8">
            <View className="bg-white/20 rounded-full p-4 mb-4">
              <Ionicons name="checkmark-circle" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white mb-2">Password Reset</Text>
            <Text className="text-green-100 text-lg text-center">Your password has been updated</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 -mt-6">
          {/* Success Card */}
          <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <View className="items-center mb-6">
              <View className="bg-green-100 rounded-full p-4 mb-4">
                <Ionicons name="shield-checkmark" size={48} color="#2ECC71" />
              </View>
              <Text className="text-xl font-bold text-gray-800 text-center mb-2">
                Password Successfully Reset!
              </Text>
              <Text className="text-gray-600 text-center leading-6">
                Your password has been updated successfully. You can now sign in with your new password.
              </Text>
            </View>

            <View className="bg-green-50 rounded-xl p-4 mb-6">
              <View className="flex-row items-center">
                <Ionicons name="lock-closed" size={20} color="#2ECC71" />
                <Text className="text-green-800 font-medium ml-3">Security Tips:</Text>
              </View>
              <Text className="text-green-700 text-sm mt-2 leading-5">
                • Use a strong, unique password{'\n'}
                • Don't share your password with others{'\n'}
                • Consider using a password manager{'\n'}
                • Enable two-factor authentication if available
              </Text>
            </View>

            <Button
              title="Sign In Now"
              onPress={handleSignIn}
            />
          </View>

          {/* Back to Login */}
          <View className="flex-row justify-center items-center mb-8">
            <Text className="text-gray-600">Want to sign in later? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-green-600 font-semibold">Go to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#F4F9F4' }}>
      {/* Header */}
      <View className="bg-green-500 px-6 pt-8 pb-12 rounded-b-3xl">
        <TouchableOpacity 
          onPress={() => navigation.navigate('Login')}
          className="absolute top-12 left-6 bg-white/20 rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="items-center mt-8">
          <View className="bg-white/20 rounded-full p-4 mb-4">
            <Ionicons name="lock-closed" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">Reset Password</Text>
          <Text className="text-green-100 text-lg text-center">Create your new password</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 -mt-6">
        {/* Reset Password Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">New Password</Text>
          <Text className="text-gray-600 text-center mb-6 leading-6">
            Enter a strong password for your account{'\n'}
            <Text className="font-medium text-green-600">{email}</Text>
          </Text>
          
          <Input
            label="New Password"
            placeholder="Enter new password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            leftIcon="lock-closed-outline"
          />

          <Input
            label="Confirm Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock-closed-outline"
          />

          <View className="bg-blue-50 rounded-xl p-4 mb-6">
            <View className="flex-row items-center mb-2">
              <Ionicons name="information-circle" size={16} color="#3B82F6" />
              <Text className="text-blue-800 font-medium ml-2">Password Requirements:</Text>
            </View>
            <Text className="text-blue-700 text-sm leading-5">
              • At least 6 characters long{'\n'}
              • Mix of letters and numbers recommended{'\n'}
              • Avoid common passwords
            </Text>
          </View>

          <Button
            title="Update Password"
            onPress={handleResetPassword}
            loading={loading}
          />
        </View>

        {/* Back to Login */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-600">Remember your password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-green-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;