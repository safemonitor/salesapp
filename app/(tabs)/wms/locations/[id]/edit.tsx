import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { getLocationById, updateLocation } from '@/services/locationService';
import Button from '@/components/Button';

export default function EditLocationScreen() {
  const { id } = useLocalSearchParams();
  const [zone, setZone] = useState('');
  const [aisle, setAisle] = useState('');
  const [shelf, setShelf] = useState('');
  const [position, setPosition] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLocation();
  }, [id]);

  const loadLocation = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getLocationById(id as string);
      if (result.error) throw result.error;
      if (!result.data) throw new Error('Location not found');

      setZone(result.data.zone);
      setAisle(result.data.aisle);
      setShelf(result.data.shelf);
      setPosition(result.data.position);
    } catch (err) {
      console.error('Error loading location:', err);
      setError('Failed to load location details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!zone.trim() || !aisle.trim() || !shelf.trim() || !position.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      const result = await updateLocation(id as string, {
        zone: zone.trim().toUpperCase(),
        aisle: aisle.trim().toUpperCase(),
        shelf: shelf.trim().toUpperCase(),
        position: position.trim().toUpperCase()
      });

      if (result.error) throw result.error;
      router.back();
    } catch (err) {
      console.error('Error updating location:', err);
      setError('Failed to update location. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={saving}
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Location</Text>
      </View>

      <ScrollView style={styles.content}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Zone</Text>
            <TextInput
              style={styles.input}
              value={zone}
              onChangeText={setZone}
              placeholder="Enter zone (e.g., A, RECEIVING)"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              editable={!saving}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Aisle</Text>
            <TextInput
              style={styles.input}
              value={aisle}
              onChangeText={setAisle}
              placeholder="Enter aisle number"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              editable={!saving}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Shelf</Text>
            <TextInput
              style={styles.input}
              value={shelf}
              onChangeText={setShelf}
              placeholder="Enter shelf number"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              editable={!saving}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Position</Text>
            <TextInput
              style={styles.input}
              value={position}
              onChangeText={setPosition}
              placeholder="Enter position number"
              placeholderTextColor="#94A3B8"
              autoCapitalize="characters"
              editable={!saving}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Save Changes"
          onPress={handleSubmit}
          loading={saving}
          disabled={saving}
          fullWidth
        />
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
  errorContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    textAlign: 'center',
  },
  form: {
    padding: 20,
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
  footer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
});