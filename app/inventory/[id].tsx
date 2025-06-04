import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Package, TrendingUp, TriangleAlert as AlertTriangle, CreditCard as Edit } from 'lucide-react-native';

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock product data
  const product = {
    id,
    name: 'Organic Apples',
    category: 'Fruits',
    sku: 'FR-APPLE-ORG',
    price: 2.99,
    unit: 'lb',
    stock: 145,
    lowStockAlert: 30,
    description: 'Fresh organic apples sourced from local farms.',
    image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=150',
    stats: {
      monthlyOrders: 250,
      monthlyRevenue: 747.50,
      stockValue: 433.55
    }
  };

  const getStockLevelColor = (stock: number, lowStockAlert: number) => {
    if (stock === 0) return '#EF4444';
    if (stock < lowStockAlert) return '#F59E0B';
    return '#10B981';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            // Handle edit
          }}
        >
          <Edit size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.basicInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productCategory}>{product.category}</Text>
            <Text style={styles.productSku}>SKU: {product.sku}</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Package size={24} color="#1E3A8A" />
            <Text style={styles.statValue}>{product.stock} {product.unit}</Text>
            <Text style={styles.statLabel}>Current Stock</Text>
          </View>
          
          <View style={styles.statCard}>
            <TrendingUp size={24} color="#10B981" />
            <Text style={styles.statValue}>{product.stats.monthlyOrders}</Text>
            <Text style={styles.statLabel}>Monthly Orders</Text>
          </View>
          
          <View style={styles.statCard}>
            <AlertTriangle size={24} color="#F59E0B" />
            <Text style={styles.statValue}>{product.lowStockAlert}</Text>
            <Text style={styles.statLabel}>Low Stock Alert</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Information</Text>
          <View style={styles.card}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Unit Price</Text>
              <Text style={styles.priceValue}>
                ${product.price.toFixed(2)}/{product.unit}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Stock Value</Text>
              <Text style={styles.priceValue}>
                ${product.stats.stockValue.toFixed(2)}
              </Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Monthly Revenue</Text>
              <Text style={styles.priceValue}>
                ${product.stats.monthlyRevenue.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <View style={styles.card}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.orderButton]}
          onPress={() => router.push('/sales/new-order')}
        >
          <Package size={20} color="#FFFFFF" />
          <Text style={styles.orderButtonText}>Order More</Text>
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
    flex: 1,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  basicInfo: {
    alignItems: 'center',
  },
  productName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 4,
  },
  productCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  productSku: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  priceValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    lineHeight: 24,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  button: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderButton: {
    backgroundColor: '#1E3A8A',
  },
  orderButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});