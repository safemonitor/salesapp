import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Package, MapPin, ArrowRight, Plus } from 'lucide-react-native';
import { getWarehouses } from '@/services/warehouseService';
import { getLocations } from '@/services/locationService';
import { Row } from '@/types/database';
import Card from '@/components/Card';

export default function WMSScreen() {
  const [warehouses, setWarehouses] = useState<Row<'warehouses'>[]>([]);
  const [locations, setLocations] = useState<Row<'locations'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [warehousesResult, locationsResult] = await Promise.all([
        getWarehouses(),
        getLocations()
      ]);

      if (warehousesResult.error) throw warehousesResult.error;
      if (locationsResult.error) throw locationsResult.error;

      setWarehouses(warehousesResult.data || []);
      setLocations(locationsResult.data || []);
    } catch (err) {
      console.error('Error loading WMS data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Warehouse Management</Text>
      </View>

      <ScrollView style={styles.content}>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={loadData}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Package size={24} color="#1E3A8A" />
            <Text style={styles.statValue}>{warehouses.length}</Text>
            <Text style={styles.statLabel}>Warehouses</Text>
          </Card>

          <Card style={styles.statCard}>
            <MapPin size={24} color="#10B981" />
            <Text style={styles.statValue}>{locations.length}</Text>
            <Text style={styles.statLabel}>Locations</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Warehouses</Text>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/wms/warehouses/new')}
            >
              <Plus size={20} color="#1E3A8A" />
              <Text style={styles.addButtonText}>Add Warehouse</Text>
            </TouchableOpacity>
          </View>

          {warehouses.map(warehouse => (
            <TouchableOpacity
              key={warehouse.id}
              style={styles.warehouseCard}
              onPress={() => router.push(`/wms/warehouses/${warehouse.id}`)}
            >
              <View style={styles.warehouseInfo}>
                <Text style={styles.warehouseName}>{warehouse.name}</Text>
                <Text style={styles.warehouseAddress}>{warehouse.address}</Text>
                <Text style={styles.locationCount}>
                  {locations.filter(l => l.warehouse_id === warehouse.id).length} locations
                </Text>
              </View>
              <ArrowRight size={20} color="#64748B" />
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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
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
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#EF4444',
    marginBottom: 8,
  },
  retryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#EF4444',
    borderRadius: 6,
  },
  retryButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
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
  warehouseCard: {
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
  warehouseInfo: {
    flex: 1,
  },
  warehouseName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  warehouseAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  locationCount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#1E3A8A',
  },
});