import { supabase } from '@/utils/supabase';
import { Row, Insert, Update } from '@/types/database';

export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProductService] Error fetching products:', error);
    return { data: null, error };
  }
}

export async function getProductById(id: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProductService] Error fetching product:', error);
    return { data: null, error };
  }
}

export async function getProductBySku(sku: string) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('sku', sku)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProductService] Error fetching product by SKU:', error);
    return { data: null, error };
  }
}

export async function createProduct(product: Insert<'products'>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProductService] Error creating product:', error);
    return { data: null, error };
  }
}

export async function updateProduct(id: string, updates: Update<'products'>) {
  try {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('[ProductService] Error updating product:', error);
    return { data: null, error };
  }
}

export async function deleteProduct(id: string) {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('[ProductService] Error deleting product:', error);
    return { error };
  }
}