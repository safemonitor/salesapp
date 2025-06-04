import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, CreditCard, Receipt, DollarSign, CreditCard as Credit } from 'lucide-react-native';

export default function CollectPaymentScreen() {
  const params = useLocalSearchParams();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'credit'>('card');
  
  const amount = params.amount ? parseFloat(params.amount as string) : 31.26;
  const type = params.type || 'van-sale';

  const handlePayment = () => {
    if (paymentMethod === 'credit') {
      // Add to client's balance
      router.push('/sales/payment-success?method=credit');
    } else {
      // Process payment
      router.push('/sales/payment-success');
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
        <Text style={styles.headerTitle}>Collect Payment</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.card}>
            <View style={styles.amountContainer}>
              <Text style={styles.amountLabel}>Amount Due</Text>
              <Text style={styles.amountValue}>${amount.toFixed(2)}</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Payment Method</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity 
                  style={[
                    styles.methodButton,
                    paymentMethod === 'card' && styles.activeMethodButton
                  ]}
                  onPress={() => setPaymentMethod('card')}
                >
                  <CreditCard size={20} color={paymentMethod === 'card' ? "#1E3A8A" : "#64748B"} />
                  <Text style={[
                    styles.methodText,
                    paymentMethod === 'card' && styles.activeMethodText
                  ]}>Card</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.methodButton,
                    paymentMethod === 'cash' && styles.activeMethodButton
                  ]}
                  onPress={() => setPaymentMethod('cash')}
                >
                  <DollarSign size={20} color={paymentMethod === 'cash' ? "#1E3A8A" : "#64748B"} />
                  <Text style={[
                    styles.methodText,
                    paymentMethod === 'cash' && styles.activeMethodText
                  ]}>Cash</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.methodButton,
                    paymentMethod === 'credit' && styles.activeMethodButton
                  ]}
                  onPress={() => setPaymentMethod('credit')}
                >
                  <Credit size={20} color={paymentMethod === 'credit' ? "#1E3A8A" : "#64748B"} />
                  <Text style={[
                    styles.methodText,
                    paymentMethod === 'credit' && styles.activeMethodText
                  ]}>Credit</Text>
                </TouchableOpacity>
              </View>
            </View>

            {paymentMethod === 'card' && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Card Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter card number"
                    placeholderTextColor="#94A3B8"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.row}>
                  <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
                    <Text style={styles.label}>Expiry Date</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="MM/YY"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.label}>CVV</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="123"
                      placeholderTextColor="#94A3B8"
                      keyboardType="numeric"
                      secureTextEntry
                    />
                  </View>
                </View>
              </>
            )}

            {paymentMethod === 'cash' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Amount Received</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter amount"
                  placeholderTextColor="#94A3B8"
                  keyboardType="numeric"
                />
              </View>
            )}

            {paymentMethod === 'credit' && (
              <View style={styles.creditInfo}>
                <Text style={styles.creditText}>
                  This amount will be added to the client's balance.
                </Text>
                <Text style={styles.creditWarning}>
                  Make sure the client has sufficient credit limit.
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receipt Options</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.optionButton}>
              <Receipt size={20} color="#1E293B" />
              <Text style={styles.optionText}>Email Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.optionButton, { marginBottom: 0 }]}>
              <Receipt size={20} color="#1E293B" />
              <Text style={styles.optionText}>Print Receipt</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.processButton}
          onPress={handlePayment}
        >
          <Text style={styles.processButtonText}>
            {paymentMethod === 'credit' ? 'Add to Balance' : 'Process Payment'}
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  amountLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  amountValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontFamily: 'Inter-Regular',
  },
  row: {
    flexDirection: 'row',
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  activeMethodButton: {
    backgroundColor: '#EFF6FF',
    borderColor: '#1E3A8A',
  },
  methodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
  },
  activeMethodText: {
    color: '#1E3A8A',
  },
  creditInfo: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  creditText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 8,
  },
  creditWarning: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#F59E0B',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  processButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});