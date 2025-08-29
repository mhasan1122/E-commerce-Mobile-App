import React, { useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { Input } from '../../components/Input';
import { RootState } from '../../store/store';
import { setProducts, setSearchQuery, setSelectedCategory, setViewMode } from '../../store/slices/productsSlice';
import { mockProducts } from '../../data/mockData';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { 
    filteredProducts, 
    categories, 
    selectedCategory, 
    searchQuery, 
    viewMode, 
    loading 
  } = useSelector((state: RootState) => state.products);
  
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    // Load products on mount
    dispatch(setProducts(mockProducts));
  }, [dispatch]);

  const handleSearch = (query: string) => {
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

  const handleCartPress = () => {
    navigation.navigate('UserTabs', { screen: 'Cart' });
  };

  const handleSearchPress = () => {
    navigation.navigate('Search');
  };

  const featuredProducts = filteredProducts.filter(p => p.featured);

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      viewMode={viewMode}
      onPress={() => handleProductPress(item)}
    />
  );

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
        title={`Hello, ${user?.name?.split(' ')[0] || 'User'}!`}
        showCart
        showSearch
        onCartPress={handleCartPress}
        onSearchPress={handleSearchPress}
      />

      <ScrollView 
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => dispatch(setProducts(mockProducts))}
            colors={['#2ECC71']}
          />
        }
      >
        {/* Search Bar */}
        <View className="px-4 py-3">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            leftIcon="search-outline"
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

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <View className="mb-4">
            <Text className="text-lg font-semibold text-gray-800 px-4 mb-3">Featured Products</Text>
            <FlatList
              data={featuredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />
          </View>
        )}

        {/* All Products */}
        <View className="flex-row justify-between items-center px-4 mb-3">
          <Text className="text-lg font-semibold text-gray-800">
            All Products ({filteredProducts.length})
          </Text>
          <TouchableOpacity onPress={handleViewModeToggle}>
            <Ionicons 
              name={viewMode === 'grid' ? 'list' : 'grid'} 
              size={24} 
              color="#2ECC71" 
            />
          </TouchableOpacity>
        </View>

        <View className="px-4 pb-6">
          {viewMode === 'grid' ? (
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;