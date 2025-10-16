import { supabase } from '@/app/lib/supabaseClient';

export interface DashboardMetrics {
  total_leads: number;
  new_leads_today: number;
  leads_this_week: number;
  total_deals: number;
  deals_won: number;
  deals_lost: number;
  pipeline_value: number;
  revenue_generated: number;
  conversion_rate: number;
  activities_today: number;
  overdue_tasks: number;
}

export interface ConversionRates {
  lead_to_qualified: number;
  qualified_to_proposal: number;
  proposal_to_won: number;
  overall_conversion: number;
}

export interface PipelineValue {
  total_pipeline: number;
  weighted_pipeline: number;
  by_stage: {
    [stage: string]: number;
  };
}

export interface ActivityStats {
  total_activities: number;
  completed_activities: number;
  calls_made: number;
  emails_sent: number;
  meetings_held: number;
  total_duration: number;
  completion_rate: number;
}

export interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  metric_value: number;
  rank: number;
}

export interface DateRange {
  start: string;
  end: string;
}

// Get dashboard metrics for a user
export async function getDashboardMetrics(ownerId: string, dateRange?: DateRange) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekStart = new Date(today);
  weekStart.setDate(weekStart.getDate() - 7);
  
  // Get total leads
  const { count: totalLeads } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', ownerId);
  
  // Get new leads today
  const { count: newLeadsToday } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', ownerId)
    .gte('created_at', today.toISOString());
  
  // Get leads this week
  const { count: leadsThisWeek } = await supabase
    .from('leads')
    .select('*', { count: 'exact', head: true })
    .eq('owner_id', ownerId)
    .gte('created_at', weekStart.toISOString());
  
  // Get total deals
  const { count: totalDeals } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('owner', ownerId);
  
  // Get deals won
  const { count: dealsWon } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('owner', ownerId)
    .eq('stage', 'Won');
  
  // Get deals lost
  const { count: dealsLost } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .eq('owner', ownerId)
    .eq('stage', 'Lost');
  
  // Get pipeline value
  const pipelineValue = await getPipelineValue(ownerId);
  
  // Get revenue generated
  const { data: wonDeals } = await supabase
    .from('deals')
    .select('amount')
    .eq('owner', ownerId)
    .eq('stage', 'Won');
  
  const revenueGenerated = wonDeals?.reduce((sum, deal) => sum + deal.amount, 0) || 0;
  
  // Calculate conversion rate
  const conversionRate = totalDeals > 0 ? Math.round((dealsWon / totalDeals) * 100) : 0;
  
  // Get activities today
  const { count: activitiesToday } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', ownerId)
    .gte('created_at', today.toISOString());
  
  // Get overdue tasks
  const { count: overdueTasks } = await supabase
    .from('activities')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', ownerId)
    .eq('activity_type', 'Task')
    .eq('is_completed', false)
    .lt('scheduled_date', today.toISOString());
  
  return {
    total_leads: totalLeads || 0,
    new_leads_today: newLeadsToday || 0,
    leads_this_week: leadsThisWeek || 0,
    total_deals: totalDeals || 0,
    deals_won: dealsWon || 0,
    deals_lost: dealsLost || 0,
    pipeline_value: pipelineValue,
    revenue_generated: revenueGenerated,
    conversion_rate: conversionRate,
    activities_today: activitiesToday || 0,
    overdue_tasks: overdueTasks || 0
  } as DashboardMetrics;
}

// Get conversion rates for a user
export async function getConversionRates(ownerId: string, dateRange?: DateRange) {
  // Get leads by stage
  const { data: leads } = await supabase
    .from('leads')
    .select('stage')
    .eq('owner_id', ownerId);
  
  if (!leads) return { lead_to_qualified: 0, qualified_to_proposal: 0, proposal_to_won: 0, overall_conversion: 0 };
  
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(l => ['Qualified', 'Negotiation', 'Proposal', 'Contacted', 'Won', 'Lost'].includes(l.stage)).length;
  const proposalLeads = leads.filter(l => ['Proposal', 'Contacted', 'Won', 'Lost'].includes(l.stage)).length;
  const wonLeads = leads.filter(l => l.stage === 'Won').length;
  
  const leadToQualified = totalLeads > 0 ? Math.round((qualifiedLeads / totalLeads) * 100) : 0;
  const qualifiedToProposal = qualifiedLeads > 0 ? Math.round((proposalLeads / qualifiedLeads) * 100) : 0;
  const proposalToWon = proposalLeads > 0 ? Math.round((wonLeads / proposalLeads) * 100) : 0;
  const overallConversion = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;
  
  return {
    lead_to_qualified: leadToQualified,
    qualified_to_proposal: qualifiedToProposal,
    proposal_to_won: proposalToWon,
    overall_conversion: overallConversion
  } as ConversionRates;
}

// Get pipeline value breakdown
export async function getPipelineValue(ownerId?: string) {
  let query = supabase
    .from('deals')
    .select('amount, stage, probability')
    .in('stage', ['Meeting booked', 'Proposal', 'Negotiation']);
  
  if (ownerId) {
    query = query.eq('owner', ownerId);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  const totalPipeline = data?.reduce((sum, deal) => sum + deal.amount, 0) || 0;
  const weightedPipeline = data?.reduce((sum, deal) => sum + (deal.amount * (deal.probability || 0) / 100), 0) || 0;
  
  const byStage = data?.reduce((acc, deal) => {
    acc[deal.stage] = (acc[deal.stage] || 0) + deal.amount;
    return acc;
  }, {} as { [stage: string]: number }) || {};
  
  return {
    total_pipeline: totalPipeline,
    weighted_pipeline: weightedPipeline,
    by_stage: byStage
  } as PipelineValue;
}

// Get activity statistics
export async function getActivityStats(ownerId: string, dateRange?: DateRange) {
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
  
  const totalActivities = data?.length || 0;
  const completedActivities = data?.filter(a => a.is_completed).length || 0;
  const callsMade = data?.filter(a => a.activity_type === 'Call' && a.is_completed).length || 0;
  const emailsSent = data?.filter(a => a.activity_type === 'Email' && a.is_completed).length || 0;
  const meetingsHeld = data?.filter(a => a.activity_type === 'Meeting' && a.is_completed).length || 0;
  const totalDuration = data?.reduce((sum, a) => sum + (a.duration_minutes || 0), 0) || 0;
  const completionRate = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
  
  return {
    total_activities: totalActivities,
    completed_activities: completedActivities,
    calls_made: callsMade,
    emails_sent: emailsSent,
    meetings_held: meetingsHeld,
    total_duration: totalDuration,
    completion_rate: completionRate
  } as ActivityStats;
}

// Get team leaderboard
export async function getLeaderboard(teamId: string, metric: 'leads' | 'deals' | 'revenue' | 'activities', dateRange?: DateRange) {
  // Get all team members
  const { data: teamMembers } = await supabase
    .from('users')
    .select('id, full_name')
    .eq('team_id', teamId);
  
  if (!teamMembers) return [];
  
  const leaderboard: LeaderboardEntry[] = [];
  
  for (const member of teamMembers) {
    let metricValue = 0;
    
    switch (metric) {
      case 'leads':
        const { count: leadsCount } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .eq('owner_id', member.id);
        metricValue = leadsCount || 0;
        break;
        
      case 'deals':
        const { count: dealsCount } = await supabase
          .from('deals')
          .select('*', { count: 'exact', head: true })
          .eq('owner', member.id);
        metricValue = dealsCount || 0;
        break;
        
      case 'revenue':
        const { data: wonDeals } = await supabase
          .from('deals')
          .select('amount')
          .eq('owner', member.id)
          .eq('stage', 'Won');
        metricValue = wonDeals?.reduce((sum, deal) => sum + deal.amount, 0) || 0;
        break;
        
      case 'activities':
        let activityQuery = supabase
          .from('activities')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', member.id);
        
        if (dateRange) {
          activityQuery = activityQuery
            .gte('created_at', dateRange.start)
            .lte('created_at', dateRange.end);
        }
        
        const { count: activitiesCount } = await activityQuery;
        metricValue = activitiesCount || 0;
        break;
    }
    
    leaderboard.push({
      user_id: member.id,
      user_name: member.full_name,
      metric_value: metricValue,
      rank: 0 // Will be set after sorting
    });
  }
  
  // Sort by metric value and assign ranks
  leaderboard.sort((a, b) => b.metric_value - a.metric_value);
  leaderboard.forEach((entry, index) => {
    entry.rank = index + 1;
  });
  
  return leaderboard;
}

// Get performance trends (daily/weekly/monthly)
export async function getPerformanceTrends(ownerId: string, period: 'daily' | 'weekly' | 'monthly', days: number = 30) {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (period) {
    case 'daily':
      startDate.setDate(endDate.getDate() - days);
      break;
    case 'weekly':
      startDate.setDate(endDate.getDate() - (days * 7));
      break;
    case 'monthly':
      startDate.setMonth(endDate.getMonth() - days);
      break;
  }
  
  const { data: metrics } = await supabase
    .from('performance_metrics')
    .select('*')
    .eq('user_id', ownerId)
    .gte('metric_date', startDate.toISOString().split('T')[0])
    .lte('metric_date', endDate.toISOString().split('T')[0])
    .order('metric_date', { ascending: true });
  
  return metrics || [];
}

// Get team performance summary
export async function getTeamPerformance(teamId: string, dateRange?: DateRange) {
  const { data: teamMembers } = await supabase
    .from('users')
    .select('id, full_name, role')
    .eq('team_id', teamId);
  
  if (!teamMembers) return null;
  
  const teamStats = {
    total_members: teamMembers.length,
    total_leads: 0,
    total_deals: 0,
    total_revenue: 0,
    total_activities: 0,
    avg_conversion_rate: 0
  };
  
  let totalConversionRates = 0;
  
  for (const member of teamMembers) {
    // Get member's metrics
    const metrics = await getDashboardMetrics(member.id, dateRange);
    
    teamStats.total_leads += metrics.total_leads;
    teamStats.total_deals += metrics.total_deals;
    teamStats.total_revenue += metrics.revenue_generated;
    teamStats.total_activities += metrics.activities_today;
    totalConversionRates += metrics.conversion_rate;
  }
  
  teamStats.avg_conversion_rate = teamMembers.length > 0 ? Math.round(totalConversionRates / teamMembers.length) : 0;
  
  return teamStats;
}
