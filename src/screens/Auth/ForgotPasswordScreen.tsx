import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 2000);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    handleResetPassword();
  };

  if (emailSent) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: '#F4F9F4' }}>
        {/* Header */}
        <View className="bg-green-500 px-6 pt-8 pb-12 rounded-b-3xl">
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-6 bg-white/20 rounded-full p-2"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View className="items-center mt-8">
            <View className="bg-white/20 rounded-full p-4 mb-4">
              <Ionicons name="mail" size={40} color="white" />
            </View>
            <Text className="text-3xl font-bold text-white mb-2">Check Your Email</Text>
            <Text className="text-green-100 text-lg text-center">Reset link sent successfully</Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 -mt-6">
          {/* Success Card */}
          <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <View className="items-center mb-6">
              <View className="bg-green-100 rounded-full p-4 mb-4">
                <Ionicons name="checkmark-circle" size={48} color="#2ECC71" />
              </View>
              <Text className="text-xl font-bold text-gray-800 text-center mb-2">
                Email Sent Successfully!
              </Text>
              <Text className="text-gray-600 text-center leading-6">
                We've sent a password reset link to{'\n'}
                <Text className="font-semibold text-green-600">{email}</Text>
              </Text>
            </View>

            <View className="bg-green-50 rounded-xl p-4 mb-6">
              <View className="flex-row items-start">
                <Ionicons name="information-circle" size={20} color="#2ECC71" className="mt-1 mr-3" />
                <View className="flex-1">
                  <Text className="text-green-800 font-medium mb-1">Next Steps:</Text>
                  <Text className="text-green-700 text-sm leading-5">
                    1. Check your email inbox{'\n'}
                    2. Click the reset link in the email{'\n'}
                    3. Create a new password{'\n'}
                    4. Sign in with your new password
                  </Text>
                </View>
              </View>
            </View>

            <View className="space-y-3">
              <Button
                title="Open Email App"
                onPress={() => {
                  // In a real app, you might use Linking.openURL('mailto:')
                  Alert.alert('Info', 'Please check your email app for the reset link');
                }}
              />
              
              <Button
                title="Resend Email"
                onPress={handleResendEmail}
                variant="outline"
              />
              
              {/* Demo button to simulate clicking email link */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword', { email, token: 'demo-token' })}
                className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
              >
                <Text className="text-blue-600 text-center font-medium">
                  🔗 Demo: Simulate Email Link Click
                </Text>
              </TouchableOpacity>
            </View>
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
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: '#F4F9F4' }}>
      {/* Header */}
      <View className="bg-green-500 px-6 pt-8 pb-12 rounded-b-3xl">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="absolute top-12 left-6 bg-white/20 rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View className="items-center mt-8">
          <View className="bg-white/20 rounded-full p-4 mb-4">
            <Ionicons name="key" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">Forgot Password?</Text>
          <Text className="text-green-100 text-lg text-center">No worries, we'll help you reset it</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 -mt-6">
        {/* Reset Password Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">Reset Password</Text>
          <Text className="text-gray-600 text-center mb-6 leading-6">
            Enter your email address and we'll send you a link to reset your password
          </Text>
          
          <Input
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon="mail-outline"
          />

          <Button
            title="Send Reset Link"
            onPress={handleResetPassword}
            loading={loading}
          />
        </View>

        {/* Help Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <View className="flex-row items-center mb-4">
            <View className="bg-blue-100 rounded-full p-2 mr-3">
              <Ionicons name="help-circle" size={20} color="#3B82F6" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">Need Help?</Text>
          </View>
          
          <View className="space-y-3">
            <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-700 font-medium">Contact Support</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="flex-row items-center p-3 bg-gray-50 rounded-lg">
              <Ionicons name="document-text-outline" size={20} color="#6B7280" />
              <Text className="ml-3 text-gray-700 font-medium">View FAQ</Text>
            </TouchableOpacity>
          </View>
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

export default ForgotPasswordScreen;