import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Package, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

export default function InventoryLoadUnloadScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Load/Unload Report</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Movement Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <ArrowDownRight size={24} color="#10B981" />
              <Text style={styles.statValue}>1,245</Text>
              <Text style={styles.statLabel}>Total Loads</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <ArrowUpRight size={24} color="#F59E0B" />
              <Text style={styles.statValue}>856</Text>
              <Text style={styles.statLabel}>Total Unloads</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Package size={24} color="#6366F1" />
              <Text style={styles.statValue}>389</Text>
              <Text style={styles.statLabel}>Net Change</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Movements</Text>
          <View style={styles.card}>
            {[
              {
                type: 'load',
                product: 'Organic Apples',
                quantity: 50,
                date: '2024-01-20 14:30',
                reason: 'Regular Stock'
              },
              {
                type: 'unload',
                product: 'Whole Milk',
                quantity: 12,
                date: '2024-01-20 13:15',
                reason: 'Damaged'
              },
              {
                type: 'load',
                product: 'Sourdough Bread',
                quantity: 30,
                date: '2024-01-20 11:45',
                reason: 'Regular Stock'
              }
            ].map((movement, index) => (
              <View key={index} style={styles.movementRow}>
                <View style={styles.movementHeader}>
                  <View style={styles.movementType}>
                    {movement.type === 'load' ? (
                      <ArrowDownRight size={16} color="#10B981" />
                    ) : (
                      <ArrowUpRight size={16} color="#F59E0B" />
                    )}
                    <Text style={[
                      styles.movementTypeText,
                      { color: movement.type === 'load' ? '#10B981' : '#F59E0B' }
                    ]}>
                      {movement.type === 'load' ? 'Load' : 'Unload'}
                    </Text>
                  </View>
                  <Text style={styles.movementDate}>{movement.date}</Text>
                </View>
                <Text style={styles.productName}>{movement.product}</Text>
                <View style={styles.movementDetails}>
                  <Text style={styles.quantity}>
                    {movement.type === 'load' ? '+' : '-'}{movement.quantity} units
                  </Text>
                  <Text style={styles.reason}>{movement.reason}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Products by Movement</Text>
          <View style={styles.card}>
            {[
              { name: 'Organic Apples', loads: 245, unloads: 56 },
              { name: 'Whole Milk', loads: 198, unloads: 45 },
              { name: 'Sourdough Bread', loads: 156, unloads: 34 }
            ].map((product, index) => (
              <View key={index} style={styles.productRow}>
                <Text style={styles.productRowName}>{product.name}</Text>
                <View style={styles.productStats}>
                  <View style={styles.statColumn}>
                    <Text style={styles.statTitle}>Loads</Text>
                    <Text style={[styles.statCount, styles.loadCount]}>
                      +{product.loads}
                    </Text>
                  </View>
                  <View style={styles.statColumn}>
                    <Text style={styles.statTitle}>Unloads</Text>
                    <Text style={[styles.statCount, styles.unloadCount]}>
                      -{product.unloads}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Unload Reasons</Text>
          <View style={styles.card}>
            {[
              { reason: 'Damaged', count: 45, percentage: 35 },
              { reason: 'Expired', count: 32, percentage: 28 },
              { reason: 'Quality Issues', count: 24, percentage: 20 },
              { reason: 'Other', count: 18, percentage: 17 }
            ].map((reason, index) => (
              <View key={index} style={styles.reasonRow}>
                <View style={styles.reasonInfo}>
                  <Text style={styles.reasonName}>{reason.reason}</Text>
                  <Text style={styles.reasonCount}>{reason.count} items</Text>
                </View>
                <View style={styles.percentageContainer}>
                  <View 
                    style={[
                      styles.percentageBar,
                      { width: `${reason.percentage}%` }
                    ]} 
                  />
                  <Text style={styles.percentageText}>{reason.percentage}%</Text>
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
  movementRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  movementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  movementType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movementTypeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: 4,
  },
  movementDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  movementDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  reason: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  productRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  productRowName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  productStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statColumn: {
    alignItems: 'center',
  },
  statTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  statCount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  loadCount: {
    color: '#10B981',
  },
  unloadCount: {
    color: '#F59E0B',
  },
  reasonRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  reasonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reasonName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  reasonCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
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