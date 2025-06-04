import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Plus, Minus, ShoppingCart } from 'lucide-react-native';

// Mock products data
const PRODUCTS = [
  {
    id: '1',
    name: 'Organic Apples',
    category: 'Fruits',
    price: 2.99,
    unit: 'lb',
    stock: 145,
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: '2',
    name: 'Whole Milk',
    category: 'Dairy',
    price: 4.49,
    unit: 'gal',
    stock: 78,
    image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  // Add more products as needed
];

export default function NewOrderScreen() {
  const renderProductItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.productPrice}>${item.price}/{item.unit}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton}>
            <Minus size={16} color="#64748B" />
          </TouchableOpacity>
          <TextInput
            style={styles.quantityInput}
            keyboardType="numeric"
            defaultValue="0"
          />
          <TouchableOpacity style={styles.quantityButton}>
            <Plus size={16} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Order</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      <FlatList
        data={PRODUCTS}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.productList}
      />

      <View style={styles.footer}>
        <View style={styles.orderSummary}>
          <Text style={styles.totalItems}>Items: 0</Text>
          <Text style={styles.totalAmount}>Total: $0.00</Text>
        </View>
        <TouchableOpacity 
          style={styles.checkoutButton}
          onPress={() => {
            // Handle checkout
            router.push('/sales/review-order');
          }}
        >
          <ShoppingCart size={20} color="#FFFFFF" />
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
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
  productList: {
    padding: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  productPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 48,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginHorizontal: 12,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalItems: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  checkoutButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});