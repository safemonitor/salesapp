import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign } from 'lucide-react-native';

export default function ProductPerformanceScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Performance</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Performance Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Package size={24} color="#10B981" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Active Products</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <ShoppingCart size={24} color="#6366F1" />
              <Text style={styles.statValue}>2,456</Text>
              <Text style={styles.statLabel}>Units Sold</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <DollarSign size={24} color="#F59E0B" />
              <Text style={styles.statValue}>$45k</Text>
              <Text style={styles.statLabel}>Revenue</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          <View style={styles.card}>
            {[
              {
                name: 'Organic Apples',
                sales: 456,
                revenue: 1365.50,
                image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Whole Milk',
                sales: 378,
                revenue: 1134.00,
                image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Sourdough Bread',
                sales: 345,
                revenue: 1035.00,
                image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            ].map((product, index) => (
              <View key={index} style={styles.productRow}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productStats}>
                    {product.sales} units · ${product.revenue}
                  </Text>
                </View>
                <TouchableOpacity style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category Performance</Text>
          <View style={styles.card}>
            {[
              { category: 'Fresh Produce', sales: 1245, revenue: 3723.55, trend: 'up' },
              { category: 'Dairy Products', sales: 987, revenue: 2961.00, trend: 'up' },
              { category: 'Bakery Items', sales: 876, revenue: 2628.00, trend: 'down' },
              { category: 'Beverages', sales: 765, revenue: 2295.00, trend: 'up' }
            ].map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.category}</Text>
                  <View style={styles.categoryStats}>
                    <Text style={styles.categorySales}>{category.sales} units</Text>
                    <Text style={styles.categoryRevenue}>${category.revenue}</Text>
                    {category.trend === 'up' ? (
                      <TrendingUp size={16} color="#10B981" />
                    ) : (
                      <TrendingDown size={16} color="#EF4444" />
                    )}
                  </View>
                </View>
                <View style={styles.percentageContainer}>
                  <View style={styles.percentageBar} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Low Stock Alert</Text>
          <View style={styles.card}>
            {[
              { name: 'Organic Bananas', stock: 15, threshold: 20 },
              { name: 'Fresh Eggs', stock: 12, threshold: 24 },
              { name: 'Greek Yogurt', stock: 8, threshold: 15 }
            ].map((item, index) => (
              <View key={index} style={styles.alertRow}>
                <View style={styles.alertInfo}>
                  <Text style={styles.alertName}>{item.name}</Text>
                  <Text style={styles.alertStock}>
                    {item.stock} units remaining (Min: {item.threshold})
                  </Text>
                </View>
                <TouchableOpacity style={styles.reorderButton}>
                  <Text style={styles.reorderButtonText}>Reorder</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
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
  content: {
    flex: 1,
  },
  summaryCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginVertical: 8,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  trend: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trendUp: {
    backgroundColor: '#F0FDF4',
  },
  trendDown: {
    backgroundColor: '#FEF2F2',
  },
  trendText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  trendTextUp: {
    color: '#10B981',
  },
  trendTextDown: {
    color: '#EF4444',
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
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  productImage: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
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
  productStats: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  viewButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  categoryRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryInfo: {
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  categoryStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categorySales: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  categoryRevenue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  percentageContainer: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginTop: 8,
  },
  percentageBar: {
    height: '100%',
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
    width: '75%',
  },
  alertRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  alertInfo: {
    flex: 1,
  },
  alertName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  alertStock: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#EF4444',
  },
  reorderButton: {
    backgroundColor: '#FEF2F2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  reorderButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
});