import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Scale, Package, TriangleAlert as AlertTriangle } from 'lucide-react-native';

export default function InventoryCountScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Count Report</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Count Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Scale size={24} color="#10B981" />
              <Text style={styles.statValue}>324</Text>
              <Text style={styles.statLabel}>Total Counts</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <AlertTriangle size={24} color="#F59E0B" />
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Discrepancies</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Package size={24} color="#6366F1" />
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>Accuracy</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+2%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Counts</Text>
          <View style={styles.card}>
            {[
              {
                product: 'Organic Apples',
                expected: 150,
                actual: 145,
                date: '2024-01-20 14:30'
              },
              {
                product: 'Whole Milk',
                expected: 100,
                actual: 98,
                date: '2024-01-20 13:15'
              },
              {
                product: 'Sourdough Bread',
                expected: 75,
                actual: 72,
                date: '2024-01-20 11:45'
              }
            ].map((count, index) => (
              <View key={index} style={styles.countRow}>
                <View style={styles.countHeader}>
                  <Text style={styles.productName}>{count.product}</Text>
                  <Text style={styles.countDate}>{count.date}</Text>
                </View>
                <View style={styles.countDetails}>
                  <View style={styles.countColumn}>
                    <Text style={styles.countLabel}>Expected</Text>
                    <Text style={styles.countValue}>{count.expected}</Text>
                  </View>
                  <View style={styles.countColumn}>
                    <Text style={styles.countLabel}>Actual</Text>
                    <Text style={styles.countValue}>{count.actual}</Text>
                  </View>
                  <View style={styles.countColumn}>
                    <Text style={styles.countLabel}>Difference</Text>
                    <Text style={[
                      styles.countValue,
                      { color: count.actual < count.expected ? '#EF4444' : '#10B981' }
                    ]}>
                      {count.actual - count.expected}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Discrepancy Analysis</Text>
          <View style={styles.card}>
            {[
              { range: '0-5 units', count: 25, percentage: 55 },
              { range: '6-10 units', count: 12, percentage: 27 },
              { range: '11-20 units', count: 6, percentage: 13 },
              { range: '20+ units', count: 2, percentage: 5 }
            ].map((range, index) => (
              <View key={index} style={styles.rangeRow}>
                <View style={styles.rangeInfo}>
                  <Text style={styles.rangeName}>{range.range}</Text>
                  <Text style={styles.rangeCount}>{range.count} counts</Text>
                </View>
                <View style={styles.percentageContainer}>
                  <View 
                    style={[
                      styles.percentageBar,
                      { width: `${range.percentage}%` }
                    ]} 
                  />
                  <Text style={styles.percentageText}>{range.percentage}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products Requiring Attention</Text>
          <View style={styles.card}>
            {[
              {
                product: 'Organic Bananas',
                discrepancy: -8,
                frequency: 'High',
                lastCount: '2024-01-19'
              },
              {
                product: 'Fresh Eggs',
                discrepancy: -6,
                frequency: 'Medium',
                lastCount: '2024-01-18'
              },
              {
                product: 'Greek Yogurt',
                discrepancy: -5,
                frequency: 'Low',
                lastCount: '2024-01-17'
              }
            ].map((item, index) => (
              <View key={index} style={styles.attentionRow}>
                <Text style={styles.attentionProduct}>{item.product}</Text>
                <View style={styles.attentionDetails}>
                  <Text style={styles.attentionDiscrepancy}>
                    {item.discrepancy} units
                  </Text>
                  <View style={[
                    styles.frequencyBadge,
                    { backgroundColor: item.frequency === 'High' ? '#FEF2F2' : 
                      item.frequency === 'Medium' ? '#FFFBEB' : '#F0FDF4' }
                  ]}>
                    <Text style={[
                      styles.frequencyText,
                      { color: item.frequency === 'High' ? '#EF4444' :
                        item.frequency === 'Medium' ? '#F59E0B' : '#10B981' }
                    ]}>
                      {item.frequency}
                    </Text>
                  </View>
                </View>
                <Text style={styles.lastCount}>
                  Last count: {item.lastCount}
                </Text>
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
  countRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  countHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  countDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  countDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countColumn: {
    alignItems: 'center',
  },
  countLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  countValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  rangeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  rangeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rangeName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  rangeCount: {
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
  attentionRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  attentionProduct: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  attentionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  attentionDiscrepancy: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
  },
  frequencyBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  frequencyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  lastCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});