import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { loginSuccess } from '../../store/slices/authSlice';

interface SignupScreenProps {
  navigation: any;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
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
      dispatch(loginSuccess({
        id: Date.now().toString(),
        email,
        name,
        isAdmin: false,
      }));
      
      setLoading(false);
    }, 1000);
  };

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
            <Ionicons name="person-add" size={40} color="white" />
          </View>
          <Text className="text-3xl font-bold text-white mb-2">Join EcoShop</Text>
          <Text className="text-green-100 text-lg">Create your account</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 -mt-6">
        {/* Signup Card */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-6">Get Started</Text>
          
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
            leftIcon="person-outline"
          />

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

          <Input
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon="lock-closed-outline"
          />

          <Button
            title="Create Account"
            onPress={handleSignup}
            loading={loading}
          />
        </View>

        {/* Sign In Link */}
        <View className="flex-row justify-center items-center mb-8">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-green-600 font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;