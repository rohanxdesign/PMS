import { useState, useEffect } from 'react';
import { getNewLeadsCountToday, getKTPendingCount } from '@/app/lib/api/firebase/leads';

export interface Counts {
  newLeads: number;
  ktPending: number;
}

export function useFirebaseCounts() {
  const [counts, setCounts] = useState<Counts>({ newLeads: 0, ktPending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCounts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [newLeadsCount, ktPendingCount] = await Promise.all([
        getNewLeadsCountToday(),
        getKTPendingCount()
      ]);
      
      setCounts({
        newLeads: newLeadsCount,
        ktPending: ktPendingCount
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch counts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshCounts();
  }, []);

  return {
    counts,
    isLoading,
    error,
    refreshCounts
  };
}
