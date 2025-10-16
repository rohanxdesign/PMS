import { supabase } from '@/app/lib/supabaseClient';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'BD' | 'Manager' | 'Admin';
  team_id?: string;
  avatar_url?: string;
  phone?: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserData {
  email: string;
  full_name: string;
  role: 'BD' | 'Manager' | 'Admin';
  team_id?: string;
  phone?: string;
  timezone?: string;
}

export interface UpdateUserData {
  email?: string;
  full_name?: string;
  role?: 'BD' | 'Manager' | 'Admin';
  team_id?: string;
  avatar_url?: string;
  phone?: string;
  timezone?: string;
  is_active?: boolean;
}

// Get current user from Supabase Auth
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  if (!user) return null;
  
  // Get user profile from users table
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (profileError) throw profileError;
  
  return profile as User;
}

// Get team members
export async function getTeamMembers(teamId?: string) {
  let query = supabase
    .from('users')
    .select('*')
    .eq('is_active', true)
    .order('full_name', { ascending: true });
  
  if (teamId) {
    query = query.eq('team_id', teamId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as User[];
}

// Get all users (admin only)
export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('full_name', { ascending: true });
  
  if (error) throw error;
  return data as User[];
}

// Get user by ID
export async function getUserById(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data as User;
}

// Create new user
export async function createUser(userData: CreateUserData) {
  const { data, error } = await supabase
    .from('users')
    .insert([{
      ...userData,
      timezone: userData.timezone || 'UTC',
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
}

// Update user profile
export async function updateUserProfile(userId: string, updates: UpdateUserData) {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      ...updates, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
}

// Deactivate user
export async function deactivateUser(userId: string) {
  const { error } = await supabase
    .from('users')
    .update({ 
      is_active: false,
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId);
  
  if (error) throw error;
}

// Activate user
export async function activateUser(userId: string) {
  const { error } = await supabase
    .from('users')
    .update({ 
      is_active: true,
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId);
  
  if (error) throw error;
}

// Get users by role
export async function getUsersByRole(role: 'BD' | 'Manager' | 'Admin') {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', role)
    .eq('is_active', true)
    .order('full_name', { ascending: true });
  
  if (error) throw error;
  return data as User[];
}

// Get BD associates (for lead assignment)
export async function getBDAssociates() {
  return getUsersByRole('BD');
}

// Get managers
export async function getManagers() {
  return getUsersByRole('Manager');
}

// Update user avatar
export async function updateUserAvatar(userId: string, avatarUrl: string) {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString() 
    })
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data as User;
}

// Search users
export async function searchUsers(query: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
    .eq('is_active', true)
    .order('full_name', { ascending: true });
  
  if (error) throw error;
  return data as User[];
}

// Get user statistics
export async function getUserStats(userId: string) {
  // Get leads count
  const { count: leadsCount } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', userId);
  
  // Get deals count
  const { count: dealsCount } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('owner', userId);
  
  // Get activities count
  const { count: activitiesCount } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  
  // Get revenue generated
  const { data: wonDeals } = await supabase
    .from('deals')
    .select('amount')
    .eq('owner', userId)
    .eq('stage', 'Won');
  
  const revenueGenerated = wonDeals?.reduce((sum, deal) => sum + deal.amount, 0) || 0;
  
  return {
    leads_count: leadsCount || 0,
    deals_count: dealsCount || 0,
    activities_count: activitiesCount || 0,
    revenue_generated: revenueGenerated
  };
}

// Get user's recent activity
export async function getUserRecentActivity(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
}

// Check if user has permission for action
export async function checkUserPermission(userId: string, action: string, resourceId?: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  
  // Admin has all permissions
  if (user.role === 'Admin') return true;
  
  // Manager permissions
  if (user.role === 'Manager') {
    switch (action) {
      case 'view_team_leads':
      case 'assign_leads':
      case 'view_team_analytics':
        return true;
      default:
        return false;
    }
  }
  
  // BD permissions
  if (user.role === 'BD') {
    switch (action) {
      case 'view_own_leads':
      case 'update_own_leads':
      case 'create_activities':
      case 'view_own_analytics':
        return true;
      case 'view_lead':
      case 'update_lead':
        // Check if lead belongs to user
        if (resourceId) {
          const { data: lead } = await supabase
            .from('leads')
            .select('owner_id')
            .eq('id', resourceId)
            .single();
          return lead?.owner_id === userId;
        }
        return false;
      default:
        return false;
    }
  }
  
  return false;
}
