import { Database } from '@supabase/supabase-js';

export type Tables = {
  users: {
    Row: {
      id: string;
      email: string;
      full_name: string | null;
      role: 'admin' | 'manager' | 'picker' | 'receiver';
      warehouse_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      email: string;
      full_name?: string | null;
      role: 'admin' | 'manager' | 'picker' | 'receiver';
      warehouse_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      email?: string;
      full_name?: string | null;
      role?: 'admin' | 'manager' | 'picker' | 'receiver';
      warehouse_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  warehouses: {
    Row: {
      id: string;
      name: string;
      address: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      name: string;
      address: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      name?: string;
      address?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  locations: {
    Row: {
      id: string;
      warehouse_id: string;
      zone: string;
      aisle: string;
      shelf: string;
      position: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      warehouse_id: string;
      zone: string;
      aisle: string;
      shelf: string;
      position: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      warehouse_id?: string;
      zone?: string;
      aisle?: string;
      shelf?: string;
      position?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  products: {
    Row: {
      id: string;
      sku: string;
      name: string;
      description: string | null;
      category: string | null;
      unit: string;
      min_stock: number;
      max_stock: number | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      sku: string;
      name: string;
      description?: string | null;
      category?: string | null;
      unit: string;
      min_stock?: number;
      max_stock?: number | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      sku?: string;
      name?: string;
      description?: string | null;
      category?: string | null;
      unit?: string;
      min_stock?: number;
      max_stock?: number | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  inventory: {
    Row: {
      id: string;
      product_id: string;
      location_id: string;
      quantity: number;
      lot_number: string | null;
      expiration_date: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      product_id: string;
      location_id: string;
      quantity: number;
      lot_number?: string | null;
      expiration_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      product_id?: string;
      location_id?: string;
      quantity?: number;
      lot_number?: string | null;
      expiration_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  receiving: {
    Row: {
      id: string;
      reference_number: string;
      warehouse_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      received_by: string | null;
      received_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      reference_number: string;
      warehouse_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      received_by?: string | null;
      received_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      reference_number?: string;
      warehouse_id?: string;
      status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      received_by?: string | null;
      received_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  receiving_items: {
    Row: {
      id: string;
      receiving_id: string;
      product_id: string;
      expected_quantity: number;
      received_quantity: number | null;
      lot_number: string | null;
      expiration_date: string | null;
      location_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      receiving_id: string;
      product_id: string;
      expected_quantity: number;
      received_quantity?: number | null;
      lot_number?: string | null;
      expiration_date?: string | null;
      location_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      receiving_id?: string;
      product_id?: string;
      expected_quantity?: number;
      received_quantity?: number | null;
      lot_number?: string | null;
      expiration_date?: string | null;
      location_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  picking: {
    Row: {
      id: string;
      reference_number: string;
      warehouse_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      picked_by: string | null;
      picked_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      reference_number: string;
      warehouse_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      picked_by?: string | null;
      picked_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      reference_number?: string;
      warehouse_id?: string;
      status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      picked_by?: string | null;
      picked_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  picking_items: {
    Row: {
      id: string;
      picking_id: string;
      product_id: string;
      location_id: string;
      requested_quantity: number;
      picked_quantity: number | null;
      lot_number: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      picking_id: string;
      product_id: string;
      location_id: string;
      requested_quantity: number;
      picked_quantity?: number | null;
      lot_number?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      picking_id?: string;
      product_id?: string;
      location_id?: string;
      requested_quantity?: number;
      picked_quantity?: number | null;
      lot_number?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  transfers: {
    Row: {
      id: string;
      reference_number: string;
      from_location_id: string;
      to_location_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      initiated_by: string;
      completed_by: string | null;
      completed_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      reference_number: string;
      from_location_id: string;
      to_location_id: string;
      status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      initiated_by: string;
      completed_by?: string | null;
      completed_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      reference_number?: string;
      from_location_id?: string;
      to_location_id?: string;
      status?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
      initiated_by?: string;
      completed_by?: string | null;
      completed_at?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  transfer_items: {
    Row: {
      id: string;
      transfer_id: string;
      product_id: string;
      quantity: number;
      lot_number: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      transfer_id: string;
      product_id: string;
      quantity: number;
      lot_number?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      transfer_id?: string;
      product_id?: string;
      quantity?: number;
      lot_number?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  audit_log: {
    Row: {
      id: string;
      user_id: string | null;
      action: string;
      table_name: string;
      record_id: string;
      old_values: any | null;
      new_values: any | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      user_id?: string | null;
      action: string;
      table_name: string;
      record_id: string;
      old_values?: any | null;
      new_values?: any | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string | null;
      action?: string;
      table_name?: string;
      record_id?: string;
      old_values?: any | null;
      new_values?: any | null;
      created_at?: string;
    };
  };
};

export type Database = {
  public: Tables;
};

export type TableName = keyof Tables;
export type Row<T extends TableName> = Tables[T]['Row'];
export type Insert<T extends TableName> = Tables[T]['Insert'];
export type Update<T extends TableName> = Tables[T]['Update'];