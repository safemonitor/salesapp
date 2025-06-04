import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign } from 'lucide-react-native';

export default function DailySalesReportScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Sales Report</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.statValue}>$3,245</Text>
              <Text style={styles.statLabel}>Total Sales</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+15%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products</Text>
          <View style={styles.card}>
            {[
              { name: 'Organic Apples', sales: 145, revenue: 432.55 },
              { name: 'Whole Milk', sales: 98, revenue: 392.00 },
              { name: 'Sourdough Bread', sales: 76, revenue: 304.00 }
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
          <Text style={styles.sectionTitle}>Hourly Breakdown</Text>
          <View style={styles.card}>
            {[
              { hour: '9:00 AM', sales: 425.50, trend: 'up' },
              { hour: '10:00 AM', sales: 645.75, trend: 'up' },
              { hour: '11:00 AM', sales: 542.25, trend: 'down' },
              { hour: '12:00 PM', sales: 825.50, trend: 'up' }
            ].map((hour, index) => (
              <View key={index} style={styles.hourRow}>
                <Text style={styles.hourText}>{hour.hour}</Text>
                <View style={styles.hourSales}>
                  <Text style={styles.salesAmount}>${hour.sales}</Text>
                  {hour.trend === 'up' ? (
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
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <View style={styles.card}>
            {[
              { method: 'Credit Card', amount: 1845.75, percentage: 56 },
              { method: 'Cash', amount: 945.25, percentage: 29 },
              { method: 'Digital Wallet', amount: 454.00, percentage: 15 }
            ].map((payment, index) => (
              <View key={index} style={styles.paymentRow}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentMethod}>{payment.method}</Text>
                  <Text style={styles.paymentAmount}>${payment.amount}</Text>
                </View>
                <View style={styles.percentageContainer}>
                  <View 
                    style={[
                      styles.percentageBar,
                      { width: `${payment.percentage}%` }
                    ]} 
                  />
                  <Text style={styles.percentageText}>{payment.percentage}%</Text>
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
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
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
  trendText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  trendTextUp: {
    color: '#10B981',
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
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  hourText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  hourSales: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salesAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginRight: 8,
  },
  paymentRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentMethod: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  paymentAmount: {
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