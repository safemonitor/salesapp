import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ChartBar as BarChart3, TrendingUp, Users, Package, Download, DollarSign, ShoppingCart, TrendingDown, CircleDollarSign, Truck as TruckDelivery } from 'lucide-react-native';

export default function ReportsScreen() {
  const handleReportPress = (reportType: string) => {
    router.push(`/settings/reports/${reportType}`);
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
        <Text style={styles.headerTitle}>Reports</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Reports</Text>
          <View style={styles.statsGrid}>
            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleReportPress('daily-sales')}
            >
              <DollarSign size={24} color="#10B981" />
              <Text style={styles.statValue}>$3,245</Text>
              <Text style={styles.statLabel}>Today's Sales</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+15%</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleReportPress('orders')}
            >
              <ShoppingCart size={24} color="#6366F1" />
              <Text style={styles.statValue}>24</Text>
              <Text style={styles.statLabel}>Orders Today</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.statCard}
              onPress={() => handleReportPress('revenue')}
            >
              <CircleDollarSign size={24} color="#F59E0B" />
              <Text style={styles.statValue}>$12.5k</Text>
              <Text style={styles.statLabel}>Weekly Revenue</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sales Reports</Text>
          <View style={styles.reportGrid}>
            <TouchableOpacity 
              style={styles.reportCard}
              onPress={() => handleReportPress('sales-analysis')}
            >
              <BarChart3 size={24} color="#1E3A8A" />
              <Text style={styles.reportTitle}>Sales Analysis</Text>
              <Text style={styles.reportDescription}>Detailed sales performance metrics and trends</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.reportCard}
              onPress={() => handleReportPress('monthly-overview')}
            >
              <TrendingUp size={24} color="#10B981" />
              <Text style={styles.reportTitle}>Monthly Overview</Text>
              <Text style={styles.reportDescription}>Monthly sales and revenue analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Reports</Text>
          <View style={styles.reportGrid}>
            <TouchableOpacity 
              style={styles.reportCard}
              onPress={() => handleReportPress('client-activity')}
            >
              <Users size={24} color="#6366F1" />
              <Text style={styles.reportTitle}>Client Activity</Text>
              <Text style={styles.reportDescription}>Track client purchases and engagement</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.reportCard}
              onPress={() => handleReportPress('product-performance')}
            >
              <Package size={24} color="#F59E0B" />
              <Text style={styles.reportTitle}>Product Performance</Text>
              <Text style={styles.reportDescription}>Best-selling products and inventory analysis</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Reports</Text>
          <TouchableOpacity 
            style={styles.reportCard}
            onPress={() => handleReportPress('delivery-metrics')}
          >
            <TruckDelivery size={24} color="#8B5CF6" />
            <Text style={styles.reportTitle}>Delivery Metrics</Text>
            <Text style={styles.reportDescription}>Route efficiency and delivery performance</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Export Options</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.exportButton}
              onPress={() => handleReportPress('export-pdf')}
            >
              <Download size={20} color="#1E3A8A" />
              <Text style={styles.exportButtonText}>Export as PDF</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.exportButton}
              onPress={() => handleReportPress('export-excel')}
            >
              <Download size={20} color="#1E3A8A" />
              <Text style={styles.exportButtonText}>Export as Excel</Text>
            </TouchableOpacity>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
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
    alignSelf: 'flex-start',
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
  reportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  reportCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  reportTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
  },
  reportDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
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
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  exportButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E3A8A',
    marginLeft: 12,
  },
});