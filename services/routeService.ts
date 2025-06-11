import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getRoutes(tenantId?: string) {
  try {
    let query = supabase
      .from('routes')
      .select(`
        *,
        route_customers (
          id, sequence_number,
          customers (id, name, address)
        ),
        route_agent_assignments (
          id, start_date, end_date, assigned_days_of_week,
          profiles (id, first_name, last_name)
        )
      `)
      .order('name');

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error fetching routes:', error);
    return { data: null, error };
  }
}

export async function getRouteById(id: string) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .select(`
        *,
        route_customers (
          id, sequence_number, assigned_date, notes,
          customers (id, name, email, phone, address)
        ),
        route_agent_assignments (
          id, start_date, end_date, assigned_days_of_week, is_recurring, notes,
          profiles (id, first_name, last_name, avatar_url)
        ),
        deliveries (
          id, status, estimated_delivery, actual_delivery
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error fetching route:', error);
    return { data: null, error };
  }
}

export async function createRoute(route: Insert<'routes'>) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .insert(route)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error creating route:', error);
    return { data: null, error };
  }
}

export async function updateRoute(id: string, updates: Update<'routes'>) {
  try {
    const { data, error } = await supabase
      .from('routes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error updating route:', error);
    return { data: null, error };
  }
}

export async function addCustomerToRoute(
  routeId: string,
  customerId: string,
  sequenceNumber?: number
) {
  try {
    const routeCustomer: Insert<'route_customers'> = {
      route_id: routeId,
      customer_id: customerId,
      sequence_number: sequenceNumber || 0
    };

    const { data, error } = await supabase
      .from('route_customers')
      .insert(routeCustomer)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error adding customer to route:', error);
    return { data: null, error };
  }
}

export async function removeCustomerFromRoute(routeCustomerId: string) {
  try {
    const { error } = await supabase
      .from('route_customers')
      .delete()
      .eq('id', routeCustomerId);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[RouteService] Error removing customer from route:', error);
    return { error };
  }
}

export async function assignAgentToRoute(
  routeId: string,
  agentId: string,
  assignment: Omit<Insert<'route_agent_assignments'>, 'route_id' | 'agent_id'>
) {
  try {
    const routeAssignment: Insert<'route_agent_assignments'> = {
      route_id: routeId,
      agent_id: agentId,
      ...assignment
    };

    const { data, error } = await supabase
      .from('route_agent_assignments')
      .insert(routeAssignment)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error assigning agent to route:', error);
    return { data: null, error };
  }
}

export async function updateRouteCustomerSequence(
  routeCustomerId: string,
  newSequence: number
) {
  try {
    const { data, error } = await supabase
      .from('route_customers')
      .update({ sequence_number: newSequence })
      .eq('id', routeCustomerId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error updating route customer sequence:', error);
    return { data: null, error };
  }
}

export async function getRoutesByAgent(agentId: string, date?: string) {
  try {
    let query = supabase
      .from('route_agent_assignments')
      .select(`
        *,
        routes (
          id, name, type, description,
          route_customers (
            id, sequence_number,
            customers (id, name, address)
          )
        )
      `)
      .eq('agent_id', agentId);

    if (date) {
      const targetDate = new Date(date);
      const dayOfWeek = targetDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      query = query
        .lte('start_date', date)
        .or(`end_date.is.null,end_date.gte.${date}`)
        .contains('assigned_days_of_week', [dayOfWeek]);
    }

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[RouteService] Error fetching routes by agent:', error);
    return { data: null, error };
  }
}