import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Row } from '@/types/database';
import { useAuth } from './useAuth';

export function useUser() {
  const { session } = useAuth();
  const [user, setUser] = useState<Row<'users'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user.id) {
      setUser(null);
      setLoading(false);
      return;
    }

    async function loadUser() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        setUser(data);
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [session]);

  return {
    user,
    loading,
    refreshUser: () => {
      setLoading(true);
    },
  };
}