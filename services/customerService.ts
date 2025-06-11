import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getCustomers(tenantId?: string) {
  try {
    let query = supabase
      .from('customers')
      .select('*')
      .order('name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[CustomerService] Error fetching customers:', error);
    return { data: null, error };
  }
}

export async function getCustomerById(id: string) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[CustomerService] Error fetching customer:', error);
    return { data: null, error };
  }
}

export async function createCustomer(customer: Insert<'customers'>) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert(customer)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[CustomerService] Error creating customer:', error);
    return { data: null, error };
  }
}

export async function updateCustomer(id: string, updates: Update<'customers'>) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[CustomerService] Error updating customer:', error);
    return { data: null, error };
  }
}

export async function deleteCustomer(id: string) {
  try {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[CustomerService] Error deleting customer:', error);
    return { error };
  }
}

export async function searchCustomers(searchTerm: string, tenantId?: string) {
  try {
    let query = supabase
      .from('customers')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,phone.ilike.%${searchTerm}%`)
      .order('name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[CustomerService] Error searching customers:', error);
    return { data: null, error };
  }
}