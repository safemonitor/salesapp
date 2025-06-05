import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Package, CreditCard as Edit, Trash2, MapPin } from 'lucide-react-native';
import { getLocationById } from '@/services/locationService';
import { getInventory } from '@/services/inventoryService';
import { Row } from '@/types/database';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function LocationDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [location, setLocation] = useState<Row<'locations'> | null>(null);
  const [inventory, setInventory] = useState<Row<'inventory'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);

      const [locationResult, inventoryResult] = await Promise.all([
        getLocationById(id as string),
        getInventory({ locationId: id as string })
      ]);

      if (locationResult.error) throw locationResult.error;
      if (inventoryResult.error) throw inventoryResult.error;

      setLocation(locationResult.data);
      setInventory(inventoryResult.data || []);
    } catch (err) {
      console.error('Error loading location details:', err);
      setError('Failed to load location details. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Location',
      'Are you sure you want to delete this location? This action cannot be undone.',
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
              console.error('Error deleting location:', err);
              Alert.alert('Error', 'Failed to delete location. Please try again.');
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

  if (error || !location) {
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
          <Text style={styles.errorText}>{error || 'Location not found'}</Text>
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
        <Text style={styles.headerTitle}>Location Details</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => router.push(`/wms/locations/${id}/edit`)}
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
        <Card style={styles.locationInfo}>
          <Text style={styles.locationCode}>
            {location.zone}-{location.aisle}-{location.shelf}-{location.position}
          </Text>
          <View style={styles.warehouseContainer}>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.warehouseName}>
              {(location as any).warehouses?.name || 'Unknown Warehouse'}
            </Text>
          </View>
        </Card>

        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Package size={24} color="#1E3A8A" />
            <Text style={styles.statValue}>{inventory.length}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </Card>

          <Card style={styles.statCard}>
            <Package size={24} color="#10B981" />
            <Text style={styles.statValue}>
              {inventory.reduce((sum, item) => sum + item.quantity, 0)}
            </Text>
            <Text style={styles.statLabel}>Total Units</Text>
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Inventory</Text>
          {inventory.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.inventoryCard}
              onPress={() => router.push(`/wms/inventory/${item.id}`)}
            >
              <View style={styles.inventoryInfo}>
                <Text style={styles.productName}>
                  {(item as any).products?.name || 'Unknown Product'}
                </Text>
                <Text style={styles.productSku}>
                  SKU: {(item as any).products?.sku || 'N/A'}
                </Text>
                <Text style={styles.quantity}>
                  {item.quantity} {(item as any).products?.unit || 'units'}
                </Text>
                {item.lot_number && (
                  <Text style={styles.lotNumber}>Lot: {item.lot_number}</Text>
                )}
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
  locationInfo: {
    margin: 20,
    padding: 20,
  },
  locationCode: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 12,
  },
  warehouseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  warehouseName: {
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
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  inventoryCard: {
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
  inventoryInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  productSku: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  quantity: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#10B981',
    marginBottom: 4,
  },
  lotNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});