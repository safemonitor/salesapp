import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getWarehouses() {
  try {
    const { data, error } = await supabase
      .from('warehouses')
      .select('*')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[WarehouseService] Error fetching warehouses:', error);
    return { data: null, error };
  }
}

export async function getWarehouseById(id: string) {
  try {
    const { data, error } = await supabase
      .from('warehouses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[WarehouseService] Error fetching warehouse:', error);
    return { data: null, error };
  }
}

export async function createWarehouse(warehouse: Insert<'warehouses'>) {
  try {
    const { data, error } = await supabase
      .from('warehouses')
      .insert(warehouse)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[WarehouseService] Error creating warehouse:', error);
    return { data: null, error };
  }
}

export async function updateWarehouse(id: string, updates: Update<'warehouses'>) {
  try {
    const { data, error } = await supabase
      .from('warehouses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[WarehouseService] Error updating warehouse:', error);
    return { data: null, error };
  }
}

export async function deleteWarehouse(id: string) {
  try {
    const { error } = await supabase
      .from('warehouses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[WarehouseService] Error deleting warehouse:', error);
    return { error };
  }
}