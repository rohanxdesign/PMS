"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchLeads, fetchDeals, updateLeadStage, Lead, Deal } from '@/app/lib/api/leads';
import { supabase } from '@/app/lib/supabaseClient';

interface LeadsContextType {
  leads: Lead[];
  deals: Deal[];
  addLead: (lead: Omit<Lead, 'id'>) => Lead;
  addDeal: (deal: Omit<Deal, 'id'>) => Deal;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
  getLeadById: (id: string) => Lead | undefined;
  getDealsByLeadId: (leadId: string) => Deal[];
  refreshLeads: () => Promise<void>;
  refreshDeals: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshLeads = async () => {
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    }
  };

  const refreshDeals = async () => {
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch deals');
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await Promise.all([refreshLeads(), refreshDeals()]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Real-time subscriptions
  useEffect(() => {
    // Subscribe to leads changes
    const leadsSubscription = supabase
      .channel('leads-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          console.log('Leads change received:', payload);
          refreshLeads();
        }
      )
      .subscribe();

    // Subscribe to deals changes
    const dealsSubscription = supabase
      .channel('deals-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'deals' },
        (payload) => {
          console.log('Deals change received:', payload);
          refreshDeals();
        }
      )
      .subscribe();

    // Subscribe to activities changes
    const activitiesSubscription = supabase
      .channel('activities-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'activities' },
        (payload) => {
          console.log('Activities change received:', payload);
          // Refresh leads to update last_contacted_date
          refreshLeads();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      leadsSubscription.unsubscribe();
      dealsSubscription.unsubscribe();
      activitiesSubscription.unsubscribe();
    };
  }, []);

  const addLead = (leadData: Omit<Lead, 'id'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setLeads(prev => [...prev, newLead]);
    return newLead;
  };

  const addDeal = (dealData: Omit<Deal, 'id'>) => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setDeals(prev => [...prev, newDeal]);
    
    // Update the lead's total deals and amount
    const lead = leads.find(l => l.id === dealData.lead_id);
    if (lead) {
      const updatedLeads = leads.map(l => {
        if (l.id === dealData.lead_id) {
          return {
            ...l,
            totalDeals: l.totalDeals + 1,
            totalAmount: l.totalAmount + Number(dealData.amount),
          };
        }
        return l;
      });
      setLeads(updatedLeads);
    }
    
    return newDeal;
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      if (updates.stage) {
        await updateLeadStage(id, updates.stage);
      }
      
      // Update local state
      setLeads(prev => prev.map(lead => 
        lead.id === id ? { ...lead, ...updates, updated_at: new Date().toISOString() } : lead
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update lead');
    }
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals(prev => prev.map(deal => 
      deal.id === id ? { ...deal, ...updates, updated_at: new Date().toISOString() } : deal
    ));
  };

  const getLeadById = (id: string) => {
    return leads.find(lead => lead.id === id);
  };

  const getDealsByLeadId = (leadId: string) => {
    return deals.filter(deal => deal.lead_id === leadId);
  };

  return (
    <LeadsContext.Provider value={{ 
      leads, 
      deals, 
      addLead, 
      addDeal, 
      updateLead, 
      updateDeal, 
      getLeadById, 
      getDealsByLeadId,
      refreshLeads,
      refreshDeals,
      isLoading,
      error
    }}>
      {children}
    </LeadsContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}
