import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Printer, FileText, Receipt } from 'lucide-react-native';

export default function PrintSettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Print Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Receipt Settings</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-print receipts</Text>
                <Text style={styles.settingDescription}>Automatically print receipts after payment</Text>
              </View>
              <Switch value={true} />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Include logo</Text>
                <Text style={styles.settingDescription}>Add company logo to receipts</Text>
              </View>
              <Switch value={true} />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Show tax details</Text>
                <Text style={styles.settingDescription}>Display tax breakdown on receipts</Text>
              </View>
              <Switch value={true} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Invoice Settings</Text>
          <View style={styles.card}>
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Auto-print invoices</Text>
                <Text style={styles.settingDescription}>Automatically print invoices when created</Text>
              </View>
              <Switch value={false} />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Include payment terms</Text>
                <Text style={styles.settingDescription}>Show payment terms on invoices</Text>
              </View>
              <Switch value={true} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Printer Setup</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.printerButton}>
              <Printer size={24} color="#1E3A8A" />
              <View style={styles.printerInfo}>
                <Text style={styles.printerName}>Star TSP100</Text>
                <Text style={styles.printerStatus}>Connected</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  printerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
  },
  printerInfo: {
    marginLeft: 16,
  },
  printerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  printerStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#10B981',
  },
});