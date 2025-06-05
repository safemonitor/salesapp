/*
  # Warehouse Management System Schema

  1. New Tables
    - `users`
      - System users with role-based access
    - `warehouses`
      - Physical warehouse locations
    - `locations`
      - Storage locations within warehouses
    - `products`
      - Product catalog
    - `inventory`
      - Current stock levels
    - `receiving`
      - Incoming inventory records
    - `picking`
      - Order picking records
    - `transfers`
      - Internal transfer records
    - `audit_log`
      - System activity tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Role-based access control
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  role text NOT NULL CHECK (role IN ('admin', 'manager', 'picker', 'receiver')),
  warehouse_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Warehouses table
CREATE TABLE IF NOT EXISTS warehouses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  address text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add foreign key to users table
ALTER TABLE users
ADD CONSTRAINT fk_warehouse
FOREIGN KEY (warehouse_id)
REFERENCES warehouses(id);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  warehouse_id uuid NOT NULL REFERENCES warehouses(id),
  zone text NOT NULL,
  aisle text NOT NULL,
  shelf text NOT NULL,
  position text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(warehouse_id, zone, aisle, shelf, position)
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sku text UNIQUE NOT NULL,
  name text NOT NULL,
  description text,
  category text,
  unit text NOT NULL,
  min_stock integer NOT NULL DEFAULT 0,
  max_stock integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id),
  location_id uuid NOT NULL REFERENCES locations(id),
  quantity integer NOT NULL DEFAULT 0,
  lot_number text,
  expiration_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, location_id, lot_number)
);

-- Receiving table
CREATE TABLE IF NOT EXISTS receiving (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  warehouse_id uuid NOT NULL REFERENCES warehouses(id),
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  received_by uuid REFERENCES users(id),
  received_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Receiving items table
CREATE TABLE IF NOT EXISTS receiving_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receiving_id uuid NOT NULL REFERENCES receiving(id),
  product_id uuid NOT NULL REFERENCES products(id),
  expected_quantity integer NOT NULL,
  received_quantity integer,
  lot_number text,
  expiration_date date,
  location_id uuid REFERENCES locations(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Picking table
CREATE TABLE IF NOT EXISTS picking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  warehouse_id uuid NOT NULL REFERENCES warehouses(id),
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  picked_by uuid REFERENCES users(id),
  picked_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Picking items table
CREATE TABLE IF NOT EXISTS picking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  picking_id uuid NOT NULL REFERENCES picking(id),
  product_id uuid NOT NULL REFERENCES products(id),
  location_id uuid NOT NULL REFERENCES locations(id),
  requested_quantity integer NOT NULL,
  picked_quantity integer,
  lot_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transfers table
CREATE TABLE IF NOT EXISTS transfers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number text UNIQUE NOT NULL,
  from_location_id uuid NOT NULL REFERENCES locations(id),
  to_location_id uuid NOT NULL REFERENCES locations(id),
  status text NOT NULL CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  initiated_by uuid NOT NULL REFERENCES users(id),
  completed_by uuid REFERENCES users(id),
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Transfer items table
CREATE TABLE IF NOT EXISTS transfer_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transfer_id uuid NOT NULL REFERENCES transfers(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  lot_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  old_values jsonb,
  new_values jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE receiving ENABLE ROW LEVEL SECURITY;
ALTER TABLE receiving_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE picking ENABLE ROW LEVEL SECURITY;
ALTER TABLE picking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can manage users"
  ON users
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view warehouses"
  ON warehouses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view locations"
  ON locations
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view products"
  ON products
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view inventory"
  ON inventory
  FOR SELECT
  TO authenticated
  USING (true);

-- Create functions for audit logging
CREATE OR REPLACE FUNCTION audit_log_insert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    table_name,
    record_id,
    new_values
  ) VALUES (
    auth.uid(),
    'INSERT',
    TG_TABLE_NAME,
    NEW.id,
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION audit_log_update()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  ) VALUES (
    auth.uid(),
    'UPDATE',
    TG_TABLE_NAME,
    NEW.id,
    to_jsonb(OLD),
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION audit_log_delete()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_values
  ) VALUES (
    auth.uid(),
    'DELETE',
    TG_TABLE_NAME,
    OLD.id,
    to_jsonb(OLD)
  );
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for audit logging
CREATE TRIGGER audit_inventory_insert
  AFTER INSERT ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_insert();

CREATE TRIGGER audit_inventory_update
  AFTER UPDATE ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_update();

CREATE TRIGGER audit_inventory_delete
  AFTER DELETE ON inventory
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_delete();

-- Add similar triggers for other important tables
CREATE TRIGGER audit_receiving_insert
  AFTER INSERT ON receiving
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_insert();

CREATE TRIGGER audit_picking_insert
  AFTER INSERT ON picking
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_insert();

CREATE TRIGGER audit_transfers_insert
  AFTER INSERT ON transfers
  FOR EACH ROW
  EXECUTE FUNCTION audit_log_insert();