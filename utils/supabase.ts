import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { Database } from '@/types/database';

const ExpoSecureStoreAdapter = {
  getItem: async (key: string) => {
    console.log('[Storage] Getting item:', key);
    try {
      const value = await SecureStore.getItemAsync(key);
      console.log('[Storage] Got item:', key, value ? 'Found' : 'Not found');
      return value;
    } catch (error) {
      console.error('[Storage] Error getting item:', key, error);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    console.log('[Storage] Setting item:', key);
    try {
      await SecureStore.setItemAsync(key, value);
      console.log('[Storage] Set item successfully:', key);
    } catch (error) {
      console.error('[Storage] Error setting item:', key, error);
    }
  },
  removeItem: async (key: string) => {
    console.log('[Storage] Removing item:', key);
    try {
      await SecureStore.deleteItemAsync(key);
      console.log('[Storage] Removed item successfully:', key);
    } catch (error) {
      console.error('[Storage] Error removing item:', key, error);
    }
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('[Supabase] Missing environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
}

console.log('[Supabase] Initializing client with URL:', supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Platform.OS === 'web' ? localStorage : ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    debug: true, // Enable debug logging for auth
    onAuthStateChange: (event, session) => {
      console.log('[Supabase] Auth state changed:', event, session ? 'Session exists' : 'No session');
    },
  },
});