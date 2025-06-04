import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  FlatList 
} from 'react-native';
import { Link } from 'expo-router';
import { TrendingUp, Calendar, CreditCard, Truck as TruckDelivery, Package, ChartBar as BarChart3, Users, MapPin, ShoppingCart } from 'lucide-react-native';

// Mock data
const salesData = [
  { id: '1', title: 'Daily Sales', value: '$3,245', change: '+15%', trend: 'up' },
  { id: '2', title: 'Orders', value: '24', change: '+8%', trend: 'up' },
  { id: '3', title: 'Deliveries', value: '18', change: '-3%', trend: 'down' },
];

const recentClients = [
  { id: '1', name: 'Metro Supermarket', address: '123 Market St', lastOrder: '2 days ago', image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '2', name: 'Fresh Foods', address: '456 Main Ave', lastOrder: '3 days ago', image: 'https://images.pexels.com/photos/1036857/pexels-photo-1036857.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { id: '3', name: 'Gourmet Deli', address: '789 Central Blvd', lastOrder: '5 days ago', image: 'https://images.pexels.com/photos/1200655/pexels-photo-1200655.jpeg?auto=compress&cs=tinysrgb&w=150' },
];

export default function DashboardScreen() {
  const [greeting, setGreeting] = useState('Good morning');
  const userName = 'Alex';
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const QuickAction = ({ icon: Icon, title, color, route }) => (
    <Link href={route} asChild>
      <TouchableOpacity style={styles.quickActionButton}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Icon size={22} color="#FFFFFF" />
        </View>
        <Text style={styles.quickActionText}>{title}</Text>
      </TouchableOpacity>
    </Link>
  );

  const ClientCard = ({ client }) => (
    <Link href={`/clients/${client.id}`} asChild>
      <TouchableOpacity style={styles.clientCard}>
        <Image source={{ uri: client.image }} style={styles.clientImage} />
        <View style={styles.clientInfo}>
          <Text style={styles.clientName}>{client.name}</Text>
          <Text style={styles.clientAddress}>{client.address}</Text>
          <Text style={styles.clientLastOrder}>Last order: {client.lastOrder}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting},</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>

      {/* Stats cards */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={salesData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.statsContainer}
        renderItem={({ item }) => (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>{item.title}</Text>
            <View style={styles.statsValueContainer}>
              <Text style={styles.statsValue}>{item.value}</Text>
              <Text style={[
                styles.statsChange,
                { color: item.trend === 'up' ? '#10B981' : '#EF4444' }
              ]}>
                {item.change}
              </Text>
              <TrendingUp size={16} color={item.trend === 'up' ? '#10B981' : '#EF4444'} />
            </View>
          </View>
        )}
      />

      {/* Quick actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickAction icon={Users} title="New Client" color="#1E3A8A" route="/clients/new" />
          <QuickAction icon={ShoppingCart} title="New Order" color="#0D9488" route="/sales/new-order" />
          <QuickAction icon={CreditCard} title="Collect Payment" color="#F97316" route="/sales/collect-payment" />
          <QuickAction icon={TruckDelivery} title="Deliveries" color="#8B5CF6" route="/sales/deliveries" />
          <QuickAction icon={Package} title="Inventory" color="#EC4899" route="/inventory" />
          <QuickAction icon={BarChart3} title="Reports" color="#14B8A6" route="/settings/reports" />
          <QuickAction icon={Calendar} title="Schedule" color="#F59E0B" route="/settings/schedule" />
          <QuickAction icon={MapPin} title="Routes" color="#6366F1" route="/settings/routes" />
        </View>
      </View>

      {/* Recent clients */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Clients</Text>
          <Link href="/clients" asChild>
            <TouchableOpacity>
              <Text style={styles.seeAllLink}>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        {recentClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginTop: 4,
  },
  date: {
    fontFamily: 'Inter-Medium',
    color: '#64748B',
    fontSize: 14,
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    width: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statsTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  statsValueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  statsValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginRight: 8,
  },
  statsChange: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginRight: 2,
    marginBottom: 4,
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  seeAllLink: {
    fontFamily: 'Inter-Medium',
    color: '#1E3A8A',
    fontSize: 14,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#334155',
    textAlign: 'center',
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  clientImage: {
    width: 50,
    height: 50,
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
  clientAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  clientLastOrder: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
});