import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { ProductCard } from '../../components/ProductCard';
import { setProducts } from '../../store/slices/productsSlice';
import { RootState } from '../../store/store';
import { Product } from '../../types';

interface AddProductScreenProps {
  navigation: any;
}

const AddProductScreen: React.FC<AddProductScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: '',
    image: '',
    inStock: true,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);

  const categories = ['Electronics', 'Clothing', 'Accessories', 'Home & Kitchen', 'Sports'];

  const handleAddProduct = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop',
      rating: 4.0,
      reviewCount: 0,
      inStock: formData.inStock,
    };

    setTimeout(() => {
      dispatch(setProducts([...products, newProduct]));
      setLoading(false);
      setFormData({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: '',
        image: '',
        inStock: true,
      });
      Alert.alert('Success', 'Product added successfully!');
    }, 1000);
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedProducts = products.filter(p => p.id !== productId);
            dispatch(setProducts(updatedProducts));
          },
        },
      ]
    );
  };

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderAddProduct = () => (
    <ScrollView className="flex-1 px-4 py-4">
      <View className="bg-white rounded-lg p-4 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">Add New Product</Text>
        
        <Input
          label="Product Name *"
          placeholder="Enter product name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
        />
        
        <Input
          label="Description *"
          placeholder="Enter product description"
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={3}
        />
        
        <View className="flex-row" style={{ gap: 8 }}>
          <View className="flex-1">
            <Input
              label="Price *"
              placeholder="0.00"
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
              keyboardType="numeric"
              leftIcon="pricetag-outline"
            />
          </View>
          <View className="flex-1">
            <Input
              label="Original Price"
              placeholder="0.00"
              value={formData.originalPrice}
              onChangeText={(text) => setFormData({ ...formData, originalPrice: text })}
              keyboardType="numeric"
            />
          </View>
        </View>
        
        <View className="mb-4">
          <Text className="text-gray-700 font-medium mb-2">Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  onPress={() => setFormData({ ...formData, category })}
                  className={`px-4 py-2 rounded-full mr-3 border ${
                    formData.category === category
                      ? 'bg-green-500 border-green-500'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <Text className={`font-medium ${
                    formData.category === category ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        
        <Input
          label="Image URL"
          placeholder="https://example.com/image.jpg"
          value={formData.image}
          onChangeText={(text) => setFormData({ ...formData, image: text })}
          leftIcon="image-outline"
        />
        
        <TouchableOpacity
          onPress={() => setFormData({ ...formData, inStock: !formData.inStock })}
          className="flex-row items-center mb-6"
        >
          <View className={`w-6 h-6 rounded border-2 mr-3 items-center justify-center ${
            formData.inStock ? 'bg-green-500 border-green-500' : 'border-gray-300'
          }`}>
            {formData.inStock && <Ionicons name="checkmark" size={16} color="white" />}
          </View>
          <Text className="text-gray-700 font-medium">In Stock</Text>
        </TouchableOpacity>
        
        {formData.image && (
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-2">Preview</Text>
            <Image
              source={{ uri: formData.image }}
              className="w-full h-48 rounded-lg"
              resizeMode="cover"
            />
          </View>
        )}
        
        <Button
          title="Add Product"
          onPress={handleAddProduct}
          loading={loading}
        />
      </View>
    </ScrollView>
  );

  const renderManageProducts = () => (
    <ScrollView className="flex-1 px-4 py-4">
      <View className="mb-4">
        <Text className="text-lg font-semibold text-gray-800 mb-3">
          Manage Products ({products.length})
        </Text>
      </View>
      
      {products.length === 0 ? (
        <View className="flex-1 justify-center items-center py-12">
          <Ionicons name="cube-outline" size={80} color="#CED4DA" />
          <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">No products found</Text>
          <Text className="text-gray-500 text-center">
            Add some products to see them here
          </Text>
        </View>
      ) : (
        <View className="flex-row flex-wrap justify-between">
          {products.map((product) => (
            <View key={product.id} className="relative mb-4">
              <ProductCard
                product={product}
                viewMode="grid"
                onPress={() => handleProductPress(product)}
              />
              <TouchableOpacity
                onPress={() => handleDeleteProduct(product.id)}
                className="absolute top-2 left-2 bg-red-500 rounded-full p-1"
              >
                <Ionicons name="trash" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header title="Product Management" />
      
      {/* Tab Navigation */}
      <View className="flex-row bg-white border-b border-gray-200">
        <TouchableOpacity
          onPress={() => setActiveTab('add')}
          className={`flex-1 py-4 items-center border-b-2 ${
            activeTab === 'add' ? 'border-green-500' : 'border-transparent'
          }`}
        >
          <Text className={`font-medium ${
            activeTab === 'add' ? 'text-green-600' : 'text-gray-600'
          }`}>
            Add Product
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={() => setActiveTab('manage')}
          className={`flex-1 py-4 items-center border-b-2 ${
            activeTab === 'manage' ? 'border-green-500' : 'border-transparent'
          }`}
        >
          <Text className={`font-medium ${
            activeTab === 'manage' ? 'text-green-600' : 'text-gray-600'
          }`}>
            Manage Products
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'add' ? renderAddProduct() : renderManageProducts()}
    </SafeAreaView>
  );
};

export default AddProductScreen;