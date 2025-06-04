import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, FileText, Clock, CircleCheck as CheckCircle, Trash2 } from 'lucide-react-native';

export default function DraftDetailsScreen() {
  const { id } = useLocalSearchParams();

  // Mock draft data
  const draft = {
    id,
    client: 'Metro Supermarket',
    type: 'Order',
    items: [
      { id: '1', name: 'Organic Apples', quantity: 5, price: 2.99, total: 14.95 },
      { id: '2', name: 'Whole Milk', quantity: 3, price: 4.49, total: 13.47 }
    ],
    subtotal: 28.42,
    tax: 2.84,
    total: 31.26,
    updatedAt: '2024-01-20T10:30:00Z'
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Draft Details</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <View style={styles.clientCard}>
            <Text style={styles.clientName}>{draft.client}</Text>
            <View style={styles.statusContainer}>
              <Clock size={16} color="#64748B" />
              <Text style={styles.updatedAt}>
                Last updated: {formatDate(draft.updatedAt)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items</Text>
          {draft.items.map(item => (
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
                ${draft.subtotal.toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax (10%)</Text>
              <Text style={styles.summaryValue}>
                ${draft.tax.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                ${draft.total.toFixed(2)}
              </Text>
            </View>
          </View>
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
          <Text style={styles.deleteButtonText}>Delete Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => {
            // Handle continue editing
            router.push('/sales/new-order');
          }}
        >
          <FileText size={20} color="#FFFFFF" />
          <Text style={styles.continueButtonText}>Continue Editing</Text>
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  clientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  updatedAt: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
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
  continueButton: {
    flex: 2,
    height: 56,
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});