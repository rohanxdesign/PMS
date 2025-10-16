"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock data interfaces
interface Lead {
  id: string;
  name: string;
  email?: string;
  company?: string;
  country: 'India' | 'Nepal';
  stage: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'KT Pending' | 'Won' | 'Lost';
  owner: string;
  totalAmount: number;
  totalDeals: number;
  remarks?: string;
  assigned_date: string;
  created_at: string;
  updated_at: string;
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  last_contacted_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  lost_reason?: string;
  owner_id?: string;
}

interface Deal {
  id: string;
  lead_id: string;
  title: string;
  amount: number;
  currency: 'INR' | 'NPR';
  stage: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner: string;
  expected_close_date?: string;
  created_at: string;
  updated_at: string;
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

interface MockLeadsContextType {
  leads: Lead[];
  deals: Deal[];
  addLead: (lead: Omit<Lead, 'id'>) => Lead;
  addDeal: (deal: Omit<Deal, 'id'>) => Deal;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<void>;
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>;
  getLeadById: (id: string) => Lead | undefined;
  getDealsByLeadId: (leadId: string) => Deal[];
  refreshLeads: () => void;
  refreshDeals: () => void;
  isLoading: boolean;
  error: string | null;
}

// Mock data - BD Associate Status Distribution
const mockLeads: Lead[] = [
  // New Assigned Leads (2)
  {
    id: '1',
    name: 'Sadhvi Shakti Puri Everest Tea trader',
    email: 'sadhvi@everesttea.com',
    company: 'Everest Tea Company',
    country: 'India',
    stage: 'New',
    owner: 'John Doe',
    totalAmount: 150000,
    totalDeals: 3,
    remarks: 'Interested in bulk order',
    source: 'Website',
    priority: 'High',
    temperature: 'Warm',
    owner_id: 'user1',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Arjun Singh',
    email: 'arjun@techstartup.com',
    company: 'TechStartup India',
    country: 'India',
    stage: 'New',
    owner: 'Sarah Wilson',
    totalAmount: 85000,
    totalDeals: 1,
    remarks: 'Initial contact made',
    source: 'Cold Call',
    priority: 'Medium',
    temperature: 'Cold',
    owner_id: 'user2',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Sales Qualified (2)
  {
    id: '3',
    name: 'Priya Sharma',
    email: 'priya@startup.com',
    company: 'StartupXYZ',
    country: 'Nepal',
    stage: 'Qualified',
    owner: 'Mike Johnson',
    totalAmount: 75000,
    totalDeals: 1,
    remarks: 'Budget approved',
    source: 'Cold Call',
    priority: 'Low',
    temperature: 'Warm',
    owner_id: 'user3',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Rajesh Kumar',
    email: 'rajesh@techcorp.com',
    company: 'TechCorp Solutions',
    country: 'India',
    stage: 'Qualified',
    owner: 'Jane Smith',
    totalAmount: 200000,
    totalDeals: 2,
    remarks: 'Technical evaluation completed',
    source: 'Referral',
    priority: 'Medium',
    temperature: 'Hot',
    owner_id: 'user4',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Negotiation (1)
  {
    id: '5',
    name: 'Amit Patel',
    email: 'amit@enterprise.com',
    company: 'Enterprise Corp',
    country: 'India',
    stage: 'Negotiation',
    owner: 'Sarah Wilson',
    totalAmount: 300000,
    totalDeals: 4,
    remarks: 'Final pricing discussion',
    source: 'Trade Show',
    priority: 'Urgent',
    temperature: 'Hot',
    owner_id: 'user5',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // In Progress (1)
  {
    id: '6',
    name: 'Deepika Mehta',
    email: 'deepika@fintech.com',
    company: 'FinTech Solutions',
    country: 'India',
    stage: 'Proposal',
    owner: 'David Brown',
    totalAmount: 180000,
    totalDeals: 2,
    remarks: 'Proposal under review',
    source: 'Website',
    priority: 'High',
    temperature: 'Warm',
    owner_id: 'user6',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // KT Pending (3)
  {
    id: '7',
    name: 'Sunita Thapa',
    email: 'sunita@nepaltech.com',
    company: 'Nepal Tech Solutions',
    country: 'Nepal',
    stage: 'KT Pending',
    owner: 'David Brown',
    totalAmount: 120000,
    totalDeals: 2,
    remarks: 'Knowledge transfer scheduled',
    source: 'Website',
    priority: 'High',
    temperature: 'Warm',
    owner_id: 'user7',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Vikram Joshi',
    email: 'vikram@healthcare.com',
    company: 'Healthcare Plus',
    country: 'India',
    stage: 'KT Pending',
    owner: 'Mike Johnson',
    totalAmount: 250000,
    totalDeals: 3,
    remarks: 'KT session planned for next week',
    source: 'Referral',
    priority: 'Medium',
    temperature: 'Hot',
    owner_id: 'user8',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: 'Anita Gurung',
    email: 'anita@retail.com',
    company: 'Retail Chain Nepal',
    country: 'Nepal',
    stage: 'KT Pending',
    owner: 'Jane Smith',
    totalAmount: 95000,
    totalDeals: 1,
    remarks: 'Awaiting KT completion',
    source: 'Cold Call',
    priority: 'Low',
    temperature: 'Warm',
    owner_id: 'user9',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  
  // Contract Won (4)
  {
    id: '10',
    name: 'Rohit Agarwal',
    email: 'rohit@manufacturing.com',
    company: 'Manufacturing Corp',
    country: 'India',
    stage: 'Won',
    owner: 'John Doe',
    totalAmount: 400000,
    totalDeals: 5,
    remarks: 'Contract signed successfully',
    source: 'Trade Show',
    priority: 'High',
    temperature: 'Hot',
    owner_id: 'user10',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '11',
    name: 'Sita Maharjan',
    email: 'sita@education.com',
    company: 'Education Hub Nepal',
    country: 'Nepal',
    stage: 'Won',
    owner: 'Sarah Wilson',
    totalAmount: 160000,
    totalDeals: 2,
    remarks: 'Deal closed last month',
    source: 'Website',
    priority: 'Medium',
    temperature: 'Warm',
    owner_id: 'user11',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '12',
    name: 'Kiran Reddy',
    email: 'kiran@logistics.com',
    company: 'Logistics Solutions',
    country: 'India',
    stage: 'Won',
    owner: 'David Brown',
    totalAmount: 220000,
    totalDeals: 3,
    remarks: 'Multi-year contract secured',
    source: 'Referral',
    priority: 'High',
    temperature: 'Hot',
    owner_id: 'user12',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '13',
    name: 'Pema Sherpa',
    email: 'pema@tourism.com',
    company: 'Tourism Nepal',
    country: 'Nepal',
    stage: 'Won',
    owner: 'Mike Johnson',
    totalAmount: 110000,
    totalDeals: 1,
    remarks: 'Seasonal contract won',
    source: 'Cold Call',
    priority: 'Low',
    temperature: 'Warm',
    owner_id: 'user13',
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockDeals: Deal[] = [
  {
    id: 'deal1',
    lead_id: '1',
    title: 'Everest Tea Bulk Order',
    amount: 150000,
    currency: 'INR',
    stage: 'Meeting booked',
    owner: 'John Doe',
    expected_close_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    probability: 75,
    next_step: 'Send proposal',
    decision_maker: 'CTO',
    deal_source: 'Website'
  },
  {
    id: 'deal2',
    lead_id: '2',
    title: 'TechCorp Enterprise License',
    amount: 200000,
    currency: 'INR',
    stage: 'Proposal',
    owner: 'Jane Smith',
    expected_close_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    probability: 60,
    next_step: 'Technical demo',
    decision_maker: 'VP Engineering',
    deal_source: 'Referral'
  },
  {
    id: 'deal3',
    lead_id: '3',
    title: 'StartupXYZ Basic Package',
    amount: 75000,
    currency: 'NPR',
    stage: 'Negotiation',
    owner: 'Mike Johnson',
    expected_close_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    probability: 85,
    next_step: 'Contract review',
    decision_maker: 'Founder',
    deal_source: 'Cold Call'
  }
];

const MockLeadsContext = createContext<MockLeadsContextType | undefined>(undefined);

export function MockLeadsProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API calls with delays
  const simulateApiCall = async <T,>(data: T, delay: number = 500): Promise<T> => {
    setIsLoading(true);
    setError(null);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(data);
      }, delay);
    });
  };

  const addLead = (leadData: Omit<Lead, 'id'>): Lead => {
    const newLead: Lead = {
      ...leadData,
      id: `lead_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const addDeal = (dealData: Omit<Deal, 'id'>): Deal => {
    const newDeal: Deal = {
      ...dealData,
      id: `deal_${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setDeals(prev => [newDeal, ...prev]);
    return newDeal;
  };

  const updateLead = async (id: string, updates: Partial<Lead>): Promise<void> => {
    await simulateApiCall(null, 300);
    
    setLeads(prev => prev.map(lead => 
      lead.id === id 
        ? { ...lead, ...updates, updated_at: new Date().toISOString() }
        : lead
    ));
  };

  const updateDeal = async (id: string, updates: Partial<Deal>): Promise<void> => {
    await simulateApiCall(null, 300);
    
    setDeals(prev => prev.map(deal => 
      deal.id === id 
        ? { ...deal, ...updates, updated_at: new Date().toISOString() }
        : deal
    ));
  };

  const getLeadById = (id: string): Lead | undefined => {
    return leads.find(lead => lead.id === id);
  };

  const getDealsByLeadId = (leadId: string): Deal[] => {
    return deals.filter(deal => deal.lead_id === leadId);
  };

  const refreshLeads = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLeads([...mockLeads]);
      setIsLoading(false);
    }, 500);
  };

  const refreshDeals = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDeals([...mockDeals]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <MockLeadsContext.Provider value={{ 
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
    </MockLeadsContext.Provider>
  );
}

export function useMockLeads() {
  const context = useContext(MockLeadsContext);
  if (context === undefined) {
    throw new Error('useMockLeads must be used within a MockLeadsProvider');
  }
  return context;
}
