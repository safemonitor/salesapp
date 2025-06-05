import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Package, CreditCard as Edit, Trash2, Plus } from 'lucide-react-native';
import { getWarehouseById } from '@/services/warehouseService';
import { getLocations } from '@/services/locationService';
import { Row } from '@/types/database';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function WarehouseDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [warehouse, setWarehouse] = useState<Row<'warehouses'> | null>(null);
  const [locations, setLocations] = useState<Row<'locations'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [warehouseResult, locationsResult] = await Promise.all([
        getWarehouseById(id as string),
        getLocations(id as string)
      ]);

      if (warehouseResult.error) throw warehouseResult.error;
      if (locationsResult.error) throw locationsResult.error;

      setWarehouse(warehouseResult.data);
      setLocations(locationsResult.data || []);
    } catch (err) {
      console.error('Error loading warehouse details:', err);
      setError('Failed to load warehouse details. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Warehouse',
      'Are you sure you want to delete this warehouse? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Implement delete logic
              router.back();
            } catch (err) {
              console.error('Error deleting warehouse:', err);
              Alert.alert('Error', 'Failed to delete warehouse. Please try again.');
            }
          }
        }
      ]
    );
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

  if (error || !warehouse) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Error</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error || 'Warehouse not found'}</Text>
          <Button 
            title="Retry" 
            onPress={loadData}
            variant="primary"
            size="sm"
          />
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
        >
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Warehouse Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push(`/wms/warehouses/${id}/edit`)}
          >
            <Edit size={20} color="#1E3A8A" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Trash2 size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.warehouseInfo}>
          <Text style={styles.warehouseName}>{warehouse.name}</Text>
          <View style={styles.addressContainer}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.warehouseAddress}>{warehouse.address}</Text>
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Package size={24} color="#1E3A8A" />
            <Text style={styles.statValue}>{locations.length}</Text>
            <Text style={styles.statLabel}>Total Locations</Text>
          </Card>

          <Card style={styles.statCard}>
            <MapPin size={24} color="#10B981" />
            <Text style={styles.statValue}>
              {locations.filter(l => l.zone === 'Receiving').length}
            </Text>
            <Text style={styles.statLabel}>Receiving Areas</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Locations</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push(`/wms/locations/new?warehouseId=${id}`)}
            >
              <Plus size={20} color="#1E3A8A" />
              <Text style={styles.addButtonText}>Add Location</Text>
            </TouchableOpacity>
          </View>

          {locations.map(location => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationCard}
              onPress={() => router.push(`/wms/locations/${location.id}`)}
            >
              <View style={styles.locationInfo}>
                <Text style={styles.locationCode}>
                  {location.zone}-{location.aisle}-{location.shelf}-{location.position}
                </Text>
                <Text style={styles.locationType}>{location.zone}</Text>
              </View>
              <ArrowLeft size={20} color="#64748B" />
            </TouchableOpacity>
          ))}
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
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  errorContainer: {
    margin: 20,
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 12,
    textAlign: 'center',
  },
  warehouseInfo: {
    margin: 20,
    padding: 20,
  },
  warehouseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warehouseAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
    marginLeft: 8,
  },
  locationCard: {
    flexDirection: 'row',
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
  locationInfo: {
    flex: 1,
  },
  locationCode: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  locationType: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
});