import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getProfiles(filters?: {
  tenantId?: string;
  role?: 'admin' | 'sales' | 'presales' | 'delivery' | 'warehouse' | 'superadmin';
}) {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .order('first_name');

    if (filters?.tenantId) {
      query = query.eq('tenant_id', filters.tenantId);
    }
    if (filters?.role) {
      query = query.eq('role', filters.role);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching profiles:', error);
    return { data: null, error };
  }
}

export async function getProfileById(id: string) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching profile:', error);
    return { data: null, error };
  }
}

export async function createProfile(profile: Insert<'profiles'>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error creating profile:', error);
    return { data: null, error };
  }
}

export async function updateProfile(id: string, updates: Update<'profiles'>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error updating profile:', error);
    return { data: null, error };
  }
}

export async function getCurrentUserProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: new Error('No authenticated user') };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching current user profile:', error);
    return { data: null, error };
  }
}

export async function getDeliveryStaff(tenantId?: string) {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'delivery')
      .order('first_name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching delivery staff:', error);
    return { data: null, error };
  }
}

export async function getSalesStaff(tenantId?: string) {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .in('role', ['sales', 'presales'])
      .order('first_name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching sales staff:', error);
    return { data: null, error };
  }
}

export async function getWarehouseStaff(tenantId?: string) {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .eq('role', 'warehouse')
      .order('first_name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProfileService] Error fetching warehouse staff:', error);
    return { data: null, error };
  }
}