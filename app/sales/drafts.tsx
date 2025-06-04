import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, FileText, Clock, ArrowRight, Trash2 } from 'lucide-react-native';

// Mock drafts data
const DRAFTS = [
  {
    id: '1',
    client: 'Metro Supermarket',
    type: 'Order',
    items: 6,
    total: 185.50,
    updatedAt: '2024-01-20T10:30:00Z'
  },
  {
    id: '2',
    client: 'Fresh Foods Co-op',
    type: 'Invoice',
    items: 4,
    total: 142.75,
    updatedAt: '2024-01-20T09:15:00Z'
  },
  {
    id: '3',
    client: 'Gourmet Deli',
    type: 'Order',
    items: 8,
    total: 276.25,
    updatedAt: '2024-01-19T16:45:00Z'
  }
];

export default function DraftsScreen() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  const handleDelete = (id: string) => {
    // Handle draft deletion
    console.log('Delete draft:', id);
  };

  const renderDraftItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.draftCard}
      onPress={() => router.push(`/sales/draft/${item.id}`)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.clientName}>{item.client}</Text>
          <View style={styles.typeBadge}>
            <FileText size={12} color="#64748B" />
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardDetails}>
        <Text style={styles.itemCount}>{item.items} items</Text>
        <View style={styles.timeContainer}>
          <Clock size={14} color="#64748B" />
          <Text style={styles.timeText}>
            Last updated: {formatDate(item.updatedAt)}
          </Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.totalAmount}>
          ${item.total.toFixed(2)}
        </Text>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue Editing</Text>
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
        <Text style={styles.headerTitle}>Drafts</Text>
      </View>

      <FlatList
        data={DRAFTS}
        renderItem={renderDraftItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.draftsList}
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
  draftsList: {
    padding: 20,
  },
  draftCard: {
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
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 4,
  },
  deleteButton: {
    padding: 8,
  },
  cardDetails: {
    marginBottom: 12,
  },
  itemCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#64748B',
    marginLeft: 6,
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
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginRight: 4,
  },
});