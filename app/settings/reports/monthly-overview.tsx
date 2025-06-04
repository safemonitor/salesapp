import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from 'lucide-react-native';

export default function MonthlyOverviewScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Monthly Overview</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>January 2024</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.statValue}>$45,678</Text>
              <Text style={styles.statLabel}>Revenue</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <ShoppingCart size={24} color="#6366F1" />
              <Text style={styles.statValue}>324</Text>
              <Text style={styles.statLabel}>Orders</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Users size={24} color="#F59E0B" />
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>New Clients</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Breakdown</Text>
          <View style={styles.card}>
            {[
              { week: 'Week 1', revenue: 12456.75, orders: 82, trend: 'up' },
              { week: 'Week 2', revenue: 15789.50, orders: 94, trend: 'up' },
              { week: 'Week 3', revenue: 11234.25, orders: 76, trend: 'down' },
              { week: 'Week 4', revenue: 13567.50, orders: 88, trend: 'up' }
            ].map((week, index) => (
              <View key={index} style={styles.weekRow}>
                <Text style={styles.weekText}>{week.week}</Text>
                <View style={styles.weekDetails}>
                  <Text style={styles.weekRevenue}>${week.revenue}</Text>
                  <Text style={styles.weekOrders}>{week.orders} orders</Text>
                  {week.trend === 'up' ? (
                    <TrendingUp size={16} color="#10B981" />
                  ) : (
                    <TrendingDown size={16} color="#EF4444" />
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <View style={styles.card}>
            {[
              { name: 'Organic Apples', sales: 1245, revenue: 3723.55 },
              { name: 'Whole Milk', sales: 987, revenue: 4435.65 },
              { name: 'Sourdough Bread', sales: 876, revenue: 3504.00 },
              { name: 'Fresh Eggs', sales: 765, revenue: 2295.00 },
              { name: 'Organic Bananas', sales: 654, revenue: 1962.00 }
            ].map((product, index) => (
              <View key={index} style={styles.productRow}>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productSales}>{product.sales} units</Text>
                </View>
                <Text style={styles.productRevenue}>${product.revenue}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Revenue Distribution</Text>
          <View style={styles.card}>
            {[
              { category: 'Fresh Produce', amount: 15678.50, percentage: 35 },
              { category: 'Dairy Products', amount: 12456.75, percentage: 28 },
              { category: 'Bakery Items', amount: 8934.25, percentage: 20 },
              { category: 'Beverages', amount: 7645.50, percentage: 17 }
            ].map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.category}</Text>
                  <Text style={styles.categoryAmount}>${category.amount}</Text>
                </View>
                <View style={styles.percentageContainer}>
                  <View 
                    style={[
                      styles.percentageBar,
                      { width: `${category.percentage}%` }
                    ]} 
                  />
                  <Text style={styles.percentageText}>{category.percentage}%</Text>
                </View>
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
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  weekText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  weekDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  weekRevenue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  weekOrders: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  productSales: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  productRevenue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  categoryRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  categoryAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageBar: {
    height: 8,
    backgroundColor: '#1E3A8A',
    borderRadius: 4,
    marginRight: 8,
  },
  percentageText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
});