import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { User, Map, ChartBar as BarChart3, FolderSync as Sync, Bell, Printer, CloudUpload as UploadCloud, CloudDownload as DownloadCloud, ChevronRight, LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = React.useState(true);

  const SettingItem = ({ icon: Icon, title, description, onPress, rightComponent }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
        <Icon size={20} color="#1E3A8A" />
      </View>
      
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
      
      {rightComponent ? (
        rightComponent
      ) : (
        <ChevronRight size={20} color="#94A3B8" />
      )}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.profileIconContainer}>
          <User size={32} color="#1E3A8A" />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>Alex Johnson</Text>
          <Text style={styles.profileRole}>Sales Representative</Text>
        </View>
        <TouchableOpacity 
          style={styles.editProfileButton}
          onPress={() => router.push('/settings/profile')}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <SectionHeader title="Sales Tools" />
      
      <SettingItem 
        icon={Map} 
        title="Routes" 
        description="Manage your delivery routes" 
        onPress={() => router.push('/settings/routes')} 
      />
      
      <SettingItem 
        icon={BarChart3} 
        title="Reports" 
        description="View sales and inventory reports" 
        onPress={() => router.push('/settings/reports')} 
      />
      
      <SettingItem 
        icon={Printer} 
        title="Print Settings" 
        description="Configure receipt and invoice printing" 
        onPress={() => router.push('/settings/print')} 
      />

      <SectionHeader title="Data Management" />
      
      <SettingItem 
        icon={Sync} 
        title="Sync Data" 
        description="Last synced: Today, 2:30 PM" 
        onPress={() => {
          // Handle sync
        }} 
      />
      
      <SettingItem 
        icon={UploadCloud} 
        title="Backup Data" 
        description="Create a backup of your local data" 
        onPress={() => router.push('/settings/backup')} 
      />
      
      <SettingItem 
        icon={DownloadCloud} 
        title="Restore Data" 
        description="Restore from a previous backup" 
        onPress={() => router.push('/settings/restore')} 
      />

      <SectionHeader title="App Settings" />
      
      <SettingItem 
        icon={Bell} 
        title="Notifications" 
        description="Receive alerts about orders and deliveries" 
        onPress={() => {}} 
        rightComponent={
          <Switch
            trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
            thumbColor={notificationsEnabled ? '#1E3A8A' : '#94A3B8'}
            onValueChange={setNotificationsEnabled}
            value={notificationsEnabled}
          />
        }
      />
      
      <SettingItem 
        icon={Sync} 
        title="Auto Sync" 
        description="Automatically sync data when connected" 
        onPress={() => {}} 
        rightComponent={
          <Switch
            trackColor={{ false: '#E2E8F0', true: '#BFDBFE' }}
            thumbColor={autoSyncEnabled ? '#1E3A8A' : '#94A3B8'}
            onValueChange={setAutoSyncEnabled}
            value={autoSyncEnabled}
          />
        }
      />

      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => router.replace('/login')}
      >
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#1E293B',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  profileRole: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  editProfileButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editProfileText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  sectionHeader: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94A3B8',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
});