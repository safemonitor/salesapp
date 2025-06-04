import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { Plus, Search, Package, TriangleAlert as AlertTriangle, ArrowUpRight, ArrowDownRight, Scale } from 'lucide-react-native';
import { useState, useCallback } from 'react';
import SearchBar from '@/components/SearchBar';

export default function InventoryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    { id: 'low-stock', label: 'Low Stock' },
    { id: 'out-of-stock', label: 'Out of Stock' },
    { id: 'fruits', label: 'Fruits' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'bakery', label: 'Bakery' }
  ];

  const products = [
    {
      id: '1',
      name: 'Organic Apples',
      category: 'Fruits',
      price: 2.99,
      unit: 'lb',
      stock: 145,
      lowStockAlert: 30,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Whole Milk',
      category: 'Dairy',
      price: 4.49,
      unit: 'gal',
      stock: 78,
      lowStockAlert: 20,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '3',
      name: 'Sourdough Bread',
      category: 'Bakery',
      price: 5.99,
      unit: 'loaf',
      stock: 25,
      lowStockAlert: 15,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilters.length === 0) return matchesSearch;
    
    return matchesSearch && (
      (selectedFilters.includes('low-stock') && product.stock < product.lowStockAlert) ||
      (selectedFilters.includes('out-of-stock') && product.stock === 0) ||
      selectedFilters.includes(product.category.toLowerCase())
    );
  });

  const getStockLevelColor = (stock: number, lowStockAlert: number) => {
    if (stock === 0) return '#EF4444';
    if (stock < lowStockAlert) return '#F59E0B';
    return '#10B981';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventory</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/inventory/new')}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Package size={24} color="#1E3A8A" />
          <Text style={styles.statValue}>248</Text>
          <Text style={styles.statLabel}>Total Products</Text>
        </View>
        <View style={styles.statCard}>
          <AlertTriangle size={24} color="#F59E0B" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Low Stock</Text>
        </View>
        <View style={styles.statCard}>
          <Package size={24} color="#EF4444" />
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Out of Stock</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredProducts.map(product => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => router.push(`/inventory/${product.id}`)}
          >
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}/{product.unit}</Text>
              </View>

              <Text style={styles.productCategory}>{product.category}</Text>

              <View style={styles.stockInfo}>
                <Text style={[
                  styles.stockValue,
                  { color: getStockLevelColor(product.stock, product.lowStockAlert) }
                ]}>
                  {product.stock} {product.unit}
                </Text>
                
                {product.stock < product.lowStockAlert && (
                  <View style={styles.alertBadge}>
                    <AlertTriangle size={12} color="#F59E0B" />
                    <Text style={styles.alertText}>Low Stock</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.countButton]}
                  onPress={() => router.push(`/inventory/count/${product.id}`)}
                >
                  <Scale size={14} color="#1E3A8A" />
                  <Text style={styles.countButtonText}>Count</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.actionButton, styles.loadButton]}
                  onPress={() => router.push(`/inventory/load/${product.id}`)}
                >
                  <ArrowDownRight size={14} color="#10B981" />
                  <Text style={styles.loadButtonText}>Load</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, styles.unloadButton]}
                  onPress={() => router.push(`/inventory/unload/${product.id}`)}
                >
                  <ArrowUpRight size={14} color="#F59E0B" />
                  <Text style={styles.unloadButtonText}>Unload</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  stockValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginRight: 8,
  },
  alertBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  alertText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  countButton: {
    backgroundColor: '#EFF6FF',
  },
  loadButton: {
    backgroundColor: '#F0FDF4',
  },
  unloadButton: {
    backgroundColor: '#FFFBEB',
  },
  countButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E3A8A',
    marginLeft: 4,
  },
  loadButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  unloadButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#F59E0B',
    marginLeft: 4,
  },
});