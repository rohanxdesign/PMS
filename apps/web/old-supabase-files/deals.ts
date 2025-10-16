import { supabase } from '@/app/lib/supabaseClient';

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
  // Enhanced fields
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

export interface CreateDealData {
  lead_id: string;
  title: string;
  amount: number;
  currency: 'INR' | 'NPR';
  stage: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner: string;
  expected_close_date?: string;
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

export interface UpdateDealData {
  title?: string;
  amount?: number;
  currency?: 'INR' | 'NPR';
  stage?: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner?: string;
  expected_close_date?: string;
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

// Create a new deal
export async function createDeal(dealData: CreateDealData) {
  const { data, error } = await supabase
    .from('deals')
    .insert([{
      ...dealData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  // Update lead's total deals and amount
  await updateLeadDealStats(dealData.lead_id);
  
  return data as Deal;
}

// Update deal
export async function updateDeal(dealId: string, updates: UpdateDealData) {
  const { data, error } = await supabase
    .from('deals')
    .update({ 
      ...updates, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', dealId)
    .select()
    .single();
  
  if (error) throw error;
  
  // Update lead's total deals and amount if amount changed
  if (updates.amount !== undefined) {
    await updateLeadDealStats(data.lead_id);
  }
  
  return data as Deal;
}

// Delete deal
export async function deleteDeal(dealId: string) {
  // Get deal info before deletion to update lead stats
  const { data: deal } = await supabase
    .from('deals')
    .select('lead_id')
    .eq('id', dealId)
    .single();
  
  const { error } = await supabase
    .from('deals')
    .delete()
    .eq('id', dealId);
  
  if (error) throw error;
  
  // Update lead's total deals and amount
  if (deal) {
    await updateLeadDealStats(deal.lead_id);
  }
}

// Move deal to new stage
export async function moveDealStage(dealId: string, newStage: Deal['stage'], userId: string, reason?: string) {
  // Get current deal data
  const { data: currentDeal, error: fetchError } = await supabase
    .from('deals')
    .select('*')
    .eq('id', dealId)
    .single();
  
  if (fetchError) throw fetchError;
  
  // Update deal stage
  const { data, error } = await supabase
    .from('deals')
    .update({ 
      stage: newStage,
      updated_at: new Date().toISOString() 
    })
    .eq('id', dealId)
    .select()
    .single();
  
  if (error) throw error;
  
  // Log stage change in deal_history
  await logDealHistory(dealId, userId, 'stage', currentDeal.stage, newStage, reason);
  
  return data as Deal;
}

// Get deals by lead
export async function getDealsByLead(leadId: string) {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Deal[];
}

// Get deals by owner
export async function getDealsByOwner(ownerId: string) {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('owner', ownerId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Deal[];
}

// Get deals by stage
export async function getDealsByStage(stage: Deal['stage']) {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('stage', stage)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Deal[];
}

// Calculate deal probability based on stage and other factors
export async function calculateDealProbability(dealId: string) {
  const { data: deal, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', dealId)
    .single();
  
  if (error) throw error;
  
  // Base probability by stage
  const stageProbabilities = {
    'Meeting booked': 20,
    'Proposal': 40,
    'Negotiation': 60,
    'Won': 100,
    'Lost': 0
  };
  
  let probability = stageProbabilities[deal.stage] || 0;
  
  // Adjust based on other factors
  if (deal.expected_close_date) {
    const closeDate = new Date(deal.expected_close_date);
    const today = new Date();
    const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    // If closing soon, increase probability
    if (daysUntilClose <= 7 && daysUntilClose > 0) {
      probability = Math.min(probability + 10, 90);
    }
    // If overdue, decrease probability
    else if (daysUntilClose < 0) {
      probability = Math.max(probability - 20, 0);
    }
  }
  
  // Update deal with calculated probability
  const { error: updateError } = await supabase
    .from('deals')
    .update({ 
      probability,
      updated_at: new Date().toISOString() 
    })
    .eq('id', dealId);
  
  if (updateError) throw updateError;
  
  return probability;
}

// Get pipeline value (sum of all active deals)
export async function getPipelineValue(ownerId?: string) {
  let query = supabase
    .from('deals')
    .select('amount, currency, probability')
    .in('stage', ['Meeting booked', 'Proposal', 'Negotiation']);
  
  if (ownerId) {
    query = query.eq('owner', ownerId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Calculate weighted pipeline value
  const pipelineValue = data?.reduce((total, deal) => {
    const weightedAmount = (deal.amount * (deal.probability || 0)) / 100;
    return total + weightedAmount;
  }, 0) || 0;
  
  return pipelineValue;
}

// Get deals closing soon (within next 7 days)
export async function getDealsClosingSoon(ownerId?: string) {
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  let query = supabase
    .from('deals')
    .select('*')
    .gte('expected_close_date', today.toISOString())
    .lte('expected_close_date', nextWeek.toISOString())
    .in('stage', ['Meeting booked', 'Proposal', 'Negotiation']);
  
  if (ownerId) {
    query = query.eq('owner', ownerId);
  }
  
  const { data, error } = await query.order('expected_close_date', { ascending: true });
  
  if (error) throw error;
  return data as Deal[];
}

// Get overdue deals
export async function getOverdueDeals(ownerId?: string) {
  const today = new Date();
  
  let query = supabase
    .from('deals')
    .select('*')
    .lt('expected_close_date', today.toISOString())
    .in('stage', ['Meeting booked', 'Proposal', 'Negotiation']);
  
  if (ownerId) {
    query = query.eq('owner', ownerId);
  }
  
  const { data, error } = await query.order('expected_close_date', { ascending: true });
  
  if (error) throw error;
  return data as Deal[];
}

// Helper function to update lead's deal statistics
async function updateLeadDealStats(leadId: string) {
  // Get all deals for this lead
  const { data: deals, error: dealsError } = await supabase
    .from('deals')
    .select('amount')
    .eq('lead_id', leadId);
  
  if (dealsError) throw dealsError;
  
  const totalDeals = deals?.length || 0;
  const totalAmount = deals?.reduce((sum, deal) => sum + deal.amount, 0) || 0;
  
  // Update lead
  const { error: updateError } = await supabase
    .from('leads')
    .update({ 
      total_deals: totalDeals,
      total_amount: totalAmount,
      updated_at: new Date().toISOString()
    })
    .eq('id', leadId);
  
  if (updateError) throw updateError;
}

// Helper function to log deal history
async function logDealHistory(dealId: string, userId: string, fieldName: string, oldValue: any, newValue: any, reason?: string) {
  const { error } = await supabase
    .from('deal_history')
    .insert([{
      deal_id: dealId,
      user_id: userId,
      field_name: fieldName,
      old_value: oldValue?.toString(),
      new_value: newValue?.toString(),
      change_reason: reason,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
}
