import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Package, Clock, Phone, Mail, CircleCheck as CheckCircle, Navigation } from 'lucide-react-native';

export default function DeliveryDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock delivery data
  const delivery = {
    id,
    client: {
      name: 'Metro Supermarket',
      address: '123 Market St, San Francisco, CA',
      phone: '(415) 555-1234',
      email: 'contact@metrosupermarket.com',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    status: 'In Progress',
    time: '10:00 AM',
    items: [
      { id: '1', name: 'Organic Apples', quantity: 5, unit: 'lb' },
      { id: '2', name: 'Whole Milk', quantity: 3, unit: 'gal' },
      { id: '3', name: 'Sourdough Bread', quantity: 10, unit: 'loaf' }
    ],
    driver: {
      name: 'John Smith',
      phone: '(415) 555-5678'
    }
  };

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
        <Text style={styles.headerTitle}>Delivery Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.clientSection}>
          <Image source={{ uri: delivery.client.image }} style={styles.clientImage} />
          <View style={styles.clientInfo}>
            <Text style={styles.clientName}>{delivery.client.name}</Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(delivery.status)}20` }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(delivery.status) }
              ]}>
                {delivery.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <MapPin size={20} color="#64748B" />
              <Text style={styles.infoText}>{delivery.client.address}</Text>
            </View>
            <View style={styles.infoRow}>
              <Clock size={20} color="#64748B" />
              <Text style={styles.infoText}>Expected: {delivery.time}</Text>
            </View>
            <View style={styles.infoRow}>
              <Phone size={20} color="#64748B" />
              <Text style={styles.infoText}>{delivery.client.phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Mail size={20} color="#64748B" />
              <Text style={styles.infoText}>{delivery.client.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          <View style={styles.card}>
            {delivery.items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Package size={20} color="#64748B" />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemQuantity}>
                    {item.quantity} {item.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Driver</Text>
          <View style={styles.card}>
            <View style={styles.infoRow}>
              <Text style={styles.driverName}>{delivery.driver.name}</Text>
              <TouchableOpacity style={styles.callButton}>
                <Phone size={16} color="#1E3A8A" />
                <Text style={styles.callButtonText}>Call Driver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.routeButton]}
          onPress={() => router.push('/sales/delivery/route')}
        >
          <Navigation size={20} color="#1E3A8A" />
          <Text style={styles.routeButtonText}>View Route</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.completeButton]}
          onPress={() => {
            // Handle delivery completion
            router.back();
          }}
        >
          <CheckCircle size={20} color="#FFFFFF" />
          <Text style={styles.completeButtonText}>Mark as Completed</Text>
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
  content: {
    flex: 1,
  },
  clientSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  clientImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
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
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
    flex: 1,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  driverName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  callButtonText: {
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
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  routeButton: {
    backgroundColor: '#EFF6FF',
  },
  completeButton: {
    backgroundColor: '#1E3A8A',
  },
  routeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  completeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});