import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getTenants() {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error fetching tenants:', error);
    return { data: null, error };
  }
}

export async function getTenantById(id: string) {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .select(`
        *,
        tenant_modules (module_name, enabled)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error fetching tenant:', error);
    return { data: null, error };
  }
}

export async function createTenant(tenant: Insert<'tenants'>) {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .insert(tenant)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error creating tenant:', error);
    return { data: null, error };
  }
}

export async function updateTenant(id: string, updates: Update<'tenants'>) {
  try {
    const { data, error } = await supabase
      .from('tenants')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error updating tenant:', error);
    return { data: null, error };
  }
}

export async function getTenantModules(tenantId: string) {
  try {
    const { data, error } = await supabase
      .from('tenant_modules')
      .select('*')
      .eq('tenant_id', tenantId);

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error fetching tenant modules:', error);
    return { data: null, error };
  }
}

export async function updateTenantModule(
  tenantId: string,
  moduleName: 'presales_delivery' | 'van_sales' | 'wms',
  enabled: boolean
) {
  try {
    const { data, error } = await supabase
      .from('tenant_modules')
      .upsert({
        tenant_id: tenantId,
        module_name: moduleName,
        enabled
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[TenantService] Error updating tenant module:', error);
    return { data: null, error };
  }
}

export async function getCurrentUserTenant() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: new Error('No authenticated user') };
    }

    // Get user's profile to find their tenant
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('tenant_id')
      .eq('id', user.id)
      .single();

    if (profileError) throw profileError;
    if (!profile?.tenant_id) {
      return { data: null, error: new Error('User has no tenant assigned') };
    }

    // Get the tenant details
    const { data: tenant, error: tenantError } = await getTenantById(profile.tenant_id);
    
    if (tenantError) throw tenantError;
    return { data: tenant, error: null };
  } catch (error) {
    console.error('[TenantService] Error fetching current user tenant:', error);
    return { data: null, error };
  }
}

export async function isModuleEnabled(
  tenantId: string,
  moduleName: 'presales_delivery' | 'van_sales' | 'wms'
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('tenant_modules')
      .select('enabled')
      .eq('tenant_id', tenantId)
      .eq('module_name', moduleName)
      .single();

    if (error) {
      // If no record exists, assume module is disabled
      return false;
    }

    return data?.enabled || false;
  } catch (error) {
    console.error('[TenantService] Error checking module status:', error);
    return false;
  }
}