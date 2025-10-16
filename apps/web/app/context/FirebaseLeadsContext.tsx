"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchLeads, fetchDeals, updateLeadStage, Lead, Deal, subscribeToLeads, subscribeToDeals } from '@/app/lib/api/firebase/leads';
import { fetchDeals as fetchDealsFromDeals, Deal as DealType } from '@/app/lib/api/firebase/deals';

interface FirebaseLeadsContextType {
  leads: Lead[];
  deals: DealType[];
  addLead: (lead: Omit<Lead, 'id'>) => Lead;
  addDeal: (deal: Omit<DealType, 'id'>) => DealType;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  updateDeal: (id: string, updates: Partial<DealType>) => void;
  getLeadById: (id: string) => Lead | undefined;
  getDealsByLeadId: (leadId: string) => DealType[];
  refreshLeads: () => Promise<void>;
  refreshDeals: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const FirebaseLeadsContext = createContext<FirebaseLeadsContextType | undefined>(undefined);

export function FirebaseLeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [deals, setDeals] = useState<DealType[]>([]);
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
      const data = await fetchDealsFromDeals();
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
    const unsubscribeLeads = subscribeToLeads((newLeads) => {
      setLeads(newLeads);
    });

    // Subscribe to deals changes
    const unsubscribeDeals = subscribeToDeals((newDeals) => {
      setDeals(newDeals);
    });

    // Cleanup subscriptions
    return () => {
      unsubscribeLeads();
      unsubscribeDeals();
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

  const addDeal = (dealData: Omit<DealType, 'id'>) => {
    const newDeal: DealType = {
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

  const updateDeal = (id: string, updates: Partial<DealType>) => {
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
    <FirebaseLeadsContext.Provider value={{ 
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
    </FirebaseLeadsContext.Provider>
  );
}

export function useFirebaseLeads() {
  const context = useContext(FirebaseLeadsContext);
  if (context === undefined) {
    throw new Error('useFirebaseLeads must be used within a FirebaseLeadsProvider');
  }
  return context;
}
