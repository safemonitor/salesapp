import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Camera, Plus } from 'lucide-react-native';

export default function NewProductScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.imageSection}>
          <TouchableOpacity style={styles.imageUpload}>
            <Camera size={32} color="#64748B" />
            <Text style={styles.imageUploadText}>Add Product Image</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter product name"
              placeholderTextColor="#94A3B8"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity style={styles.selectButton}>
              <Text style={styles.selectButtonText}>Select category</Text>
              <Plus size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>SKU</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter SKU"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
                keyboardType="decimal-pad"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Unit</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., lb, kg, pc"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 12 }]}>
              <Text style={styles.label}>Stock</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Low Stock Alert</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter product description"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={() => {
            // Handle save
            router.back();
          }}
        >
          <Text style={styles.saveButtonText}>Save Product</Text>
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
  imageSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#64748B',
    marginTop: 12,
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  selectButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectButtonText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94A3B8',
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