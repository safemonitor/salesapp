import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Navigation, Clock, Truck as TruckDelivery, CreditCard as Edit, Trash2 } from 'lucide-react-native';

export default function RouteDetailsScreen() {
  const { id } = useLocalSearchParams();

  const openWazeNavigation = (address: string) => {
    // For demo purposes using fixed coordinates, in real app use geocoding
    const coordinates = {
      latitude: 37.7749,
      longitude: -122.4194
    };
    const wazeUrl = `https://waze.com/ul?ll=${coordinates.latitude},${coordinates.longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  // Mock route data
  const route = {
    id,
    name: 'Downtown Route',
    status: 'Active',
    stops: [
      { id: '1', name: 'Metro Supermarket', address: '123 Market St', time: '10:00 AM' },
      { id: '2', name: 'Fresh Foods Co-op', address: '456 Main Ave', time: '10:45 AM' },
      { id: '3', name: 'Gourmet Deli', address: '789 Central Blvd', time: '11:30 AM' }
    ],
    distance: '12.5 mi',
    duration: '45 min',
    driver: 'John Smith'
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
        <Text style={styles.headerTitle}>Route Details</Text>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => {
            // Handle edit
          }}
        >
          <Edit size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeName}>{route.name}</Text>
            <View style={styles.routeStats}>
              <View style={styles.statItem}>
                <MapPin size={16} color="#64748B" />
                <Text style={styles.statText}>{route.stops.length} stops</Text>
              </View>
              <View style={styles.statItem}>
                <Navigation size={16} color="#64748B" />
                <Text style={styles.statText}>{route.distance}</Text>
              </View>
              <View style={styles.statItem}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.statText}>{route.duration}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver</Text>
          <View style={styles.driverCard}>
            <TruckDelivery size={24} color="#1E3A8A" />
            <Text style={styles.driverName}>{route.driver}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stops</Text>
          {route.stops.map((stop, index) => (
            <View key={stop.id} style={styles.stopCard}>
              <View style={styles.stopNumber}>
                <Text style={styles.stopNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{stop.name}</Text>
                <Text style={styles.stopAddress}>{stop.address}</Text>
                <Text style={styles.stopTime}>{stop.time}</Text>
                <TouchableOpacity 
                  style={styles.navigationButton}
                  onPress={() => openWazeNavigation(stop.address)}
                >
                  <Navigation size={16} color="#1E3A8A" />
                  <Text style={styles.navigationButtonText}>Navigate with Waze</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            // Handle delete
            router.back();
          }}
        >
          <Trash2 size={20} color="#EF4444" />
          <Text style={styles.deleteButtonText}>Delete Route</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.assignButton}
          onPress={() => {
            // Handle assign
          }}
        >
          <TruckDelivery size={20} color="#FFFFFF" />
          <Text style={styles.assignButtonText}>Assign Driver</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  routeHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  routeName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 16,
  },
  routeStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  driverCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  stopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stopNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E3A8A',
  },
  stopInfo: {
    flex: 1,
  },
  stopName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  stopAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  stopTime: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    gap: 12,
  },
  deleteButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  assignButton: {
    flex: 2,
    height: 56,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  navigationButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 6,
  },
});