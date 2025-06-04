import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Mail, Phone, MapPin } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileImageSection}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' }} 
              style={styles.profileImage} 
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Camera size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              defaultValue="Alex Johnson"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Role</Text>
            <TextInput
              style={styles.input}
              defaultValue="Sales Representative"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWithIcon}>
              <Mail size={20} color="#64748B" />
              <TextInput
                style={styles.iconInput}
                defaultValue="alex.johnson@example.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.inputWithIcon}>
              <Phone size={20} color="#64748B" />
              <TextInput
                style={styles.iconInput}
                defaultValue="(555) 123-4567"
                placeholderTextColor="#94A3B8"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.inputWithIcon}>
              <MapPin size={20} color="#64748B" />
              <TextInput
                style={[styles.iconInput, styles.textArea]}
                defaultValue="123 Business Street, Suite 456, San Francisco, CA 94105"
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => router.back()}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
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
  profileImageSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  imageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cameraButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#1E3A8A',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  form: {
    paddingHorizontal: 20,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    fontFamily: 'Inter-Regular',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  iconInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  saveButton: {
    backgroundColor: '#1E3A8A',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});