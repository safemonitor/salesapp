import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Calendar, CreditCard, ArrowRight } from 'lucide-react-native';

// Mock invoices data
const INVOICES = [
  {
    id: '1',
    client: 'Metro Supermarket',
    amount: 1250.75,
    status: 'Paid',
    dueDate: '2024-01-25',
    paidDate: '2024-01-20'
  },
  {
    id: '2',
    client: 'Fresh Foods Co-op',
    amount: 785.30,
    status: 'Pending',
    dueDate: '2024-01-30'
  },
  {
    id: '3',
    client: 'Gourmet Deli',
    amount: 450.00,
    status: 'Overdue',
    dueDate: '2024-01-15'
  }
];

export default function InvoicesScreen() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#10B981';
      case 'Pending': return '#F59E0B';
      case 'Overdue': return '#EF4444';
      default: return '#64748B';
    }
  };

  const renderInvoiceItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.invoiceCard}
      onPress={() => router.push(`/sales/invoice/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.clientName}>{item.client}</Text>
          <Text style={styles.invoiceId}>INV-{item.id}</Text>
        </View>
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
          <Calendar size={16} color="#64748B" />
          <Text style={styles.detailText}>
            Due: {formatDate(item.dueDate)}
          </Text>
        </View>
        {item.paidDate && (
          <View style={styles.detailRow}>
            <CreditCard size={16} color="#64748B" />
            <Text style={styles.detailText}>
              Paid: {formatDate(item.paidDate)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.amount}>
          ${item.amount.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Invoice</Text>
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
        <Text style={styles.headerTitle}>Invoices</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>$2,486.05</Text>
          <Text style={styles.statLabel}>Total Outstanding</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>5</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2</Text>
          <Text style={styles.statLabel}>Overdue</Text>
        </View>
      </View>

      <FlatList
        data={INVOICES}
        renderItem={renderInvoiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.invoicesList}
      />

      <TouchableOpacity 
        style={styles.createButton}
        onPress={() => router.push('/sales/create-invoice')}
      >
        <FileText size={20} color="#FFFFFF" />
        <Text style={styles.createButtonText}>Create Invoice</Text>
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
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  invoicesList: {
    padding: 20,
    paddingBottom: 100, // Extra padding for the create button
  },
  invoiceCard: {
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
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  invoiceId: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
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
  amount: {
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
  createButton: {
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
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});