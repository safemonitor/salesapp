import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MapPin, Phone, Mail, Clock, Package, CreditCard, History, ArrowLeft, Navigation, MessageCircle, ShoppingCart, FileText, Truck as TruckDelivery } from 'lucide-react-native';
import { router } from 'expo-router';

export default function ClientDetailsScreen() {
  const { id } = useLocalSearchParams();
  
  // In a real app, fetch client details using the ID
  const client = {
    name: 'Metro Supermarket',
    type: 'Supermarket',
    address: '123 Market St, San Francisco, CA',
    phone: '(415) 555-1234',
    email: 'contact@metrosupermarket.com',
    image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150',
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    stats: {
      totalOrders: 156,
      lastOrder: '2023-12-15',
      creditLimit: 10000,
      currentBalance: 2500
    }
  };

  const openWaze = () => {
    const wazeUrl = `https://waze.com/ul?ll=${client.coordinates.latitude},${client.coordinates.longitude}&navigate=yes`;
    Linking.openURL(wazeUrl);
  };

  const openWhatsApp = () => {
    // Remove non-numeric characters from phone number
    const phoneNumber = client.phone.replace(/\D/g, '');
    const whatsappUrl = `whatsapp://send?phone=1${phoneNumber}`;
    Linking.openURL(whatsappUrl).catch(() => {
      // If WhatsApp is not installed, open web version
      Linking.openURL(`https://wa.me/1${phoneNumber}`);
    });
  };

  const quickActions = [
    {
      icon: ShoppingCart,
      title: 'New Order',
      route: '/sales/new-order',
      color: '#1E3A8A'
    },
    {
      icon: FileText,
      title: 'Van Sales',
      route: '/sales/create-invoice',
      color: '#0D9488'
    },
    {
      icon: CreditCard,
      title: 'Payment',
      route: '/sales/collect-payment',
      color: '#F97316'
    },
    {
      icon: TruckDelivery,
      title: 'Delivery',
      route: '/sales/deliveries',
      color: '#8B5CF6'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Client Details</Text>
      </View>

      <View style={styles.profileSection}>
        <Image source={{ uri: client.image }} style={styles.clientImage} />
        <Text style={styles.clientName}>{client.name}</Text>
        <Text style={styles.clientType}>{client.type}</Text>
      </View>

      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionButton}
            onPress={() => router.push(action.route)}
          >
            <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
              <action.icon size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.actionText}>{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <MapPin size={20} color="#64748B" />
          <Text style={styles.infoText}>{client.address}</Text>
          <TouchableOpacity 
            style={styles.wazeButton}
            onPress={openWaze}
          >
            <Navigation size={16} color="#1E3A8A" />
            <Text style={styles.wazeButtonText}>Navigate</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Phone size={20} color="#64748B" />
          <Text style={styles.infoText}>{client.phone}</Text>
          <TouchableOpacity 
            style={styles.whatsappButton}
            onPress={openWhatsApp}
          >
            <MessageCircle size={16} color="#25D366" />
            <Text style={styles.whatsappButtonText}>WhatsApp</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoRow}>
          <Mail size={20} color="#64748B" />
          <Text style={styles.infoText}>{client.email}</Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Package size={24} color="#1E3A8A" />
          <Text style={styles.statValue}>{client.stats.totalOrders}</Text>
          <Text style={styles.statLabel}>Total Orders</Text>
        </View>
        <View style={styles.statCard}>
          <CreditCard size={24} color="#10B981" />
          <Text style={styles.statValue}>${client.stats.creditLimit}</Text>
          <Text style={styles.statLabel}>Credit Limit</Text>
        </View>
        <View style={styles.statCard}>
          <History size={24} color="#EF4444" />
          <Text style={styles.statValue}>${client.stats.currentBalance}</Text>
          <Text style={styles.statLabel}>Current Balance</Text>
        </View>
      </View>
    </ScrollView>
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
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  clientImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  clientName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 4,
  },
  clientType: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#334155',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
    flex: 1,
  },
  wazeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  wazeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 6,
  },
  whatsappButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCF8C6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  whatsappButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#25D366',
    marginLeft: 6,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    marginBottom: 24,
  },
  statCard: {
    width: '33.33%',
    padding: 8,
    alignItems: 'center',
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
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});