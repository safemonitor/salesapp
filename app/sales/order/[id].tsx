import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Package, CreditCard, FileText, Truck as TruckDelivery } from 'lucide-react-native';

export default function OrderDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock order data
  const order = {
    id,
    client: 'Metro Supermarket',
    status: 'Pending',
    items: [
      { id: '1', name: 'Organic Apples', quantity: 5, price: 2.99, total: 14.95 },
      { id: '2', name: 'Whole Milk', quantity: 3, price: 4.49, total: 13.47 },
      { id: '3', name: 'Sourdough Bread', quantity: 4, price: 5.99, total: 23.96 }
    ],
    subtotal: 52.38,
    tax: 5.24,
    total: 57.62,
    createdAt: '2024-01-20T10:30:00Z'
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return '#10B981';
      case 'Processing': return '#F59E0B';
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
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>Order #{id}</Text>
              <Text style={styles.clientName}>{order.client}</Text>
              <Text style={styles.orderDate}>
                {formatDate(order.createdAt)}
              </Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(order.status)}20` }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(order.status) }
              ]}>
                {order.status}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {order.items.map(item => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>
                  {item.quantity} × ${item.price.toFixed(2)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>
                ${item.total.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                ${order.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%)</Text>
              <Text style={styles.summaryValue}>
                ${order.tax.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${order.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/sales/create-invoice')}
        >
          <FileText size={20} color="#1E3A8A" />
          <Text style={styles.actionButtonText}>Create Invoice</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/sales/collect-payment')}
        >
          <CreditCard size={20} color="#1E3A8A" />
          <Text style={styles.actionButtonText}>Collect Payment</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.primaryButton]}
          onPress={() => router.push('/sales/deliveries')}
        >
          <TruckDelivery size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Schedule Delivery</Text>
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  orderHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  orderDate: {
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  itemQuantity: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  itemTotal: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 0,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: '#1E293B',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#1E3A8A',
    flex: 1.5,
  },
  primaryButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});