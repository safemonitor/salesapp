import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Package, Clock, ArrowRight } from 'lucide-react-native';

// Mock delivery data
const DELIVERIES = [
  {
    id: '1',
    client: 'Metro Supermarket',
    address: '123 Market St, San Francisco, CA',
    items: 5,
    status: 'Pending',
    time: '10:00 AM',
  },
  {
    id: '2',
    client: 'Fresh Foods Co-op',
    address: '456 Main Ave, Oakland, CA',
    items: 3,
    status: 'In Progress',
    time: '11:30 AM',
  },
  {
    id: '3',
    client: 'Gourmet Deli',
    address: '789 Central Blvd, Berkeley, CA',
    items: 4,
    status: 'Completed',
    time: '2:00 PM',
  },
];

export default function DeliveriesScreen() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'In Progress': return '#F59E0B';
      case 'Pending': return '#6366F1';
      default: return '#64748B';
    }
  };

  const renderDeliveryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.deliveryCard}
      onPress={() => router.push(`/sales/delivery/${item.id}`)}
    >
      <View style={styles.deliveryHeader}>
        <Text style={styles.clientName}>{item.client}</Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: `${getStatusColor(item.status)}20` }
        ]}>
          <Text style={[
            styles.statusText,
            { color: getStatusColor(item.status) }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>

      <View style={styles.deliveryDetails}>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Package size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.items} items</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.detailText}>Expected: {item.time}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Details</Text>
          <ArrowRight size={16} color="#1E3A8A" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Deliveries</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Total Deliveries</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>7</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
      </View>

      <FlatList
        data={DELIVERIES}
        renderItem={renderDeliveryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.deliveriesList}
      />
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
  statsContainer: {
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
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  deliveriesList: {
    padding: 20,
  },
  deliveryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  deliveryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  deliveryDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 12,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginRight: 4,
  },
});