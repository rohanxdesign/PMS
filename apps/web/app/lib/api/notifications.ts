import { supabase } from '@/app/lib/supabaseClient';

export interface Notification {
  id: string;
  user_id: string;
  type: 'lead_assigned' | 'deal_stage_change' | 'task_due' | 'meeting_reminder' | 'system' | 'team_update';
  title: string;
  message: string;
  data?: any; // JSON data for additional context
  is_read: boolean;
  created_at: string;
  read_at?: string;
}

export interface NotificationPreferences {
  id: string;
  user_id: string;
  email_notifications: boolean;
  push_notifications: boolean;
  lead_assigned: boolean;
  deal_stage_change: boolean;
  task_due: boolean;
  meeting_reminder: boolean;
  system_updates: boolean;
  team_updates: boolean;
  created_at: string;
  updated_at: string;
}

// Create notification
export async function createNotification(notificationData: Omit<Notification, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert([{
      ...notificationData,
      created_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as Notification;
}

// Get notifications for user
export async function getNotifications(userId: string, limit: number = 50) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data as Notification[];
}

// Get unread notifications count
export async function getUnreadNotificationsCount(userId: string) {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_read', false);
  
  if (error) throw error;
  return count || 0;
}

// Mark notification as read
export async function markNotificationAsRead(notificationId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ 
      is_read: true,
      read_at: new Date().toISOString()
    })
    .eq('id', notificationId)
    .select()
    .single();
  
  if (error) throw error;
  return data as Notification;
}

// Mark all notifications as read for user
export async function markAllNotificationsAsRead(userId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ 
      is_read: true,
      read_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('is_read', false);
  
  if (error) throw error;
}

// Delete notification
export async function deleteNotification(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);
  
  if (error) throw error;
}

// Get notification preferences
export async function getNotificationPreferences(userId: string) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
  
  return data as NotificationPreferences | null;
}

// Update notification preferences
export async function updateNotificationPreferences(userId: string, preferences: Partial<NotificationPreferences>) {
  const { data, error } = await supabase
    .from('notification_preferences')
    .upsert([{
      user_id: userId,
      ...preferences,
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as NotificationPreferences;
}

// Create default notification preferences
export async function createDefaultNotificationPreferences(userId: string) {
  const defaultPreferences: Omit<NotificationPreferences, 'id' | 'created_at' | 'updated_at'> = {
    user_id: userId,
    email_notifications: true,
    push_notifications: true,
    lead_assigned: true,
    deal_stage_change: true,
    task_due: true,
    meeting_reminder: true,
    system_updates: true,
    team_updates: false
  };
  
  return updateNotificationPreferences(userId, defaultPreferences);
}

// Send lead assigned notification
export async function notifyLeadAssigned(leadId: string, assignedToUserId: string, assignedByUserId: string) {
  // Get lead details
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('name, company')
    .eq('id', leadId)
    .single();
  
  if (leadError || !lead) return;
  
  // Get assigned by user details
  const { data: assignedBy, error: userError } = await supabase
    .from('users')
    .select('full_name')
    .eq('id', assignedByUserId)
    .single();
  
  if (userError || !assignedBy) return;
  
  const title = 'New Lead Assigned';
  const message = `${assignedBy.full_name} assigned you a new lead: ${lead.name}${lead.company ? ` (${lead.company})` : ''}`;
  
  return createNotification({
    user_id: assignedToUserId,
    type: 'lead_assigned',
    title,
    message,
    data: { lead_id: leadId, assigned_by: assignedByUserId },
    is_read: false
  });
}

// Send deal stage change notification
export async function notifyDealStageChange(dealId: string, newStage: string, userId: string) {
  // Get deal details
  const { data: deal, error: dealError } = await supabase
    .from('deals')
    .select('title, leads!inner(name, company)')
    .eq('id', dealId)
    .single();
  
  if (dealError || !deal) return;
  
  const lead = deal.leads;
  const title = 'Deal Stage Updated';
  const message = `Deal "${deal.title}" for ${lead.name}${lead.company ? ` (${lead.company})` : ''} moved to ${newStage}`;
  
  return createNotification({
    user_id: userId,
    type: 'deal_stage_change',
    title,
    message,
    data: { deal_id: dealId, new_stage: newStage },
    is_read: false
  });
}

// Send task due notification
export async function notifyTaskDue(taskId: string, userId: string) {
  // Get task details
  const { data: task, error: taskError } = await supabase
    .from('activities')
    .select('subject, scheduled_date, leads!inner(name, company)')
    .eq('id', taskId)
    .single();
  
  if (taskError || !task) return;
  
  const lead = task.leads;
  const title = 'Task Due Soon';
  const message = `Task "${task.subject}" for ${lead.name}${lead.company ? ` (${lead.company})` : ''} is due soon`;
  
  return createNotification({
    user_id: userId,
    type: 'task_due',
    title,
    message,
    data: { task_id: taskId, due_date: task.scheduled_date },
    is_read: false
  });
}

// Send meeting reminder notification
export async function notifyMeetingReminder(activityId: string, userId: string) {
  // Get activity details
  const { data: activity, error: activityError } = await supabase
    .from('activities')
    .select('subject, scheduled_date, leads!inner(name, company)')
    .eq('id', activityId)
    .single();
  
  if (activityError || !activity) return;
  
  const lead = activity.leads;
  const meetingDate = new Date(activity.scheduled_date).toLocaleString();
  const title = 'Meeting Reminder';
  const message = `Meeting "${activity.subject}" with ${lead.name}${lead.company ? ` (${lead.company})` : ''} is scheduled for ${meetingDate}`;
  
  return createNotification({
    user_id: userId,
    type: 'meeting_reminder',
    title,
    message,
    data: { activity_id: activityId, scheduled_date: activity.scheduled_date },
    is_read: false
  });
}

// Send system notification
export async function sendSystemNotification(userId: string, title: string, message: string, data?: any) {
  return createNotification({
    user_id: userId,
    type: 'system',
    title,
    message,
    data,
    is_read: false
  });
}

// Send team update notification
export async function sendTeamUpdateNotification(teamId: string, title: string, message: string, data?: any) {
  // Get all team members
  const { data: teamMembers, error } = await supabase
    .from('users')
    .select('id')
    .eq('team_id', teamId)
    .eq('is_active', true);
  
  if (error || !teamMembers) return;
  
  // Send notification to each team member
  const notifications = teamMembers.map(member => ({
    user_id: member.id,
    type: 'team_update' as const,
    title,
    message,
    data,
    is_read: false,
    created_at: new Date().toISOString()
  }));
  
  const { error: insertError } = await supabase
    .from('notifications')
    .insert(notifications);
  
  if (insertError) throw insertError;
}

// Get notification statistics
export async function getNotificationStats(userId: string, dateRange?: { start: string; end: string }) {
  let query = supabase
    .from('notifications')
    .select('type, is_read')
    .eq('user_id', userId);
  
  if (dateRange) {
    query = query
      .gte('created_at', dateRange.start)
      .lte('created_at', dateRange.end);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  const stats = {
    total_notifications: data?.length || 0,
    unread_notifications: data?.filter(n => !n.is_read).length || 0,
    by_type: data?.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number }) || {}
  };
  
  return stats;
}

// Clean up old notifications (run periodically)
export async function cleanupOldNotifications(daysOld: number = 30) {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - daysOld);
  
  const { error } = await supabase
    .from('notifications')
    .delete()
    .lt('created_at', cutoffDate.toISOString())
    .eq('is_read', true);
  
  if (error) throw error;
}
