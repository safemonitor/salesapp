import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Calendar, CreditCard, FileText, Send } from 'lucide-react-native';

export default function InvoiceDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock invoice data
  const invoice = {
    id,
    number: 'INV-001',
    client: 'Metro Supermarket',
    status: 'Pending',
    amount: 1250.75,
    dueDate: '2024-01-25',
    items: [
      { id: '1', name: 'Organic Apples', quantity: 50, price: 2.99, total: 149.50 },
      { id: '2', name: 'Whole Milk', quantity: 100, price: 4.49, total: 449.00 },
      { id: '3', name: 'Sourdough Bread', quantity: 75, price: 5.99, total: 449.25 }
    ],
    subtotal: 1047.75,
    tax: 203.00,
    total: 1250.75
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.invoiceHeader}>
            <View>
              <Text style={styles.invoiceNumber}>{invoice.number}</Text>
              <Text style={styles.clientName}>{invoice.client}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: `${getStatusColor(invoice.status)}20` }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(invoice.status) }
              ]}>
                {invoice.status}
              </Text>
            </View>
          </View>

          <View style={styles.dueDate}>
            <Calendar size={16} color="#64748B" />
            <Text style={styles.dueDateText}>
              Due by {formatDate(invoice.dueDate)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {invoice.items.map(item => (
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
                ${invoice.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>
                ${invoice.tax.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${invoice.total.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={() => {
            // Handle download
          }}
        >
          <FileText size={20} color="#1E3A8A" />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.paymentButton}
          onPress={() => router.push('/sales/collect-payment')}
        >
          <CreditCard size={20} color="#FFFFFF" />
          <Text style={styles.paymentButtonText}>Collect Payment</Text>
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
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  invoiceNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
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
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dueDateText: {
    fontFamily: 'Inter-Regular',
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
  downloadButton: {
    flex: 1,
    height: 56,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  paymentButton: {
    flex: 2,
    height: 56,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});