export type Tables = {
  applied_promotions: {
    Row: {
      id: string;
      promotion_id: string;
      order_id: string;
      customer_id: string;
      discount_amount: number;
      applied_at: string;
      applied_by: string | null;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      order_id: string;
      customer_id: string;
      discount_amount: number;
      applied_at?: string;
      applied_by?: string | null;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      order_id?: string;
      customer_id?: string;
      discount_amount?: number;
      applied_at?: string;
      applied_by?: string | null;
    };
  };
  customers: {
    Row: {
      id: string;
      tenant_id: string | null;
      name: string;
      email: string;
      phone: string;
      address: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id?: string | null;
      name: string;
      email: string;
      phone: string;
      address: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string | null;
      name?: string;
      email?: string;
      phone?: string;
      address?: string;
      created_at?: string;
    };
  };
  deliveries: {
    Row: {
      id: string;
      order_id: string | null;
      tracking_number: string | null;
      status: 'assigned' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled';
      estimated_delivery: string | null;
      actual_delivery: string | null;
      shipping_cost: number;
      created_at: string;
      tenant_id: string | null;
      delivery_staff_id: string | null;
      route_number: string | null;
      delivery_notes: string | null;
      delivery_rating: number | null;
      customer_feedback: string | null;
      delivery_zone: string | null;
      route_id: string | null;
      sequence_number: number | null;
      latitude: number | null;
      longitude: number | null;
      signature_url: string | null;
      proof_of_delivery_image_url: string | null;
    };
    Insert: {
      id?: string;
      order_id?: string | null;
      tracking_number?: string | null;
      status: 'assigned' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled';
      estimated_delivery?: string | null;
      actual_delivery?: string | null;
      shipping_cost?: number;
      created_at?: string;
      tenant_id?: string | null;
      delivery_staff_id?: string | null;
      route_number?: string | null;
      delivery_notes?: string | null;
      delivery_rating?: number | null;
      customer_feedback?: string | null;
      delivery_zone?: string | null;
      route_id?: string | null;
      sequence_number?: number | null;
      latitude?: number | null;
      longitude?: number | null;
      signature_url?: string | null;
      proof_of_delivery_image_url?: string | null;
    };
    Update: {
      id?: string;
      order_id?: string | null;
      tracking_number?: string | null;
      status?: 'assigned' | 'out_for_delivery' | 'delivered' | 'failed' | 'cancelled';
      estimated_delivery?: string | null;
      actual_delivery?: string | null;
      shipping_cost?: number;
      created_at?: string;
      tenant_id?: string | null;
      delivery_staff_id?: string | null;
      route_number?: string | null;
      delivery_notes?: string | null;
      delivery_rating?: number | null;
      customer_feedback?: string | null;
      delivery_zone?: string | null;
      route_id?: string | null;
      sequence_number?: number | null;
      latitude?: number | null;
      longitude?: number | null;
      signature_url?: string | null;
      proof_of_delivery_image_url?: string | null;
    };
  };
  delivery_performance_logs: {
    Row: {
      id: string;
      tenant_id: string;
      delivery_staff_id: string;
      delivery_id: string;
      start_time: string;
      end_time: string | null;
      distance_covered: number | null;
      stops_completed: number;
      status: 'active' | 'completed' | 'cancelled';
      notes: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      delivery_staff_id: string;
      delivery_id: string;
      start_time?: string;
      end_time?: string | null;
      distance_covered?: number | null;
      stops_completed?: number;
      status: 'active' | 'completed' | 'cancelled';
      notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      delivery_staff_id?: string;
      delivery_id?: string;
      start_time?: string;
      end_time?: string | null;
      distance_covered?: number | null;
      stops_completed?: number;
      status?: 'active' | 'completed' | 'cancelled';
      notes?: string | null;
      created_at?: string;
    };
  };
  inventory_transactions: {
    Row: {
      id: string;
      tenant_id: string;
      product_id: string;
      location_id: string;
      transaction_type: 'in' | 'out' | 'adjustment' | 'transfer_in' | 'transfer_out';
      quantity: number;
      reference_id: string | null;
      notes: string | null;
      performed_by: string;
      transaction_date: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      product_id: string;
      location_id: string;
      transaction_type: 'in' | 'out' | 'adjustment' | 'transfer_in' | 'transfer_out';
      quantity: number;
      reference_id?: string | null;
      notes?: string | null;
      performed_by: string;
      transaction_date?: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      product_id?: string;
      location_id?: string;
      transaction_type?: 'in' | 'out' | 'adjustment' | 'transfer_in' | 'transfer_out';
      quantity?: number;
      reference_id?: string | null;
      notes?: string | null;
      performed_by?: string;
      transaction_date?: string;
      created_at?: string;
    };
  };
  invoices: {
    Row: {
      id: string;
      tenant_id: string | null;
      order_id: string | null;
      invoice_date: string;
      due_date: string;
      total_amount: number;
      status: 'paid' | 'unpaid' | 'overdue';
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id?: string | null;
      order_id?: string | null;
      invoice_date?: string;
      due_date: string;
      total_amount: number;
      status: 'paid' | 'unpaid' | 'overdue';
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string | null;
      order_id?: string | null;
      invoice_date?: string;
      due_date?: string;
      total_amount?: number;
      status?: 'paid' | 'unpaid' | 'overdue';
      created_at?: string;
    };
  };
  location_inventory: {
    Row: {
      id: string;
      location_id: string;
      product_id: string;
      quantity: number;
      last_updated_at: string;
    };
    Insert: {
      id?: string;
      location_id: string;
      product_id: string;
      quantity?: number;
      last_updated_at?: string;
    };
    Update: {
      id?: string;
      location_id?: string;
      product_id?: string;
      quantity?: number;
      last_updated_at?: string;
    };
  };
  locations: {
    Row: {
      id: string;
      tenant_id: string;
      name: string;
      description: string | null;
      location_type: 'warehouse' | 'store' | 'van' | 'supplier' | 'customer';
      address: string | null;
      is_active: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      name: string;
      description?: string | null;
      location_type?: 'warehouse' | 'store' | 'van' | 'supplier' | 'customer';
      address?: string | null;
      is_active?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      name?: string;
      description?: string | null;
      location_type?: 'warehouse' | 'store' | 'van' | 'supplier' | 'customer';
      address?: string | null;
      is_active?: boolean;
      created_at?: string;
    };
  };
  order_items: {
    Row: {
      id: string;
      order_id: string | null;
      product_id: string | null;
      quantity: number;
      unit_price: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      order_id?: string | null;
      product_id?: string | null;
      quantity: number;
      unit_price: number;
      created_at?: string;
    };
    Update: {
      id?: string;
      order_id?: string | null;
      product_id?: string | null;
      quantity?: number;
      unit_price?: number;
      created_at?: string;
    };
  };
  orders: {
    Row: {
      id: string;
      tenant_id: string | null;
      customer_id: string;
      order_date: string;
      total_amount: number;
      status: 'pending' | 'completed' | 'cancelled';
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id?: string | null;
      customer_id: string;
      order_date?: string;
      total_amount: number;
      status: 'pending' | 'completed' | 'cancelled';
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string | null;
      customer_id?: string;
      order_date?: string;
      total_amount?: number;
      status?: 'pending' | 'completed' | 'cancelled';
      created_at?: string;
    };
  };
  products: {
    Row: {
      id: string;
      tenant_id: string | null;
      name: string;
      description: string | null;
      price: number;
      sku: string;
      stock_quantity: number;
      category: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id?: string | null;
      name: string;
      description?: string | null;
      price: number;
      sku: string;
      stock_quantity?: number;
      category: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string | null;
      name?: string;
      description?: string | null;
      price?: number;
      sku?: string;
      stock_quantity?: number;
      category?: string;
      created_at?: string;
    };
  };
  profiles: {
    Row: {
      id: string;
      tenant_id: string | null;
      role: 'admin' | 'sales' | 'presales' | 'delivery' | 'warehouse' | 'superadmin';
      first_name: string;
      last_name: string;
      avatar_url: string | null;
      created_at: string;
    };
    Insert: {
      id: string;
      tenant_id?: string | null;
      role: 'admin' | 'sales' | 'presales' | 'delivery' | 'warehouse' | 'superadmin';
      first_name: string;
      last_name: string;
      avatar_url?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string | null;
      role?: 'admin' | 'sales' | 'presales' | 'delivery' | 'warehouse' | 'superadmin';
      first_name?: string;
      last_name?: string;
      avatar_url?: string | null;
      created_at?: string;
    };
  };
  promotion_actions: {
    Row: {
      id: string;
      promotion_id: string;
      action_type: 'discount_percentage' | 'discount_fixed' | 'add_free_item' | 'free_shipping' | 'upgrade_shipping' | 'apply_to_category' | 'apply_to_product';
      target_type: 'order' | 'product' | 'category' | 'shipping' | 'cheapest_item' | 'most_expensive_item' | 'specific_product';
      target_value: string | null;
      action_value: number | null;
      action_data: any | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      action_type: 'discount_percentage' | 'discount_fixed' | 'add_free_item' | 'free_shipping' | 'upgrade_shipping' | 'apply_to_category' | 'apply_to_product';
      target_type: 'order' | 'product' | 'category' | 'shipping' | 'cheapest_item' | 'most_expensive_item' | 'specific_product';
      target_value?: string | null;
      action_value?: number | null;
      action_data?: any | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      action_type?: 'discount_percentage' | 'discount_fixed' | 'add_free_item' | 'free_shipping' | 'upgrade_shipping' | 'apply_to_category' | 'apply_to_product';
      target_type?: 'order' | 'product' | 'category' | 'shipping' | 'cheapest_item' | 'most_expensive_item' | 'specific_product';
      target_value?: string | null;
      action_value?: number | null;
      action_data?: any | null;
      created_at?: string;
    };
  };
  promotion_category_eligibility: {
    Row: {
      id: string;
      promotion_id: string;
      category: string;
      is_included: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      category: string;
      is_included?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      category?: string;
      is_included?: boolean;
      created_at?: string;
    };
  };
  promotion_customer_eligibility: {
    Row: {
      id: string;
      promotion_id: string;
      customer_group: 'all' | 'new' | 'returning' | 'vip' | 'wholesale' | 'retail' | 'specific';
      customer_id: string | null;
      is_included: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      customer_group: 'all' | 'new' | 'returning' | 'vip' | 'wholesale' | 'retail' | 'specific';
      customer_id?: string | null;
      is_included?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      customer_group?: 'all' | 'new' | 'returning' | 'vip' | 'wholesale' | 'retail' | 'specific';
      customer_id?: string | null;
      is_included?: boolean;
      created_at?: string;
    };
  };
  promotion_product_eligibility: {
    Row: {
      id: string;
      promotion_id: string;
      product_id: string;
      is_included: boolean;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      product_id: string;
      is_included?: boolean;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      product_id?: string;
      is_included?: boolean;
      created_at?: string;
    };
  };
  promotion_rules: {
    Row: {
      id: string;
      promotion_id: string;
      rule_type: 'order' | 'product' | 'customer' | 'time' | 'quantity' | 'category';
      field_name: string;
      operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'in' | 'not_in' | 'between';
      value: string;
      logical_operator: 'AND' | 'OR';
      rule_group: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      rule_type: 'order' | 'product' | 'customer' | 'time' | 'quantity' | 'category';
      field_name: string;
      operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'in' | 'not_in' | 'between';
      value: string;
      logical_operator?: 'AND' | 'OR';
      rule_group?: number;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      rule_type?: 'order' | 'product' | 'customer' | 'time' | 'quantity' | 'category';
      field_name?: string;
      operator?: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'greater_equal' | 'less_equal' | 'contains' | 'in' | 'not_in' | 'between';
      value?: string;
      logical_operator?: 'AND' | 'OR';
      rule_group?: number;
      created_at?: string;
    };
  };
  promotion_usage_limits: {
    Row: {
      id: string;
      promotion_id: string;
      customer_id: string | null;
      usage_count: number;
      last_used_at: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      promotion_id: string;
      customer_id?: string | null;
      usage_count?: number;
      last_used_at?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      promotion_id?: string;
      customer_id?: string | null;
      usage_count?: number;
      last_used_at?: string | null;
      created_at?: string;
    };
  };
  promotions: {
    Row: {
      id: string;
      tenant_id: string;
      name: string;
      description: string | null;
      promotion_type: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping' | 'bundle' | 'tiered' | 'category_discount';
      discount_type: 'percentage' | 'fixed_amount' | 'free_item' | 'free_shipping' | 'buy_x_get_y_free' | 'buy_x_get_y_discount';
      discount_value: number;
      minimum_order_amount: number;
      maximum_discount_amount: number | null;
      is_active: boolean;
      is_stackable: boolean;
      priority: number;
      start_date: string;
      end_date: string | null;
      usage_limit: number | null;
      usage_limit_per_customer: number | null;
      created_by: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      name: string;
      description?: string | null;
      promotion_type: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping' | 'bundle' | 'tiered' | 'category_discount';
      discount_type: 'percentage' | 'fixed_amount' | 'free_item' | 'free_shipping' | 'buy_x_get_y_free' | 'buy_x_get_y_discount';
      discount_value: number;
      minimum_order_amount?: number;
      maximum_discount_amount?: number | null;
      is_active?: boolean;
      is_stackable?: boolean;
      priority?: number;
      start_date: string;
      end_date?: string | null;
      usage_limit?: number | null;
      usage_limit_per_customer?: number | null;
      created_by: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      name?: string;
      description?: string | null;
      promotion_type?: 'percentage' | 'fixed_amount' | 'buy_x_get_y' | 'free_shipping' | 'bundle' | 'tiered' | 'category_discount';
      discount_type?: 'percentage' | 'fixed_amount' | 'free_item' | 'free_shipping' | 'buy_x_get_y_free' | 'buy_x_get_y_discount';
      discount_value?: number;
      minimum_order_amount?: number;
      maximum_discount_amount?: number | null;
      is_active?: boolean;
      is_stackable?: boolean;
      priority?: number;
      start_date?: string;
      end_date?: string | null;
      usage_limit?: number | null;
      usage_limit_per_customer?: number | null;
      created_by?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  route_agent_assignments: {
    Row: {
      id: string;
      route_id: string;
      agent_id: string;
      start_date: string;
      end_date: string | null;
      assigned_days_of_week: number[];
      is_recurring: boolean;
      notes: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      route_id: string;
      agent_id: string;
      start_date: string;
      end_date?: string | null;
      assigned_days_of_week?: number[];
      is_recurring?: boolean;
      notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      route_id?: string;
      agent_id?: string;
      start_date?: string;
      end_date?: string | null;
      assigned_days_of_week?: number[];
      is_recurring?: boolean;
      notes?: string | null;
      created_at?: string;
    };
  };
  route_customers: {
    Row: {
      id: string;
      route_id: string;
      customer_id: string;
      sequence_number: number;
      assigned_date: string;
      notes: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      route_id: string;
      customer_id: string;
      sequence_number?: number;
      assigned_date?: string;
      notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      route_id?: string;
      customer_id?: string;
      sequence_number?: number;
      assigned_date?: string;
      notes?: string | null;
      created_at?: string;
    };
  };
  routes: {
    Row: {
      id: string;
      tenant_id: string;
      name: string;
      description: string | null;
      type: 'delivery' | 'sales' | 'mixed';
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      name: string;
      description?: string | null;
      type: 'delivery' | 'sales' | 'mixed';
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      name?: string;
      description?: string | null;
      type?: 'delivery' | 'sales' | 'mixed';
      created_at?: string;
    };
  };
  settings: {
    Row: {
      id: string;
      key: string;
      value: string;
      type: 'string' | 'number' | 'boolean' | 'json' | 'email' | 'url';
      description: string | null;
      tenant_id: string | null;
      category: 'general' | 'email' | 'security' | 'features' | 'integrations' | 'appearance' | 'notifications';
      is_public: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      key: string;
      value: string;
      type?: 'string' | 'number' | 'boolean' | 'json' | 'email' | 'url';
      description?: string | null;
      tenant_id?: string | null;
      category?: 'general' | 'email' | 'security' | 'features' | 'integrations' | 'appearance' | 'notifications';
      is_public?: boolean;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      key?: string;
      value?: string;
      type?: 'string' | 'number' | 'boolean' | 'json' | 'email' | 'url';
      description?: string | null;
      tenant_id?: string | null;
      category?: 'general' | 'email' | 'security' | 'features' | 'integrations' | 'appearance' | 'notifications';
      is_public?: boolean;
      created_at?: string;
      updated_at?: string;
    };
  };
  stock_transfer_items: {
    Row: {
      id: string;
      transfer_id: string;
      product_id: string;
      quantity: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      transfer_id: string;
      product_id: string;
      quantity: number;
      created_at?: string;
    };
    Update: {
      id?: string;
      transfer_id?: string;
      product_id?: string;
      quantity?: number;
      created_at?: string;
    };
  };
  stock_transfers: {
    Row: {
      id: string;
      tenant_id: string;
      from_location_id: string;
      to_location_id: string;
      status: 'pending' | 'in_transit' | 'completed' | 'cancelled';
      transfer_date: string;
      completed_date: string | null;
      notes: string | null;
      created_by: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      from_location_id: string;
      to_location_id: string;
      status?: 'pending' | 'in_transit' | 'completed' | 'cancelled';
      transfer_date?: string;
      completed_date?: string | null;
      notes?: string | null;
      created_by: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      from_location_id?: string;
      to_location_id?: string;
      status?: 'pending' | 'in_transit' | 'completed' | 'cancelled';
      transfer_date?: string;
      completed_date?: string | null;
      notes?: string | null;
      created_by?: string;
      created_at?: string;
    };
  };
  supplier_order_items: {
    Row: {
      id: string;
      supplier_order_id: string;
      product_id: string;
      quantity_ordered: number;
      quantity_received: number;
      unit_cost: number;
      created_at: string;
    };
    Insert: {
      id?: string;
      supplier_order_id: string;
      product_id: string;
      quantity_ordered: number;
      quantity_received?: number;
      unit_cost: number;
      created_at?: string;
    };
    Update: {
      id?: string;
      supplier_order_id?: string;
      product_id?: string;
      quantity_ordered?: number;
      quantity_received?: number;
      unit_cost?: number;
      created_at?: string;
    };
  };
  supplier_orders: {
    Row: {
      id: string;
      tenant_id: string;
      supplier_name: string;
      order_date: string;
      expected_delivery_date: string;
      status: 'pending' | 'partially_received' | 'received' | 'cancelled';
      receiving_location_id: string;
      total_amount: number | null;
      notes: string | null;
      created_by: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      supplier_name: string;
      order_date?: string;
      expected_delivery_date: string;
      status: 'pending' | 'partially_received' | 'received' | 'cancelled';
      receiving_location_id: string;
      total_amount?: number | null;
      notes?: string | null;
      created_by: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      supplier_name?: string;
      order_date?: string;
      expected_delivery_date?: string;
      status?: 'pending' | 'partially_received' | 'received' | 'cancelled';
      receiving_location_id?: string;
      total_amount?: number | null;
      notes?: string | null;
      created_by?: string;
      created_at?: string;
    };
  };
  tenant_modules: {
    Row: {
      tenant_id: string;
      module_name: 'presales_delivery' | 'van_sales' | 'wms';
      enabled: boolean;
    };
    Insert: {
      tenant_id: string;
      module_name: 'presales_delivery' | 'van_sales' | 'wms';
      enabled?: boolean;
    };
    Update: {
      tenant_id?: string;
      module_name?: 'presales_delivery' | 'van_sales' | 'wms';
      enabled?: boolean;
    };
  };
  tenants: {
    Row: {
      id: string;
      name: string;
      created_at: string;
      subscription_plan: string;
      max_users: number;
    };
    Insert: {
      id?: string;
      name: string;
      created_at?: string;
      subscription_plan?: string;
      max_users?: number;
    };
    Update: {
      id?: string;
      name?: string;
      created_at?: string;
      subscription_plan?: string;
      max_users?: number;
    };
  };
  user_activity_logs: {
    Row: {
      id: string;
      user_id: string;
      action_type: string;
      details: any | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      user_id: string;
      action_type: string;
      details?: any | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      action_type?: string;
      details?: any | null;
      created_at?: string;
    };
  };
  van_inventories: {
    Row: {
      id: string;
      profile_id: string;
      product_id: string;
      quantity: number;
      last_updated_at: string;
    };
    Insert: {
      id?: string;
      profile_id: string;
      product_id: string;
      quantity?: number;
      last_updated_at?: string;
    };
    Update: {
      id?: string;
      profile_id?: string;
      product_id?: string;
      quantity?: number;
      last_updated_at?: string;
    };
  };
  van_stock_movements: {
    Row: {
      id: string;
      profile_id: string;
      product_id: string;
      movement_type: 'load' | 'unload' | 'sale' | 'adjustment';
      quantity: number;
      reference_order_id: string | null;
      notes: string | null;
      created_at: string;
    };
    Insert: {
      id?: string;
      profile_id: string;
      product_id: string;
      movement_type: 'load' | 'unload' | 'sale' | 'adjustment';
      quantity: number;
      reference_order_id?: string | null;
      notes?: string | null;
      created_at?: string;
    };
    Update: {
      id?: string;
      profile_id?: string;
      product_id?: string;
      movement_type?: 'load' | 'unload' | 'sale' | 'adjustment';
      quantity?: number;
      reference_order_id?: string | null;
      notes?: string | null;
      created_at?: string;
    };
  };
  visit_schedules: {
    Row: {
      id: string;
      route_customer_id: string;
      frequency_type: 'daily' | 'weekly' | 'monthly' | 'custom';
      frequency_value: number;
      start_date: string;
      end_date: string | null;
      days_of_week: number[] | null;
      day_of_month: number | null;
      exclude_dates: string[] | null;
      notes: string | null;
      created_at: string;
      tenant_id: string;
    };
    Insert: {
      id?: string;
      route_customer_id: string;
      frequency_type: 'daily' | 'weekly' | 'monthly' | 'custom';
      frequency_value?: number;
      start_date: string;
      end_date?: string | null;
      days_of_week?: number[] | null;
      day_of_month?: number | null;
      exclude_dates?: string[] | null;
      notes?: string | null;
      created_at?: string;
      tenant_id: string;
    };
    Update: {
      id?: string;
      route_customer_id?: string;
      frequency_type?: 'daily' | 'weekly' | 'monthly' | 'custom';
      frequency_value?: number;
      start_date?: string;
      end_date?: string | null;
      days_of_week?: number[] | null;
      day_of_month?: number | null;
      exclude_dates?: string[] | null;
      notes?: string | null;
      created_at?: string;
      tenant_id?: string;
    };
  };
  visits: {
    Row: {
      id: string;
      tenant_id: string;
      customer_id: string;
      visit_date: string;
      notes: string | null;
      outcome: 'successful' | 'unsuccessful' | 'rescheduled' | 'cancelled' | 'pending' | null;
      photos_url: string[] | null;
      created_by: string;
      created_at: string;
      latitude: number | null;
      longitude: number | null;
      schedule_id: string | null;
    };
    Insert: {
      id?: string;
      tenant_id: string;
      customer_id: string;
      visit_date: string;
      notes?: string | null;
      outcome?: 'successful' | 'unsuccessful' | 'rescheduled' | 'cancelled' | 'pending' | null;
      photos_url?: string[] | null;
      created_by: string;
      created_at?: string;
      latitude?: number | null;
      longitude?: number | null;
      schedule_id?: string | null;
    };
    Update: {
      id?: string;
      tenant_id?: string;
      customer_id?: string;
      visit_date?: string;
      notes?: string | null;
      outcome?: 'successful' | 'unsuccessful' | 'rescheduled' | 'cancelled' | 'pending' | null;
      photos_url?: string[] | null;
      created_by?: string;
      created_at?: string;
      latitude?: number | null;
      longitude?: number | null;
      schedule_id?: string | null;
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