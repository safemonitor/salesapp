import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, CloudUpload, Database, Calendar, Download } from 'lucide-react-native';

export default function BackupScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Backup Data</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Last Backup</Text>
          <View style={styles.card}>
            <View style={styles.backupInfo}>
              <Database size={24} color="#1E3A8A" />
              <View style={styles.backupDetails}>
                <Text style={styles.backupDate}>January 20, 2024 at 2:30 PM</Text>
                <Text style={styles.backupSize}>Total size: 256 MB</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup Settings</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingButton}>
              <Calendar size={20} color="#1E3A8A" />
              <Text style={styles.settingButtonText}>Schedule Automatic Backup</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingButton}>
              <Download size={20} color="#1E3A8A" />
              <Text style={styles.settingButtonText}>Export Backup File</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Backup Contents</Text>
          <View style={styles.card}>
            <View style={styles.contentItem}>
              <Text style={styles.contentTitle}>Sales Data</Text>
              <Text style={styles.contentSize}>120 MB</Text>
            </View>
            
            <View style={styles.contentItem}>
              <Text style={styles.contentTitle}>Client Information</Text>
              <Text style={styles.contentSize}>45 MB</Text>
            </View>
            
            <View style={styles.contentItem}>
              <Text style={styles.contentTitle}>Inventory Records</Text>
              <Text style={styles.contentSize}>76 MB</Text>
            </View>
            
            <View style={styles.contentItem}>
              <Text style={styles.contentTitle}>Settings</Text>
              <Text style={styles.contentSize}>15 MB</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.backupButton}>
          <CloudUpload size={20} color="#FFFFFF" />
          <Text style={styles.backupButtonText}>Create New Backup</Text>
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
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  backupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backupDetails: {
    marginLeft: 16,
  },
  backupDate: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  backupSize: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  settingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  settingButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E3A8A',
    marginLeft: 12,
  },
  contentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  contentTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  contentSize: {
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
  backupButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backupButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});