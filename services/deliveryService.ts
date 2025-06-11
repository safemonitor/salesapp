import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getDeliveries(filters?: {
  tenantId?: string;
  status?: 'assigned' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled';
  deliveryStaffId?: string;
  routeId?: string;
}) {
  try {
    let query = supabase
      .from('deliveries')
      .select(`
        *,
        orders (
          id, total_amount,
          customers (id, name, phone, address)
        ),
        profiles!deliveries_delivery_staff_id_fkey (
          id, first_name, last_name
        ),
        routes (id, name, type)
      `)
      .order('estimated_delivery', { ascending: true });

    if (filters?.tenantId) {
      query = query.eq('tenant_id', filters.tenantId);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.deliveryStaffId) {
      query = query.eq('delivery_staff_id', filters.deliveryStaffId);
    }
    if (filters?.routeId) {
      query = query.eq('route_id', filters.routeId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error fetching deliveries:', error);
    return { data: null, error };
  }
}

export async function getDeliveryById(id: string) {
  try {
    const { data, error } = await supabase
      .from('deliveries')
      .select(`
        *,
        orders (
          id, total_amount, order_date,
          customers (id, name, email, phone, address),
          order_items (
            id, quantity, unit_price,
            products (id, name, sku)
          )
        ),
        profiles!deliveries_delivery_staff_id_fkey (
          id, first_name, last_name, avatar_url
        ),
        routes (id, name, type, description),
        delivery_performance_logs (
          id, start_time, end_time, distance_covered, stops_completed, status
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error fetching delivery:', error);
    return { data: null, error };
  }
}

export async function createDelivery(delivery: Insert<'deliveries'>) {
  try {
    const { data, error } = await supabase
      .from('deliveries')
      .insert(delivery)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error creating delivery:', error);
    return { data: null, error };
  }
}

export async function updateDelivery(id: string, updates: Update<'deliveries'>) {
  try {
    const { data, error } = await supabase
      .from('deliveries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error updating delivery:', error);
    return { data: null, error };
  }
}

export async function updateDeliveryStatus(
  id: string, 
  status: 'assigned' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled',
  additionalData?: {
    actualDelivery?: string;
    deliveryNotes?: string;
    signatureUrl?: string;
    proofOfDeliveryImageUrl?: string;
    latitude?: number;
    longitude?: number;
  }
) {
  try {
    const updates: Update<'deliveries'> = {
      status,
      ...additionalData
    };

    const { data, error } = await supabase
      .from('deliveries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error updating delivery status:', error);
    return { data: null, error };
  }
}

export async function getDeliveriesByRoute(routeId: string, date?: string) {
  try {
    let query = supabase
      .from('deliveries')
      .select(`
        *,
        orders (
          id, total_amount,
          customers (id, name, phone, address)
        )
      `)
      .eq('route_id', routeId)
      .order('sequence_number', { ascending: true });

    if (date) {
      query = query.gte('estimated_delivery', `${date}T00:00:00`)
             .lt('estimated_delivery', `${date}T23:59:59`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error fetching deliveries by route:', error);
    return { data: null, error };
  }
}

export async function getDeliveryPerformance(
  deliveryStaffId: string,
  startDate?: string,
  endDate?: string
) {
  try {
    let query = supabase
      .from('delivery_performance_logs')
      .select(`
        *,
        deliveries (
          id, status,
          orders (
            customers (name)
          )
        )
      `)
      .eq('delivery_staff_id', deliveryStaffId)
      .order('start_time', { ascending: false });

    if (startDate) {
      query = query.gte('start_time', startDate);
    }
    if (endDate) {
      query = query.lte('start_time', endDate);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[DeliveryService] Error fetching delivery performance:', error);
    return { data: null, error };
  }
}