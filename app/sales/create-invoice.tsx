import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Search, Plus, Minus, FileText, Send, Printer } from 'lucide-react-native';

export default function VanSalesScreen() {
  // Mock products data - in a real app, fetch from van inventory
  const products = [
    {
      id: '1',
      name: 'Organic Apples',
      category: 'Fruits',
      price: 2.99,
      unit: 'lb',
      stock: 145,
      image: 'https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: '2',
      name: 'Whole Milk',
      category: 'Dairy',
      price: 4.49,
      unit: 'gal',
      stock: 78,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const handlePrint = () => {
    // Handle printing invoice
  };

  const handleComplete = () => {
    // Navigate to payment screen with invoice details
    router.push({
      pathname: '/sales/collect-payment',
      params: {
        amount: 31.26,
        type: 'van-sale'
      }
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
        <Text style={styles.headerTitle}>Van Sales</Text>
      </View>

      <View style={styles.clientSection}>
        <Text style={styles.sectionTitle}>Client</Text>
        <TouchableOpacity 
          style={styles.clientSelector}
          onPress={() => router.push('/clients')}
        >
          <Text style={styles.clientSelectorText}>Select Client</Text>
          <Plus size={20} color="#1E3A8A" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#94A3B8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search van inventory..."
          placeholderTextColor="#94A3B8"
        />
      </View>

      <ScrollView style={styles.content}>
        {products.map(product => (
          <View key={product.id} style={styles.productCard}>
            <Image source={{ uri: product.image }} style={styles.productImage} />
            
            <View style={styles.productInfo}>
              <View style={styles.productHeader}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>${product.price}/{product.unit}</Text>
              </View>

              <Text style={styles.productCategory}>{product.category}</Text>
              <Text style={styles.stockInfo}>In van: {product.stock} {product.unit}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton}>
                  <Minus size={16} color="#64748B" />
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  keyboardType="numeric"
                  defaultValue="0"
                />
                <TouchableOpacity style={styles.quantityButton}>
                  <Plus size={16} color="#64748B" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$28.42</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (10%)</Text>
            <Text style={styles.summaryValue}>$2.84</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>$31.26</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.button, styles.printButton]}
            onPress={handlePrint}
          >
            <Printer size={20} color="#1E3A8A" />
            <Text style={styles.printButtonText}>Print</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, styles.previewButton]}
            onPress={() => {
              // Handle invoice preview
            }}
          >
            <FileText size={20} color="#1E3A8A" />
            <Text style={styles.previewButtonText}>Preview</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.completeButton]}
            onPress={handleComplete}
          >
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.completeButtonText}>Complete Sale</Text>
          </TouchableOpacity>
        </View>
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
  clientSection: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  clientSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  clientSelectorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E3A8A',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-Regular',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    flex: 1,
    marginRight: 8,
  },
  productPrice: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  stockInfo: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    width: 48,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginHorizontal: 12,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  summarySection: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E293B',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    height: 48,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  printButton: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  previewButton: {
    flex: 1,
    backgroundColor: '#EFF6FF',
  },
  completeButton: {
    flex: 2,
    backgroundColor: '#1E3A8A',
  },
  printButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  previewButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  completeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  }
});