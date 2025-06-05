import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getInventory(filters?: {
  productId?: string;
  locationId?: string;
  lotNumber?: string;
}) {
  try {
    let query = supabase
      .from('inventory')
      .select(`
        *,
        products (id, name, sku, unit),
        locations (
          id, zone, aisle, shelf, position,
          warehouses (id, name)
        )
      `)
      .order('created_at', { ascending: false });

    if (filters?.productId) {
      query = query.eq('product_id', filters.productId);
    }
    if (filters?.locationId) {
      query = query.eq('location_id', filters.locationId);
    }
    if (filters?.lotNumber) {
      query = query.eq('lot_number', filters.lotNumber);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[InventoryService] Error fetching inventory:', error);
    return { data: null, error };
  }
}

export async function getInventoryById(id: string) {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .select(`
        *,
        products (id, name, sku, unit),
        locations (
          id, zone, aisle, shelf, position,
          warehouses (id, name)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[InventoryService] Error fetching inventory item:', error);
    return { data: null, error };
  }
}

export async function createInventory(inventory: Insert<'inventory'>) {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .insert(inventory)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[InventoryService] Error creating inventory:', error);
    return { data: null, error };
  }
}

export async function updateInventory(id: string, updates: Update<'inventory'>) {
  try {
    const { data, error } = await supabase
      .from('inventory')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[InventoryService] Error updating inventory:', error);
    return { data: null, error };
  }
}

export async function adjustInventoryQuantity(
  id: string,
  adjustment: number,
  metadata?: { reason?: string; reference?: string }
) {
  try {
    const { data: currentInventory, error: fetchError } = await getInventoryById(id);
    if (fetchError) throw fetchError;
    if (!currentInventory) throw new Error('Inventory not found');

    const newQuantity = currentInventory.quantity + adjustment;
    if (newQuantity < 0) {
      throw new Error('Insufficient inventory');
    }

    const { data, error } = await supabase
      .from('inventory')
      .update({ 
        quantity: newQuantity,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[InventoryService] Error adjusting inventory:', error);
    return { data: null, error };
  }
}

export async function deleteInventory(id: string) {
  try {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[InventoryService] Error deleting inventory:', error);
    return { error };
  }
}