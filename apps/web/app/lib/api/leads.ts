import { supabase } from '@/app/lib/supabaseClient';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  company?: string;
  country: 'India' | 'Nepal';
  stage: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner: string;
  totalAmount: number;
  totalDeals: number;
  remarks?: string;
  assigned_date: string;
  created_at: string;
  updated_at: string;
  // Enhanced fields
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  last_contacted_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  lost_reason?: string;
  owner_id?: string;
}

export interface CreateLeadData {
  name: string;
  email?: string;
  company?: string;
  country: 'India' | 'Nepal';
  stage: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner: string;
  remarks?: string;
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  owner_id?: string;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  company?: string;
  country?: 'India' | 'Nepal';
  stage?: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner?: string;
  remarks?: string;
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  last_contacted_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  lost_reason?: string;
  owner_id?: string;
}

export interface Deal {
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
}

// Fetch all leads
export async function fetchLeads() {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  // Transform snake_case to camelCase
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Fetch all deals
export async function fetchDeals() {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Deal[];
}

// Get count of new leads assigned today
export async function getNewLeadsCountToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { count, error } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('stage', 'New')
    .gte('assigned_date', today.toISOString());
  
  if (error) throw error;
  return count || 0;
}

// Get count of KTs pending
export async function getKTPendingCount() {
  const { count, error } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .in('stage', ['Meeting booked', 'Proposal']);
  
  if (error) throw error;
  return count || 0;
}

// Create a new lead
export async function createLead(leadData: CreateLeadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([{
      ...leadData,
      total_amount: 0,
      total_deals: 0,
      assigned_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  // Transform snake_case to camelCase
  return {
    ...data,
    totalAmount: data.total_amount,
    totalDeals: data.total_deals
  } as Lead;
}

// Update lead
export async function updateLead(leadId: string, updates: UpdateLeadData) {
  const { data, error } = await supabase
    .from('leads')
    .update({ 
      ...updates, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', leadId)
    .select()
    .single();
  
  if (error) throw error;
  
  // Transform snake_case to camelCase
  return {
    ...data,
    totalAmount: data.total_amount,
    totalDeals: data.total_deals
  } as Lead;
}

// Delete lead
export async function deleteLead(leadId: string) {
  const { error } = await supabase
    .from('leads')
    .delete()
    .eq('id', leadId);
  
  if (error) throw error;
}

// Assign lead to user
export async function assignLead(leadId: string, userId: string, assignedBy: string, reason?: string) {
  // Update lead owner
  const { error: updateError } = await supabase
    .from('leads')
    .update({ 
      owner_id: userId,
      updated_at: new Date().toISOString()
    })
    .eq('id', leadId);
  
  if (updateError) throw updateError;
  
  // Log assignment in lead_assignments table
  const { error: assignmentError } = await supabase
    .from('lead_assignments')
    .insert([{
      lead_id: leadId,
      assigned_to: userId,
      assigned_by: assignedBy,
      reason: reason || 'Manual assignment',
      assigned_at: new Date().toISOString()
    }]);
  
  if (assignmentError) throw assignmentError;
}

// Get leads by owner
export async function getLeadsByOwner(ownerId: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Get leads by stage
export async function getLeadsByStage(stage: Lead['stage']) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('stage', stage)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Search leads
export async function searchLeads(query: string) {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .or(`name.ilike.%${query}%,company.ilike.%${query}%,email.ilike.%${query}%,owner.ilike.%${query}%`)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Get leads for today (follow-up due today)
export async function getLeadsForToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .gte('next_follow_up_date', today.toISOString())
    .lt('next_follow_up_date', tomorrow.toISOString())
    .order('next_follow_up_date', { ascending: true });
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Get leads for this week
export async function getLeadsForWeek() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .gte('next_follow_up_date', today.toISOString())
    .lte('next_follow_up_date', weekEnd.toISOString())
    .order('next_follow_up_date', { ascending: true });
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Bulk import leads from CSV data
export async function bulkImportLeads(leadsData: CreateLeadData[]) {
  const leadsWithDefaults = leadsData.map(lead => ({
    ...lead,
    total_amount: 0,
    total_deals: 0,
    assigned_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));
  
  const { data, error } = await supabase
    .from('leads')
    .insert(leadsWithDefaults)
    .select();
  
  if (error) throw error;
  
  return data?.map(lead => ({
    ...lead,
    totalAmount: lead.total_amount,
    totalDeals: lead.total_deals
  })) as Lead[];
}

// Update lead stage (enhanced version)
export async function updateLeadStage(leadId: string, stage: Lead['stage'], lostReason?: string) {
  const updateData: any = { 
    stage, 
    updated_at: new Date().toISOString() 
  };
  
  if (stage === 'Lost' && lostReason) {
    updateData.lost_reason = lostReason;
  }
  
  const { error } = await supabase
    .from('leads')
    .update(updateData)
    .eq('id', leadId);
  
  if (error) throw error;
}
