import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Navigation, Clock, CircleCheck as CheckCircle } from 'lucide-react-native';

// Mock route data
const ROUTE_STOPS = [
  {
    id: '1',
    client: 'Metro Supermarket',
    address: '123 Market St, San Francisco, CA',
    time: '10:00 AM',
    status: 'Completed'
  },
  {
    id: '2',
    client: 'Fresh Foods Co-op',
    address: '456 Main Ave, Oakland, CA',
    time: '11:30 AM',
    status: 'In Progress'
  },
  {
    id: '3',
    client: 'Gourmet Deli',
    address: '789 Central Blvd, Berkeley, CA',
    time: '2:00 PM',
    status: 'Pending'
  }
];

export default function RouteScreen() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'In Progress': return '#F59E0B';
      case 'Pending': return '#6366F1';
      default: return '#64748B';
    }
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
        <Text style={styles.headerTitle}>Delivery Route</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>3</Text>
          <Text style={styles.statLabel}>Total Stops</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>12.5</Text>
          <Text style={styles.statLabel}>Miles</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.routeContainer}>
          {ROUTE_STOPS.map((stop, index) => (
            <View key={stop.id} style={styles.stopContainer}>
              <View style={styles.timeline}>
                <View style={[
                  styles.timelineDot,
                  { backgroundColor: getStatusColor(stop.status) }
                ]} />
                {index < ROUTE_STOPS.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>
              
              <View style={styles.stopCard}>
                <View style={styles.stopHeader}>
                  <Text style={styles.clientName}>{stop.client}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: `${getStatusColor(stop.status)}20` }
                  ]}>
                    <Text style={[
                      styles.statusText,
                      { color: getStatusColor(stop.status) }
                    ]}>
                      {stop.status}
                    </Text>
                  </View>
                </View>

                <View style={styles.stopDetails}>
                  <View style={styles.detailRow}>
                    <MapPin size={16} color="#64748B" />
                    <Text style={styles.detailText}>{stop.address}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Clock size={16} color="#64748B" />
                    <Text style={styles.detailText}>Expected: {stop.time}</Text>
                  </View>
                </View>

                <TouchableOpacity 
                  style={styles.navigationButton}
                  onPress={() => {
                    // Handle navigation
                  }}
                >
                  <Navigation size={16} color="#1E3A8A" />
                  <Text style={styles.navigationButtonText}>Navigate</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={() => {
            // Handle route start
          }}
        >
          <CheckCircle size={20} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Start Route</Text>
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
  content: {
    flex: 1,
  },
  routeContainer: {
    paddingHorizontal: 20,
  },
  stopContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timeline: {
    width: 24,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 24,
  },
  timelineLine: {
    width: 2,
    height: '100%',
    backgroundColor: '#E2E8F0',
    marginTop: 4,
  },
  stopCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stopHeader: {
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
  stopDetails: {
    marginBottom: 12,
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
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navigationButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 6,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  startButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});