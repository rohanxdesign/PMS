"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { sampleLeadsINandNP, sampleDeals, type SampleLead, type SampleDeal } from '@/app/data/sample';

interface LeadsContextType {
  leads: SampleLead[];
  deals: SampleDeal[];
  addLead: (lead: Omit<SampleLead, 'id'>) => SampleLead;
  addDeal: (deal: Omit<SampleDeal, 'id'>) => SampleDeal;
  updateLead: (id: string, updates: Partial<SampleLead>) => void;
  updateDeal: (id: string, updates: Partial<SampleDeal>) => void;
  getLeadById: (id: string) => SampleLead | undefined;
  getDealsByLeadId: (leadId: string) => SampleDeal[];
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export function LeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<SampleLead[]>(sampleLeadsINandNP);
  const [deals, setDeals] = useState<SampleDeal[]>(sampleDeals);

  const addLead = (leadData: Omit<SampleLead, 'id'>) => {
    const newLead: SampleLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
    };
    setLeads(prev => [...prev, newLead]);
    return newLead;
  };

  const addDeal = (dealData: Omit<SampleDeal, 'id'>) => {
    const newDeal: SampleDeal = {
      ...dealData,
      id: `deal-${Date.now()}`,
    };
    setDeals(prev => [...prev, newDeal]);
    
    // Update the lead's total deals and amount
    const lead = leads.find(l => l.id === dealData.leadId);
    if (lead) {
      const updatedLeads = leads.map(l => {
        if (l.id === dealData.leadId) {
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

  const updateLead = (id: string, updates: Partial<SampleLead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === id ? { ...lead, ...updates } : lead
    ));
  };

  const updateDeal = (id: string, updates: Partial<SampleDeal>) => {
    setDeals(prev => prev.map(deal => 
      deal.id === id ? { ...deal, ...updates } : deal
    ));
  };

  const getLeadById = (id: string) => {
    return leads.find(lead => lead.id === id);
  };

  const getDealsByLeadId = (leadId: string) => {
    return deals.filter(deal => deal.leadId === leadId);
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
      getDealsByLeadId 
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
