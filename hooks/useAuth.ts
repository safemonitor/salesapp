import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted.current) {
        setSession(session);
        setLoading(false);
      }
    });

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted.current) {
        setSession(session);
      }
    });

    // Cleanup function
    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    loading,
    signIn: (email: string, password: string) => 
      supabase.auth.signInWithPassword({ email, password }),
    signUp: (email: string, password: string) => 
      supabase.auth.signUp({ email, password }),
    signOut: () => supabase.auth.signOut(),
  };
}