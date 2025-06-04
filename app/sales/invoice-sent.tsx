import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Send, FileText, Chrome as Home } from 'lucide-react-native';

export default function InvoiceSentScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Send size={64} color="#1E3A8A" />
        </View>
        <Text style={styles.title}>Invoice Sent!</Text>
        <Text style={styles.message}>
          The invoice has been sent to the customer's email address. They will be notified to complete the payment.
        </Text>
        
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Invoice Amount</Text>
          <Text style={styles.amount}>$31.26</Text>
          <Text style={styles.dueDate}>Due by Jan 30, 2024</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.button, styles.downloadButton]}
          onPress={() => {
            // Handle invoice download
          }}
        >
          <FileText size={20} color="#1E3A8A" />
          <Text style={styles.downloadButtonText}>Download PDF</Text>
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
    backgroundColor: '#EFF6FF',
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
    color: '#1E3A8A',
    marginBottom: 8,
  },
  dueDate: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
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
  downloadButton: {
    backgroundColor: '#EFF6FF',
  },
  homeButton: {
    backgroundColor: '#1E3A8A',
  },
  downloadButtonText: {
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