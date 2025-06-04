import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Users, ShoppingCart, CreditCard } from 'lucide-react-native';

export default function ClientActivityScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client Activity</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Client Overview</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Users size={24} color="#10B981" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Total Clients</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+12%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <ShoppingCart size={24} color="#6366F1" />
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Active Buyers</Text>
              <View style={[styles.trend, styles.trendUp]}>
                <TrendingUp size={14} color="#10B981" />
                <Text style={[styles.trendText, styles.trendTextUp]}>+8%</Text>
              </View>
            </View>

            <View style={styles.statItem}>
              <CreditCard size={24} color="#F59E0B" />
              <Text style={styles.statValue}>$324</Text>
              <Text style={styles.statLabel}>Avg. Order</Text>
              <View style={[styles.trend, styles.trendDown]}>
                <TrendingDown size={14} color="#EF4444" />
                <Text style={[styles.trendText, styles.trendTextDown]}>-3%</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Most Active Clients</Text>
          <View style={styles.card}>
            {[
              {
                name: 'Metro Supermarket',
                orders: 45,
                spent: 12456.75,
                image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Fresh Foods Co-op',
                orders: 38,
                spent: 9876.50,
                image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=150'
              },
              {
                name: 'Gourmet Deli',
                orders: 32,
                spent: 8765.25,
                image: 'https://images.pexels.com/photos/1200655/pexels-photo-1200655.jpeg?auto=compress&cs=tinysrgb&w=150'
              }
            ].map((client, index) => (
              <View key={index} style={styles.clientRow}>
                <Image source={{ uri: client.image }} style={styles.clientImage} />
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientStats}>
                    {client.orders} orders · ${client.spent}
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
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.card}>
            {[
              {
                action: 'New Order',
                client: 'Metro Supermarket',
                details: '$456.75',
                time: '2 hours ago'
              },
              {
                action: 'Payment Received',
                client: 'Fresh Foods Co-op',
                details: '$789.50',
                time: '4 hours ago'
              },
              {
                action: 'Delivery Complete',
                client: 'Gourmet Deli',
                details: '12 items',
                time: '6 hours ago'
              }
            ].map((activity, index) => (
              <View key={index} style={styles.activityRow}>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityAction}>{activity.action}</Text>
                  <Text style={styles.activityClient}>{activity.client}</Text>
                  <Text style={styles.activityDetails}>{activity.details}</Text>
                </View>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Client Categories</Text>
          <View style={styles.card}>
            {[
              { category: 'Supermarkets', count: 45, percentage: 35 },
              { category: 'Restaurants', count: 32, percentage: 28 },
              { category: 'Convenience Stores', count: 24, percentage: 20 },
              { category: 'Specialty Shops', count: 18, percentage: 17 }
            ].map((category, index) => (
              <View key={index} style={styles.categoryRow}>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.category}</Text>
                  <Text style={styles.categoryCount}>{category.count} clients</Text>
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
  clientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  clientImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  clientStats: {
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
  activityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  activityInfo: {
    flex: 1,
  },
  activityAction: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  activityClient: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 2,
  },
  activityDetails: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 12,
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
  categoryCount: {
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