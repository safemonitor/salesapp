import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { CircleCheck as CheckCircle2, Receipt, Chrome as Home } from 'lucide-react-native';

export default function PaymentSuccessScreen() {
  const params = useLocalSearchParams();
  const isCredit = params.method === 'credit';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <CheckCircle2 size={64} color="#10B981" />
        </View>
        <Text style={styles.title}>
          {isCredit ? 'Added to Balance' : 'Payment Successful!'}
        </Text>
        <Text style={styles.message}>
          {isCredit 
            ? 'The amount has been added to the customer\'s balance.'
            : 'The payment has been processed successfully. A receipt has been sent to the customer\'s email.'
          }
        </Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>
            {isCredit ? 'Amount Added' : 'Amount Paid'}
          </Text>
          <Text style={styles.amount}>$31.26</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.printButton]}
          onPress={() => {
            // Handle receipt printing
          }}
        >
          <Receipt size={20} color="#1E3A8A" />
          <Text style={styles.printButtonText}>Print Receipt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.homeButton]}
          onPress={() => router.replace('/(tabs)')}
        >
          <Home size={20} color="#FFFFFF" />
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  amountContainer: {
    alignItems: 'center',
  },
  amountLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#10B981',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    gap: 12,
  },
  button: {
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  printButton: {
    backgroundColor: '#EFF6FF',
  },
  homeButton: {
    backgroundColor: '#1E3A8A',
  },
  printButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  homeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});