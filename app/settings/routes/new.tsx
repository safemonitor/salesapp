import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Plus, MapPin } from 'lucide-react-native';

export default function NewRouteScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Route</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Route Information</Text>
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Route Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter route name"
                placeholderTextColor="#94A3B8"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter route description"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stops</Text>
            <TouchableOpacity style={styles.addStopButton}>
              <Plus size={20} color="#1E3A8A" />
              <Text style={styles.addStopText}>Add Stop</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.stopsList}>
            <View style={styles.stopCard}>
              <View style={styles.stopNumber}>
                <Text style={styles.stopNumberText}>1</Text>
              </View>
              <View style={styles.stopInputs}>
                <TextInput
                  style={styles.input}
                  placeholder="Client name"
                  placeholderTextColor="#94A3B8"
                />
                <View style={styles.addressInput}>
                  <MapPin size={20} color="#64748B" />
                  <TextInput
                    style={[styles.input, styles.addressField]}
                    placeholder="Address"
                    placeholderTextColor="#94A3B8"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => {
            // Handle route creation
            router.back();
          }}
        >
          <Text style={styles.createButtonText}>Create Route</Text>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
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
  inputGroup: {
    marginBottom: 16,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  addStopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addStopText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  stopsList: {
    gap: 12,
  },
  stopCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stopNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stopNumberText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#1E3A8A',
  },
  stopInputs: {
    flex: 1,
    gap: 12,
  },
  addressInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingLeft: 16,
  },
  addressField: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  createButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});