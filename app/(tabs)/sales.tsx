import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ShoppingCart, FileText, Truck as TruckDelivery, CreditCard, Plus } from 'lucide-react-native';

export default function SalesScreen() {
  const quickActions = [
    {
      icon: ShoppingCart,
      title: 'New Presale',
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
      title: 'Collect Payment',
      route: '/sales/collect-payment',
      color: '#F97316'
    },
    {
      icon: TruckDelivery,
      title: 'Deliveries',
      route: '/sales/deliveries',
      color: '#8B5CF6'
    }
  ];

  const sections = [
    {
      title: 'Recent Van Sales',
      route: '/sales/invoices',
      items: [
        {
          id: '1',
          client: 'Metro Supermarket',
          amount: '$456.75',
          status: 'Paid',
          date: '2h ago'
        },
        {
          id: '2',
          client: 'Fresh Foods Co-op',
          amount: '$789.50',
          status: 'Pending',
          date: '4h ago'
        }
      ]
    },
    {
      title: 'Presales',
      route: '/sales/orders',
      items: [
        {
          id: '1',
          client: 'Gourmet Deli',
          amount: '$345.25',
          status: 'Processing',
          date: 'Due in 3d'
        },
        {
          id: '2',
          client: 'Metro Supermarket',
          amount: '$567.80',
          status: 'Pending',
          date: 'Due in 5d'
        }
      ]
    },
    {
      title: 'Saved Drafts',
      route: '/sales/drafts',
      items: [
        {
          id: '1',
          client: 'Fresh Foods Co-op',
          type: 'Van Sale',
          lastUpdated: '1h ago'
        },
        {
          id: '2',
          client: 'Gourmet Deli',
          type: 'Presale',
          lastUpdated: '3h ago'
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#10B981';
      case 'Processing': return '#F59E0B';
      case 'Pending': return '#6366F1';
      default: return '#64748B';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sales</Text>
      </View>

      <ScrollView style={styles.content}>
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

        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <TouchableOpacity onPress={() => router.push(section.route)}>
                <Text style={styles.seeAllLink}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.itemCard}
                  onPress={() => router.push(`${section.route}/${item.id}`)}
                >
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemClient}>{item.client}</Text>
                    {'status' in item && (
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
                    )}
                  </View>

                  <View style={styles.itemDetails}>
                    {'amount' in item && (
                      <Text style={styles.itemAmount}>{item.amount}</Text>
                    )}
                    {'type' in item && (
                      <Text style={styles.itemType}>{item.type}</Text>
                    )}
                    <Text style={styles.itemDate}>
                      {'date' in item ? item.date : item.lastUpdated}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  content: {
    flex: 1,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  actionButton: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#1E293B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  seeAllLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#1E3A8A',
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemCard: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 8,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemClient: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  statusBadge: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 11,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E293B',
  },
  itemType: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#64748B',
  },
  itemDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94A3B8',
  },
});