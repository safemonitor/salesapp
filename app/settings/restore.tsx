import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CloudDownload, CircleAlert as AlertCircle, Clock, CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function RestoreScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restore Data</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.warningCard}>
          <AlertCircle size={24} color="#F59E0B" />
          <Text style={styles.warningText}>
            Restoring data will replace all current data with the selected backup. This action cannot be undone.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Backups</Text>
          
          <TouchableOpacity style={styles.backupCard}>
            <View style={styles.backupInfo}>
              <Text style={styles.backupDate}>January 20, 2024</Text>
              <Text style={styles.backupTime}>2:30 PM</Text>
              <Text style={styles.backupSize}>256 MB</Text>
            </View>
            <View style={styles.backupStatus}>
              <CheckCircle2 size={20} color="#10B981" />
              <Text style={styles.statusText}>Complete</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backupCard}>
            <View style={styles.backupInfo}>
              <Text style={styles.backupDate}>January 19, 2024</Text>
              <Text style={styles.backupTime}>10:15 AM</Text>
              <Text style={styles.backupSize}>255 MB</Text>
            </View>
            <View style={styles.backupStatus}>
              <CheckCircle2 size={20} color="#10B981" />
              <Text style={styles.statusText}>Complete</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backupCard}>
            <View style={styles.backupInfo}>
              <Text style={styles.backupDate}>January 18, 2024</Text>
              <Text style={styles.backupTime}>4:45 PM</Text>
              <Text style={styles.backupSize}>254 MB</Text>
            </View>
            <View style={styles.backupStatus}>
              <CheckCircle2 size={20} color="#10B981" />
              <Text style={styles.statusText}>Complete</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Restore History</Text>
          <View style={styles.card}>
            <View style={styles.historyItem}>
              <Clock size={20} color="#64748B" />
              <View style={styles.historyInfo}>
                <Text style={styles.historyText}>Last restore performed on January 15, 2024</Text>
                <Text style={styles.historyDetail}>Restored from: January 14, 2024 backup</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.restoreButton}>
          <CloudDownload size={20} color="#FFFFFF" />
          <Text style={styles.restoreButtonText}>Restore Selected Backup</Text>
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  warningText: {
    flex: 1,
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#92400E',
    marginLeft: 12,
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
  backupCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backupInfo: {
    flex: 1,
  },
  backupDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  backupTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  backupSize: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  backupStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981',
    marginLeft: 8,
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
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyInfo: {
    marginLeft: 12,
  },
  historyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E293B',
    marginBottom: 4,
  },
  historyDetail: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  restoreButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restoreButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});