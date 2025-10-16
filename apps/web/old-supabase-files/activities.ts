import { supabase } from '@/app/lib/supabaseClient';

export interface Activity {
  id: string;
  lead_id?: string;
  deal_id?: string;
  user_id?: string;
  activity_type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Task' | 'Follow-up';
  subject?: string;
  description?: string;
  outcome?: string;
  duration_minutes?: number;
  scheduled_date?: string;
  completed_date?: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateActivityData {
  lead_id?: string;
  deal_id?: string;
  user_id?: string;
  activity_type: 'Call' | 'Email' | 'Meeting' | 'Note' | 'Task' | 'Follow-up';
  subject?: string;
  description?: string;
  outcome?: string;
  duration_minutes?: number;
  scheduled_date?: string;
  completed_date?: string;
  is_completed?: boolean;
}

export interface UpdateActivityData {
  subject?: string;
  description?: string;
  outcome?: string;
  duration_minutes?: number;
  scheduled_date?: string;
  completed_date?: string;
  is_completed?: boolean;
}

// Log a new activity
export async function logActivity(activityData: CreateActivityData) {
  const { data, error } = await supabase
    .from('activities')
    .insert([{
      ...activityData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  
  // If it's a completed activity, update lead's last_contacted_date
  if (activityData.is_completed && activityData.lead_id) {
    await updateLeadLastContacted(activityData.lead_id);
  }
  
  return data as Activity;
}

// Get activities by lead
export async function getActivitiesByLead(leadId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('lead_id', leadId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Activity[];
}

// Get activities by owner
export async function getActivitiesByOwner(ownerId: string, dateRange?: { start: string; end: string }) {
  let query = supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId);
  
  if (dateRange) {
    query = query
      .gte('created_at', dateRange.start)
      .lte('created_at', dateRange.end);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  
  if (error) throw error;
  return data as Activity[];
}

// Get upcoming tasks for a user
export async function getUpcomingTasks(ownerId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId)
    .eq('activity_type', 'Task')
    .eq('is_completed', false)
    .gte('scheduled_date', today.toISOString())
    .order('scheduled_date', { ascending: true });
  
  if (error) throw error;
  return data as Activity[];
}

// Get overdue tasks
export async function getOverdueTasks(ownerId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId)
    .eq('activity_type', 'Task')
    .eq('is_completed', false)
    .lt('scheduled_date', today.toISOString())
    .order('scheduled_date', { ascending: true });
  
  if (error) throw error;
  return data as Activity[];
}

// Mark task as complete
export async function markTaskComplete(taskId: string, outcome?: string) {
  const { data, error } = await supabase
    .from('activities')
    .update({ 
      is_completed: true,
      completed_date: new Date().toISOString(),
      outcome: outcome,
      updated_at: new Date().toISOString()
    })
    .eq('id', taskId)
    .select()
    .single();
  
  if (error) throw error;
  
  // Update lead's last_contacted_date if this is a lead activity
  if (data.lead_id) {
    await updateLeadLastContacted(data.lead_id);
  }
  
  return data as Activity;
}

// Update activity
export async function updateActivity(activityId: string, updates: UpdateActivityData) {
  const { data, error } = await supabase
    .from('activities')
    .update({ 
      ...updates, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', activityId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Activity;
}

// Delete activity
export async function deleteActivity(activityId: string) {
  const { error } = await supabase
    .from('activities')
    .delete()
    .eq('id', activityId);
  
  if (error) throw error;
}

// Get activities for today
export async function getActivitiesForToday(ownerId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId)
    .gte('scheduled_date', today.toISOString())
    .lt('scheduled_date', tomorrow.toISOString())
    .order('scheduled_date', { ascending: true });
  
  if (error) throw error;
  return data as Activity[];
}

// Get activities for this week
export async function getActivitiesForWeek(ownerId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 7);
  
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId)
    .gte('scheduled_date', today.toISOString())
    .lte('scheduled_date', weekEnd.toISOString())
    .order('scheduled_date', { ascending: true });
  
  if (error) throw error;
  return data as Activity[];
}

// Get activity statistics for a user
export async function getActivityStats(ownerId: string, dateRange?: { start: string; end: string }) {
  let query = supabase
    .from('activities')
    .select('activity_type, is_completed, duration_minutes')
    .eq('user_id', ownerId);
  
  if (dateRange) {
    query = query
      .gte('created_at', dateRange.start)
      .lte('created_at', dateRange.end);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  const stats = {
    total_activities: data?.length || 0,
    completed_activities: data?.filter(a => a.is_completed).length || 0,
    calls_made: data?.filter(a => a.activity_type === 'Call' && a.is_completed).length || 0,
    emails_sent: data?.filter(a => a.activity_type === 'Email' && a.is_completed).length || 0,
    meetings_held: data?.filter(a => a.activity_type === 'Meeting' && a.is_completed).length || 0,
    total_duration: data?.reduce((sum, a) => sum + (a.duration_minutes || 0), 0) || 0,
    completion_rate: 0
  };
  
  if (stats.total_activities > 0) {
    stats.completion_rate = Math.round((stats.completed_activities / stats.total_activities) * 100);
  }
  
  return stats;
}

// Get recent activities (last 10)
export async function getRecentActivities(ownerId: string) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', ownerId)
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data as Activity[];
}

// Helper function to update lead's last contacted date
async function updateLeadLastContacted(leadId: string) {
  const { error } = await supabase
    .from('leads')
    .update({ 
      last_contacted_date: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', leadId);
  
  if (error) throw error;
}
