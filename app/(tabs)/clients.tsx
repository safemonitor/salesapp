import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Search, Plus, MapPin, Navigation, MessageCircle, ShoppingCart, FileText, Truck as TruckDelivery, CreditCard, ChevronDown, ChevronUp } from 'lucide-react-native';
import SearchBar from '@/components/SearchBar';

export default function ClientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [expandedClients, setExpandedClients] = useState<string[]>([]);

  const filters = [
    { id: 'supermarket', label: 'Supermarket' },
    { id: 'restaurant', label: 'Restaurant' },
    { id: 'convenience', label: 'Convenience Store' }
  ];

  // Mock next client data based on route
  const nextClient = {
    id: '1',
    name: 'Metro Supermarket',
    address: '123 Market St, San Francisco, CA',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150',
    route: 'Downtown Route',
    expectedTime: '10:00 AM',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    phone: '(415) 555-1234'
  };

  // Mock clients list
  const clients = [
    {
      id: '1',
      name: 'Metro Supermarket',
      type: 'Supermarket',
      address: '123 Market St, San Francisco, CA',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150',
      phone: '(415) 555-1234',
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    {
      id: '2',
      name: 'Fresh Foods Co-op',
      type: 'Supermarket',
      address: '456 Main Ave, San Francisco, CA',
      image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=150',
      phone: '(415) 555-5678',
      coordinates: {
        latitude: 37.7833,
        longitude: -122.4167
      }
    }
  ];

  const openWaze = (coordinates: { latitude: number; longitude: number }) => {
    const wazeUrl = `https://waze.com/ul?ll=${coordinates.latitude},${coordinates.longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  const openWhatsApp = (phone: string) => {
    // Remove non-numeric characters from phone number
    const phoneNumber = phone.replace(/\D/g, '');
    const whatsappUrl = `whatsapp://send?phone=1${phoneNumber}`;
    Linking.openURL(whatsappUrl).catch(() => {
      // If WhatsApp is not installed, open web version
      Linking.openURL(`https://wa.me/1${phoneNumber}`);
    });
  };

  const handleCheckIn = (clientId: string) => {
    // Navigate to client profile with check-in status
    router.push({
      pathname: `/clients/${clientId}`,
      params: { checkedIn: 'true' }
    });
  };

  const handleQuickAction = (action: string, clientId: string) => {
    switch (action) {
      case 'order':
        router.push({
          pathname: '/sales/new-order',
          params: { clientId }
        });
        break;
      case 'van-sale':
        router.push({
          pathname: '/sales/create-invoice',
          params: { clientId }
        });
        break;
      case 'payment':
        router.push({
          pathname: '/sales/collect-payment',
          params: { clientId }
        });
        break;
      case 'delivery':
        router.push({
          pathname: '/sales/deliveries',
          params: { clientId }
        });
        break;
    }
  };

  const toggleClientActions = (clientId: string) => {
    setExpandedClients(prev => 
      prev.includes(clientId)
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clients</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/clients/new')}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <SearchBar
        placeholder="Search clients..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={setSelectedFilters}
      />

      <ScrollView style={styles.content}>
        {/* Next Client Card */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Next Client</Text>
          <View style={styles.nextClientCard}>
            <Image source={{ uri: nextClient.image }} style={styles.nextClientImage} />
            <View style={styles.nextClientInfo}>
              <Text style={styles.nextClientName}>{nextClient.name}</Text>
              <Text style={styles.nextClientRoute}>{nextClient.route}</Text>
              <Text style={styles.nextClientTime}>Expected: {nextClient.expectedTime}</Text>
              
              <View style={styles.nextClientActions}>
                <TouchableOpacity 
                  style={styles.navigationButton}
                  onPress={() => openWaze(nextClient.coordinates)}
                >
                  <Navigation size={16} color="#1E3A8A" />
                  <Text style={styles.navigationButtonText}>Navigate</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.checkInButton}
                  onPress={() => handleCheckIn(nextClient.id)}
                >
                  <Text style={styles.checkInButtonText}>Check In</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.quickActions}>
                <TouchableOpacity 
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction('order', nextClient.id)}
                >
                  <ShoppingCart size={16} color="#1E3A8A" />
                  <Text style={styles.quickActionText}>Order</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction('van-sale', nextClient.id)}
                >
                  <FileText size={16} color="#1E3A8A" />
                  <Text style={styles.quickActionText}>Van Sale</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction('payment', nextClient.id)}
                >
                  <CreditCard size={16} color="#1E3A8A" />
                  <Text style={styles.quickActionText}>Payment</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.quickActionButton}
                  onPress={() => handleQuickAction('delivery', nextClient.id)}
                >
                  <TruckDelivery size={16} color="#1E3A8A" />
                  <Text style={styles.quickActionText}>Delivery</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Clients List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Clients</Text>
          {clients.map(client => (
            <View key={client.id} style={styles.clientCard}>
              <TouchableOpacity 
                style={styles.clientHeader}
                onPress={() => router.push(`/clients/${client.id}`)}
              >
                <Image source={{ uri: client.image }} style={styles.clientImage} />
                <View style={styles.clientInfo}>
                  <Text style={styles.clientName}>{client.name}</Text>
                  <Text style={styles.clientType}>{client.type}</Text>
                  <Text style={styles.clientAddress}>{client.address}</Text>
                </View>
              </TouchableOpacity>

              <View style={styles.clientActions}>
                <View style={styles.contactButtons}>
                  <TouchableOpacity 
                    style={styles.wazeButton}
                    onPress={() => openWaze(client.coordinates)}
                  >
                    <Navigation size={16} color="#1E3A8A" />
                    <Text style={styles.wazeButtonText}>Waze</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.whatsappButton}
                    onPress={() => openWhatsApp(client.phone)}
                  >
                    <MessageCircle size={16} color="#25D366" />
                    <Text style={styles.whatsappButtonText}>WhatsApp</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.expandButton}
                    onPress={() => toggleClientActions(client.id)}
                  >
                    {expandedClients.includes(client.id) ? (
                      <ChevronUp size={20} color="#64748B" />
                    ) : (
                      <ChevronDown size={20} color="#64748B" />
                    )}
                  </TouchableOpacity>
                </View>

                {expandedClients.includes(client.id) && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity 
                      style={styles.quickActionButton}
                      onPress={() => handleQuickAction('order', client.id)}
                    >
                      <ShoppingCart size={16} color="#1E3A8A" />
                      <Text style={styles.quickActionText}>Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.quickActionButton}
                      onPress={() => handleQuickAction('van-sale', client.id)}
                    >
                      <FileText size={16} color="#1E3A8A" />
                      <Text style={styles.quickActionText}>Van Sale</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.quickActionButton}
                      onPress={() => handleQuickAction('payment', client.id)}
                    >
                      <CreditCard size={16} color="#1E3A8A" />
                      <Text style={styles.quickActionText}>Payment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={styles.quickActionButton}
                      onPress={() => handleQuickAction('delivery', client.id)}
                    >
                      <TruckDelivery size={16} color="#1E3A8A" />
                      <Text style={styles.quickActionText}>Delivery</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
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
  nextClientCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nextClientImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  nextClientInfo: {
    flex: 1,
  },
  nextClientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  nextClientRoute: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  nextClientTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  nextClientActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  navigationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  navigationButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E3A8A',
    marginLeft: 4,
  },
  checkInButton: {
    flex: 1,
    backgroundColor: '#1E3A8A',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  checkInButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  clientHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  clientImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
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
  clientType: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  clientAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  clientActions: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: 12,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 6,
  },
  wazeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  wazeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E3A8A',
    marginLeft: 4,
  },
  whatsappButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DCF8C6',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  whatsappButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#25D366',
    marginLeft: 4,
  },
  expandButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  quickActionButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E3A8A',
    marginLeft: 4,
  },
});