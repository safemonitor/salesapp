import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Package, Plus, Minus } from 'lucide-react-native';
import { useState } from 'react';

export default function LoadInventoryScreen() {
  const { id } = useLocalSearchParams();
  const [quantity, setQuantity] = useState('0');

  // Mock product data - in a real app, fetch this based on the ID
  const product = {
    id,
    name: 'Organic Apples',
    category: 'Fruits',
    unit: 'lb',
    stock: 145
  };

  const incrementQuantity = () => {
    setQuantity((parseInt(quantity) + 1).toString());
  };

  const decrementQuantity = () => {
    if (parseInt(quantity) > 0) {
      setQuantity((parseInt(quantity) - 1).toString());
    }
  };

  const handleLoad = () => {
    // Handle loading inventory
    // In a real app, make an API call to update the stock
    router.back();
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
        <Text style={styles.headerTitle}>Load Inventory</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.productInfo}>
          <Package size={32} color="#1E3A8A" />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.currentStock}>
            Current Stock: {product.stock} {product.unit}
          </Text>
        </View>

        <View style={styles.quantitySection}>
          <Text style={styles.sectionTitle}>Load Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={decrementQuantity}
            >
              <Minus size={24} color="#64748B" />
            </TouchableOpacity>
            
            <TextInput
              style={styles.quantityInput}
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
            />
            
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={incrementQuantity}
            >
              <Plus size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.unitText}>{product.unit}</Text>
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.sectionTitle}>Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a note about this load..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.loadButton}
          onPress={handleLoad}
        >
          <Text style={styles.loadButtonText}>
            Load {quantity} {product.unit}
          </Text>
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
    padding: 20,
  },
  productInfo: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1E293B',
    marginTop: 12,
    marginBottom: 4,
  },
  productCategory: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  currentStock: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 8,
  },
  quantitySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  quantityButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
  },
  quantityInput: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginHorizontal: 16,
  },
  unitText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
  noteSection: {
    marginBottom: 24,
  },
  noteInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    height: 120,
    textAlignVertical: 'top',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  loadButton: {
    backgroundColor: '#10B981',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});