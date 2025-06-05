import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    console.log('[Auth] Setting up auth hook');
    mounted.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('[Auth] Error getting initial session:', error);
      } else {
        console.log('[Auth] Initial session:', session ? 'Found' : 'Not found');
      }

      if (mounted.current) {
        setSession(session);
        setLoading(false);
      }
    });

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] Auth state change event:', event);
      
      if (mounted.current) {
        setSession(session);
        console.log('[Auth] Session updated:', session ? 'Active' : 'None');
      }
    });

    // Cleanup function
    return () => {
      console.log('[Auth] Cleaning up auth hook');
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    loading,
    signIn: async (email: string, password: string) => {
      console.log('[Auth] Attempting sign in:', email);
      try {
        const result = await supabase.auth.signInWithPassword({ email, password });
        if (result.error) {
          console.error('[Auth] Sign in error:', result.error);
        } else {
          console.log('[Auth] Sign in successful');
        }
        return result;
      } catch (error) {
        console.error('[Auth] Unexpected sign in error:', error);
        throw error;
      }
    },
    signUp: async (email: string, password: string) => {
      console.log('[Auth] Attempting sign up:', email);
      try {
        const result = await supabase.auth.signUp({ email, password });
        if (result.error) {
          console.error('[Auth] Sign up error:', result.error);
        } else {
          console.log('[Auth] Sign up successful');
        }
        return result;
      } catch (error) {
        console.error('[Auth] Unexpected sign up error:', error);
        throw error;
      }
    },
    signOut: async () => {
      console.log('[Auth] Attempting sign out');
      try {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('[Auth] Sign out error:', error);
        } else {
          console.log('[Auth] Sign out successful');
        }
        return { error };
      } catch (error) {
        console.error('[Auth] Unexpected sign out error:', error);
        throw error;
      }
    },
  };
}