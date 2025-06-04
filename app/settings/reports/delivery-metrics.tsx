import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Truck as TruckDelivery, Clock, MapPin } from 'lucide-react-native';

export default function DeliveryMetricsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Delivery Metrics</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Delivery Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <TruckDelivery size={24} color="#10B981" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Deliveries</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <Clock size={24} color="#6366F1" />
              <Text style={styles.statValue}>98%</Text>
              <Text style={styles.statLabel}>On Time</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <MapPin size={24} color="#F59E0B" />
              <Text style={styles.statValue}>324</Text>
              <Text style={styles.statLabel}>Miles</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Performance</Text>
          <View style={styles.card}>
            {[
              { 
                name: 'Downtown Route',
                deliveries: 45,
                distance: '12.5 mi',
                time: '45 min',
                efficiency: 95
              },
              {
                name: 'East Bay Route',
                deliveries: 38,
                distance: '15.2 mi',
                time: '55 min',
                efficiency: 88
              },
              {
                name: 'South Market Route',
                deliveries: 32,
                distance: '18.7 mi',
                time: '65 min',
                efficiency: 82
              }
            ].map((route, index) => (
              <View key={index} style={styles.routeRow}>
                <View style={styles.routeInfo}>
                  <Text style={styles.routeName}>{route.name}</Text>
                  <View style={styles.routeStats}>
                    <Text style={styles.routeDeliveries}>{route.deliveries} stops</Text>
                    <Text style={styles.routeDistance}>{route.distance}</Text>
                    <Text style={styles.routeTime}>{route.time}</Text>
                  </View>
                </View>
                <View style={styles.efficiencyContainer}>
                  <Text style={styles.efficiencyText}>{route.efficiency}%</Text>
                  <View style={styles.efficiencyBar}>
                    <View 
                      style={[
                        styles.efficiencyFill,
                        { width: `${route.efficiency}%` }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver Performance</Text>
          <View style={styles.card}>
            {[
              {
                name: 'John Smith',
                deliveries: 56,
                rating: 4.8,
                onTime: 98
              },
              {
                name: 'Sarah Johnson',
                deliveries: 48,
                rating: 4.9,
                onTime: 96
              },
              {
                name: 'Mike Wilson',
                deliveries: 42,
                rating: 4.7,
                onTime: 94
              }
            ].map((driver, index) => (
              <View key={index} style={styles.driverRow}>
                <View style={styles.driverInfo}>
                  <Text style={styles.driverName}>{driver.name}</Text>
                  <View style={styles.driverStats}>
                    <Text style={styles.driverDeliveries}>
                      {driver.deliveries} deliveries
                    </Text>
                    <Text style={styles.driverRating}>
                      ★ {driver.rating}
                    </Text>
                  </View>
                </View>
                <View style={styles.onTimeContainer}>
                  <Text style={styles.onTimeText}>{driver.onTime}%</Text>
                  <Text style={styles.onTimeLabel}>On Time</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Issues</Text>
          <View style={styles.card}>
            {[
              {
                issue: 'Late Deliveries',
                count: 12,
                percentage: 2.5,
                trend: 'down'
              },
              {
                issue: 'Wrong Address',
                count: 8,
                percentage: 1.8,
                trend: 'up'
              },
              {
                issue: 'Damaged Items',
                count: 5,
                percentage: 1.2,
                trend: 'down'
              }
            ].map((issue, index) => (
              <View key={index} style={styles.issueRow}>
                <View style={styles.issueInfo}>
                  <Text style={styles.issueName}>{issue.issue}</Text>
                  <Text style={styles.issueCount}>
                    {issue.count} incidents ({issue.percentage}%)
                  </Text>
                </View>
                {issue.trend === 'down' ? (
                  <TrendingDown size={16} color="#10B981" />
                ) : (
                  <TrendingUp size={16} color="#EF4444" />
                )}
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
  routeRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  routeInfo: {
    marginBottom: 8,
  },
  routeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  routeStats: {
    flexDirection: 'row',
    gap: 12,
  },
  routeDeliveries: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  routeDistance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  routeTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  efficiencyContainer: {
    marginTop: 8,
  },
  efficiencyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  efficiencyBar: {
    height: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
  },
  efficiencyFill: {
    height: '100%',
    backgroundColor: '#1E3A8A',
    borderRadius: 2,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  driverStats: {
    flexDirection: 'row',
    gap: 12,
  },
  driverDeliveries: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  driverRating: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F59E0B',
  },
  onTimeContainer: {
    alignItems: 'center',
  },
  onTimeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#10B981',
  },
  onTimeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  issueRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  issueInfo: {
    flex: 1,
  },
  issueName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  issueCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});