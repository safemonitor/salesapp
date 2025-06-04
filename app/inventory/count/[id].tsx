import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Package, TriangleAlert as AlertTriangle } from 'lucide-react-native';
import { useState } from 'react';

export default function InventoryCountScreen() {
  const { id } = useLocalSearchParams();
  const [actualCount, setActualCount] = useState('');

  // Mock product data - in a real app, fetch this based on the ID
  const product = {
    id,
    name: 'Organic Apples',
    category: 'Fruits',
    unit: 'lb',
    stock: 145,
    lastCount: '2024-01-15'
  };

  const calculateDiscrepancy = () => {
    const actual = parseInt(actualCount) || 0;
    const expected = product.stock;
    return actual - expected;
  };

  const getDiscrepancyColor = () => {
    const discrepancy = calculateDiscrepancy();
    if (discrepancy === 0) return '#10B981';
    if (Math.abs(discrepancy) <= 5) return '#F59E0B';
    return '#EF4444';
  };

  const handleSubmit = () => {
    // Handle inventory count submission
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
        <Text style={styles.headerTitle}>Inventory Count</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.productInfo}>
          <Package size={32} color="#1E3A8A" />
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productCategory}>{product.category}</Text>
          <Text style={styles.lastCount}>
            Last counted: {product.lastCount}
          </Text>
        </View>

        <View style={styles.countSection}>
          <View style={styles.expectedCount}>
            <Text style={styles.sectionTitle}>Expected Count</Text>
            <Text style={styles.expectedValue}>
              {product.stock} {product.unit}
            </Text>
          </View>

          <View style={styles.actualCount}>
            <Text style={styles.sectionTitle}>Actual Count</Text>
            <TextInput
              style={styles.countInput}
              value={actualCount}
              onChangeText={setActualCount}
              keyboardType="numeric"
              placeholder="Enter actual count"
              placeholderTextColor="#94A3B8"
            />
            <Text style={styles.unitText}>{product.unit}</Text>
          </View>

          {actualCount !== '' && (
            <View style={styles.discrepancySection}>
              <Text style={styles.sectionTitle}>Discrepancy</Text>
              <View style={styles.discrepancyContainer}>
                <Text style={[
                  styles.discrepancyValue,
                  { color: getDiscrepancyColor() }
                ]}>
                  {calculateDiscrepancy() > 0 ? '+' : ''}
                  {calculateDiscrepancy()} {product.unit}
                </Text>
                {Math.abs(calculateDiscrepancy()) > 5 && (
                  <View style={styles.warningContainer}>
                    <AlertTriangle size={16} color="#EF4444" />
                    <Text style={styles.warningText}>
                      Large discrepancy detected
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.sectionTitle}>Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add a note about any discrepancies..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            !actualCount && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!actualCount}
        >
          <Text style={styles.submitButtonText}>
            Submit Count
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
  lastCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  countSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  expectedCount: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  expectedValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  actualCount: {
    marginBottom: 24,
  },
  countInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    color: '#1E293B',
    fontFamily: 'Inter-Bold',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  unitText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
  },
  discrepancySection: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 20,
  },
  discrepancyContainer: {
    alignItems: 'center',
  },
  discrepancyValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  warningText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginLeft: 8,
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
  submitButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});