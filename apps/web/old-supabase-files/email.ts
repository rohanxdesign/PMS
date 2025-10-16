import { supabase } from '@/app/lib/supabaseClient';

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: 'follow_up' | 'proposal' | 'meeting_reminder' | 'welcome' | 'custom';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface EmailData {
  to: string;
  subject: string;
  body: string;
  lead_id?: string;
  deal_id?: string;
  template_id?: string;
  attachments?: string[];
}

export interface EmailLog {
  id: string;
  lead_id?: string;
  deal_id?: string;
  user_id: string;
  recipient_email: string;
  subject: string;
  body: string;
  template_id?: string;
  status: 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
  sent_at: string;
  opened_at?: string;
  clicked_at?: string;
  error_message?: string;
}

// Send email (placeholder - integrate with your email service)
export async function sendEmail(emailData: EmailData, userId: string) {
  // This is a placeholder implementation
  // In production, you would integrate with services like:
  // - SendGrid
  // - Mailgun
  // - AWS SES
  // - Resend
  
  try {
    // Simulate email sending
    const emailLog: EmailLog = {
      id: `email-${Date.now()}`,
      lead_id: emailData.lead_id,
      deal_id: emailData.deal_id,
      user_id: userId,
      recipient_email: emailData.to,
      subject: emailData.subject,
      body: emailData.body,
      template_id: emailData.template_id,
      status: 'sent',
      sent_at: new Date().toISOString()
    };
    
    // Log email in database
    const { error } = await supabase
      .from('email_logs')
      .insert([emailLog]);
    
    if (error) throw error;
    
    // Log as activity
    if (emailData.lead_id) {
      await logEmailActivity(emailData.lead_id, userId, emailData.subject, emailData.body);
    }
    
    return { success: true, emailId: emailLog.id };
  } catch (error) {
    // Log failed email
    const emailLog: EmailLog = {
      id: `email-${Date.now()}`,
      lead_id: emailData.lead_id,
      deal_id: emailData.deal_id,
      user_id: userId,
      recipient_email: emailData.to,
      subject: emailData.subject,
      body: emailData.body,
      template_id: emailData.template_id,
      status: 'failed',
      sent_at: new Date().toISOString(),
      error_message: error instanceof Error ? error.message : 'Unknown error'
    };
    
    await supabase
      .from('email_logs')
      .insert([emailLog]);
    
    throw error;
  }
}

// Send follow-up email
export async function sendFollowUpEmail(leadId: string, userId: string, customMessage?: string) {
  // Get lead details
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('name, email, company, stage')
    .eq('id', leadId)
    .single();
  
  if (leadError || !lead?.email) throw new Error('Lead not found or no email address');
  
  const subject = `Follow-up: ${lead.company || 'Your inquiry'}`;
  const body = customMessage || generateFollowUpTemplate(lead);
  
  return sendEmail({
    to: lead.email,
    subject,
    body,
    lead_id: leadId
  }, userId);
}

// Send proposal email
export async function sendProposalEmail(dealId: string, userId: string, proposalUrl?: string) {
  // Get deal and lead details
  const { data: deal, error: dealError } = await supabase
    .from('deals')
    .select(`
      title,
      amount,
      currency,
      leads!inner(name, email, company)
    `)
    .eq('id', dealId)
    .single();
  
  if (dealError || !deal) throw new Error('Deal not found');
  
  const lead = deal.leads;
  if (!lead?.email) throw new Error('Lead email not found');
  
  const subject = `Proposal: ${deal.title}`;
  const body = generateProposalTemplate(lead, deal, proposalUrl);
  
  return sendEmail({
    to: lead.email,
    subject,
    body,
    deal_id: dealId
  }, userId);
}

// Send meeting reminder
export async function sendMeetingReminder(activityId: string, userId: string) {
  // Get activity details
  const { data: activity, error: activityError } = await supabase
    .from('activities')
    .select(`
      subject,
      scheduled_date,
      leads!inner(name, email, company)
    `)
    .eq('id', activityId)
    .single();
  
  if (activityError || !activity) throw new Error('Activity not found');
  
  const lead = activity.leads;
  if (!lead?.email) throw new Error('Lead email not found');
  
  const subject = `Meeting Reminder: ${activity.subject}`;
  const body = generateMeetingReminderTemplate(lead, activity);
  
  return sendEmail({
    to: lead.email,
    subject,
    body,
    lead_id: activity.lead_id
  }, userId);
}

// Get email templates
export async function getEmailTemplates() {
  const { data, error } = await supabase
    .from('email_templates')
    .select('*')
    .order('name', { ascending: true });
  
  if (error) throw error;
  return data as EmailTemplate[];
}

// Create email template
export async function createEmailTemplate(templateData: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('email_templates')
    .insert([{
      ...templateData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as EmailTemplate;
}

// Update email template
export async function updateEmailTemplate(templateId: string, updates: Partial<EmailTemplate>) {
  const { data, error } = await supabase
    .from('email_templates')
    .update({ 
      ...updates, 
      updated_at: new Date().toISOString() 
    })
    .eq('id', templateId)
    .select()
    .single();
  
  if (error) throw error;
  return data as EmailTemplate;
}

// Delete email template
export async function deleteEmailTemplate(templateId: string) {
  const { error } = await supabase
    .from('email_templates')
    .delete()
    .eq('id', templateId);
  
  if (error) throw error;
}

// Get email logs for a lead
export async function getEmailLogsByLead(leadId: string) {
  const { data, error } = await supabase
    .from('email_logs')
    .select('*')
    .eq('lead_id', leadId)
    .order('sent_at', { ascending: false });
  
  if (error) throw error;
  return data as EmailLog[];
}

// Get email logs for a user
export async function getEmailLogsByUser(userId: string, dateRange?: { start: string; end: string }) {
  let query = supabase
    .from('email_logs')
    .select('*')
    .eq('user_id', userId);
  
  if (dateRange) {
    query = query
      .gte('sent_at', dateRange.start)
      .lte('sent_at', dateRange.end);
  }
  
  const { data, error } = await query.order('sent_at', { ascending: false });
  
  if (error) throw error;
  return data as EmailLog[];
}

// Get email statistics
export async function getEmailStats(userId: string, dateRange?: { start: string; end: string }) {
  let query = supabase
    .from('email_logs')
    .select('status')
    .eq('user_id', userId);
  
  if (dateRange) {
    query = query
      .gte('sent_at', dateRange.start)
      .lte('sent_at', dateRange.end);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  const stats = {
    total_sent: data?.length || 0,
    delivered: data?.filter(e => e.status === 'delivered').length || 0,
    opened: data?.filter(e => e.status === 'opened').length || 0,
    clicked: data?.filter(e => e.status === 'clicked').length || 0,
    bounced: data?.filter(e => e.status === 'bounced').length || 0,
    failed: data?.filter(e => e.status === 'failed').length || 0
  };
  
  return {
    ...stats,
    delivery_rate: stats.total_sent > 0 ? Math.round((stats.delivered / stats.total_sent) * 100) : 0,
    open_rate: stats.delivered > 0 ? Math.round((stats.opened / stats.delivered) * 100) : 0,
    click_rate: stats.opened > 0 ? Math.round((stats.clicked / stats.opened) * 100) : 0
  };
}

// Helper function to log email as activity
async function logEmailActivity(leadId: string, userId: string, subject: string, body: string) {
  const { error } = await supabase
    .from('activities')
    .insert([{
      lead_id: leadId,
      user_id: userId,
      activity_type: 'Email',
      subject: subject,
      description: body,
      is_completed: true,
      completed_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
}

// Helper function to generate follow-up template
function generateFollowUpTemplate(lead: any): string {
  return `
Hi ${lead.name},

I hope this email finds you well. I wanted to follow up on our recent conversation regarding ${lead.company || 'your inquiry'}.

I'm excited about the possibility of working together and would love to discuss how we can help you achieve your goals.

Would you be available for a brief call this week to discuss next steps?

Best regards,
[Your Name]

---
This email was sent from our CRM system.
  `.trim();
}

// Helper function to generate proposal template
function generateProposalTemplate(lead: any, deal: any, proposalUrl?: string): string {
  return `
Hi ${lead.name},

Thank you for your interest in our services. I'm pleased to present our proposal for ${deal.title}.

Proposal Details:
- Amount: ${deal.currency} ${deal.amount.toLocaleString()}
- Timeline: [To be discussed]

${proposalUrl ? `You can view the full proposal here: ${proposalUrl}` : 'The full proposal is attached to this email.'}

I'm confident this solution will meet your needs and help you achieve your objectives. I'd be happy to schedule a call to discuss any questions you may have.

Looking forward to your feedback.

Best regards,
[Your Name]

---
This email was sent from our CRM system.
  `.trim();
}

// Helper function to generate meeting reminder template
function generateMeetingReminderTemplate(lead: any, activity: any): string {
  const meetingDate = new Date(activity.scheduled_date).toLocaleString();
  
  return `
Hi ${lead.name},

This is a friendly reminder about our upcoming meeting:

Meeting: ${activity.subject}
Date & Time: ${meetingDate}

I'm looking forward to our discussion about ${lead.company || 'your project'}.

If you need to reschedule, please let me know as soon as possible.

Best regards,
[Your Name]

---
This email was sent from our CRM system.
  `.trim();
}
