import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getLocations(warehouseId?: string) {
  try {
    let query = supabase
      .from('locations')
      .select('*, warehouses(name)')
      .order('zone')
      .order('aisle')
      .order('shelf')
      .order('position');

    if (warehouseId) {
      query = query.eq('warehouse_id', warehouseId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[LocationService] Error fetching locations:', error);
    return { data: null, error };
  }
}

export async function getLocationById(id: string) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*, warehouses(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[LocationService] Error fetching location:', error);
    return { data: null, error };
  }
}

export async function createLocation(location: Insert<'locations'>) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .insert(location)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[LocationService] Error creating location:', error);
    return { data: null, error };
  }
}

export async function updateLocation(id: string, updates: Update<'locations'>) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[LocationService] Error updating location:', error);
    return { data: null, error };
  }
}

export async function deleteLocation(id: string) {
  try {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[LocationService] Error deleting location:', error);
    return { error };
  }
}