import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Calendar, Clock, Plus } from 'lucide-react-native';

export default function ScheduleScreen() {
  // Mock schedule data
  const schedules = [
    {
      id: '1',
      title: 'Morning Route',
      time: '8:00 AM - 12:00 PM',
      days: ['Monday', 'Wednesday', 'Friday'],
      driver: 'John Smith'
    },
    {
      id: '2',
      title: 'Afternoon Route',
      time: '1:00 PM - 5:00 PM',
      days: ['Tuesday', 'Thursday'],
      driver: 'Sarah Johnson'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule</Text>
      </View>

      <ScrollView style={styles.content}>
        {schedules.map(schedule => (
          <View key={schedule.id} style={styles.scheduleCard}>
            <View style={styles.scheduleHeader}>
              <Text style={styles.scheduleTitle}>{schedule.title}</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.scheduleDetails}>
              <View style={styles.detailRow}>
                <Clock size={16} color="#64748B" />
                <Text style={styles.detailText}>{schedule.time}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Calendar size={16} color="#64748B" />
                <Text style={styles.detailText}>{schedule.days.join(', ')}</Text>
              </View>
            </View>
            
            <View style={styles.driverInfo}>
              <Text style={styles.driverLabel}>Driver</Text>
              <Text style={styles.driverName}>{schedule.driver}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton}>
        <Plus size={20} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add Schedule</Text>
      </TouchableOpacity>
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
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scheduleTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  editButton: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
  scheduleDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  driverInfo: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  driverLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  driverName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1E293B',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});