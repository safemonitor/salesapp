import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, ShoppingCart, Clock, ArrowRight } from 'lucide-react-native';

// Mock presales data
const PRESALES = [
  {
    id: '1',
    client: 'Metro Supermarket',
    items: 8,
    total: 245.50,
    status: 'Pending',
    createdAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    client: 'Fresh Foods Co-op',
    items: 5,
    total: 178.25,
    status: 'Draft',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    client: 'Gourmet Deli',
    items: 12,
    total: 456.75,
    status: 'Pending',
    createdAt: '2024-01-19T16:45:00Z'
  }
];

export default function PresalesScreen() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return '#6366F1';
      case 'Draft': return '#64748B';
      default: return '#64748B';
    }
  };

  const renderPresaleItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.presaleCard}
      onPress={() => router.push(`/sales/presale/${item.id}`)}
    >
      <View style={styles.cardHeader}>
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

      <View style={styles.cardDetails}>
        <View style={styles.detailRow}>
          <ShoppingCart size={16} color="#64748B" />
          <Text style={styles.detailText}>{item.items} items</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color="#64748B" />
          <Text style={styles.detailText}>{formatDate(item.createdAt)}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalAmount}>
          ${item.total.toFixed(2)}
        </Text>
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
        <Text style={styles.headerTitle}>Presales</Text>
      </View>

      <FlatList
        data={PRESALES}
        renderItem={renderPresaleItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.presalesList}
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
  presalesList: {
    padding: 20,
  },
  presaleCard: {
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
  cardDetails: {
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
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginRight: 4,
  },
});