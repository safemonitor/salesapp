import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Navigation, Clock, Truck as TruckDelivery, Plus } from 'lucide-react-native';

// Mock routes data
const ROUTES = [
  {
    id: '1',
    name: 'Downtown Route',
    stops: 8,
    distance: '12.5 mi',
    duration: '45 min',
    status: 'Active'
  },
  {
    id: '2',
    name: 'East Bay Route',
    stops: 6,
    distance: '15.2 mi',
    duration: '55 min',
    status: 'Inactive'
  },
  {
    id: '3',
    name: 'South Market Route',
    stops: 10,
    distance: '18.7 mi',
    duration: '1h 10min',
    status: 'Active'
  }
];

export default function RoutesScreen() {
  const getStatusColor = (status: string) => {
    return status === 'Active' ? '#10B981' : '#64748B';
  };

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => router.push(`/settings/routes/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
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

      <View style={styles.routeDetails}>
        <View style={styles.detailRow}>
          <MapPin size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.stops} stops</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Navigation size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.distance}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.duration}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View Details</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Delivery Routes</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <TruckDelivery size={24} color="#1E3A8A" />
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Total Routes</Text>
        </View>
        <View style={styles.statCard}>
          <MapPin size={24} color="#10B981" />
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Total Stops</Text>
        </View>
        <View style={styles.statCard}>
          <Navigation size={24} color="#F59E0B" />
          <Text style={styles.statValue}>324.5</Text>
          <Text style={styles.statLabel}>Total Miles</Text>
        </View>
      </View>

      <FlatList
        data={ROUTES}
        renderItem={renderRouteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.routesList}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/settings/routes/new')}
      >
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Create New Route</Text>
      </TouchableOpacity>
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
  routesList: {
    padding: 20,
    paddingBottom: 100,
  },
  routeCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeName: {
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
  routeDetails: {
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
  viewButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});