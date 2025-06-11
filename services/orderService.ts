import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getOrders(filters?: {
  tenantId?: string;
  customerId?: string;
  status?: 'pending' | 'completed' | 'cancelled';
}) {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        customers (id, name, email, phone),
        order_items (
          id, quantity, unit_price,
          products (id, name, sku, price)
        )
      `)
      .order('order_date', { ascending: false });

    if (filters?.tenantId) {
      query = query.eq('tenant_id', filters.tenantId);
    }
    if (filters?.customerId) {
      query = query.eq('customer_id', filters.customerId);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[OrderService] Error fetching orders:', error);
    return { data: null, error };
  }
}

export async function getOrderById(id: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        customers (id, name, email, phone, address),
        order_items (
          id, quantity, unit_price,
          products (id, name, sku, price, description)
        ),
        deliveries (
          id, status, tracking_number, estimated_delivery, actual_delivery
        ),
        invoices (
          id, invoice_date, due_date, total_amount, status
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[OrderService] Error fetching order:', error);
    return { data: null, error };
  }
}

export async function createOrder(order: Insert<'orders'>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[OrderService] Error creating order:', error);
    return { data: null, error };
  }
}

export async function updateOrder(id: string, updates: Update<'orders'>) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[OrderService] Error updating order:', error);
    return { data: null, error };
  }
}

export async function createOrderWithItems(
  order: Insert<'orders'>,
  items: Insert<'order_items'>[]
) {
  try {
    // Start a transaction by creating the order first
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single();

    if (orderError) throw orderError;

    // Add order_id to each item
    const itemsWithOrderId = items.map(item => ({
      ...item,
      order_id: orderData.id
    }));

    // Insert order items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsWithOrderId)
      .select();

    if (itemsError) throw itemsError;

    return { 
      data: { 
        order: orderData, 
        items: itemsData 
      }, 
      error: null 
    };
  } catch (error) {
    console.error('[OrderService] Error creating order with items:', error);
    return { data: null, error };
  }
}

export async function getOrdersByDateRange(
  startDate: string,
  endDate: string,
  tenantId?: string
) {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        customers (id, name),
        order_items (quantity, unit_price)
      `)
      .gte('order_date', startDate)
      .lte('order_date', endDate)
      .order('order_date', { ascending: false });

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[OrderService] Error fetching orders by date range:', error);
    return { data: null, error };
  }
}