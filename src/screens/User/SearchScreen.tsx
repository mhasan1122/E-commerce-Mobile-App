import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { ProductCard } from '../../components/ProductCard';
import { RootState } from '../../store/store';
import { setSearchQuery, setSelectedCategory, setViewMode } from '../../store/slices/productsSlice';

interface SearchScreenProps {
  navigation: any;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const dispatch = useDispatch();
  
  const { 
    filteredProducts, 
    categories, 
    selectedCategory, 
    searchQuery, 
    viewMode 
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setLocalSearchQuery(query);
    dispatch(setSearchQuery(query));
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategory(category));
  };

  const handleViewModeToggle = () => {
    dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'));
  };

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderCategory = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => handleCategorySelect(item)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedCategory === item ? 'bg-green-500' : 'bg-gray-200'
      }`}
    >
      <Text className={`font-medium capitalize ${
        selectedCategory === item ? 'text-white' : 'text-gray-700'
      }`}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-green-50">
      <Header
        title="Search Products"
        showBack
        onBackPress={() => navigation.goBack()}
      />

      <View className="flex-1">
        {/* Search Input */}
        <View className="px-4 py-3">
          <Input
            placeholder="Search products..."
            value={localSearchQuery}
            onChangeText={handleSearch}
            leftIcon="search-outline"
            rightIcon={localSearchQuery ? "close-circle" : undefined}
            onRightIconPress={() => handleSearch('')}
          />
        </View>

        {/* Categories */}
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-800 px-4 mb-3">Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategory}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          />
        </View>

        {/* Results Header */}
        <View className="flex-row justify-between items-center px-4 mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            {filteredProducts.length} Results
            {searchQuery && ` for "${searchQuery}"`}
          </Text>
          <TouchableOpacity onPress={handleViewModeToggle}>
            <Ionicons 
              name={viewMode === 'grid' ? 'list' : 'grid'} 
              size={24} 
              color="#2ECC71" 
            />
          </TouchableOpacity>
        </View>

        {/* Results */}
        <ScrollView className="flex-1 px-4 pb-6">
          {filteredProducts.length === 0 ? (
            <View className="flex-1 justify-center items-center py-12">
              <Ionicons name="search-outline" size={80} color="#CED4DA" />
              <Text className="text-xl font-semibold text-gray-600 mt-4 mb-2">No products found</Text>
              <Text className="text-gray-500 text-center">
                Try adjusting your search or browse different categories
              </Text>
            </View>
          ) : viewMode === 'grid' ? (
            <View className="flex-row flex-wrap justify-between">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </View>
          ) : (
            <View>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onPress={() => handleProductPress(product)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;