import { useState, useEffect } from 'react';
import { useMockLeads } from '@/app/context/MockLeadsContext';

export interface Counts {
  newLeads: number;
  ktPending: number;
}

export function useMockCounts() {
  const { leads } = useMockLeads();
  const [counts, setCounts] = useState<Counts>({ newLeads: 0, ktPending: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const calculateCounts = () => {
      try {
        setIsLoading(true);
        setError(null);

        // Calculate new leads assigned today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const newLeads = leads.filter(lead => 
          lead.stage === 'New' && 
          new Date(lead.assigned_date) >= today
        ).length;

        // Calculate KT pending leads
        const ktPending = leads.filter(lead => 
          lead.stage === 'KT Pending'
        ).length;

        setCounts({ newLeads, ktPending });
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to calculate counts');
        setIsLoading(false);
      }
    };

    calculateCounts();
  }, [leads]);

  return { counts, isLoading, error };
}
