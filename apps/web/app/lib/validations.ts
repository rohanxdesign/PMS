import { z } from 'zod';

// Lead validation schemas
export const createLeadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name too long'),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  company: z.string().max(255, 'Company name too long').optional().or(z.literal('')),
  country: z.enum(['India', 'Nepal'], { required_error: 'Country is required' }),
  stage: z.enum(['New', 'Qualified', 'Negotiation', 'Proposal', 'Contacted', 'Won', 'Lost'], {
    required_error: 'Stage is required'
  }),
  owner: z.string().min(1, 'Owner is required').max(255, 'Owner name too long'),
  remarks: z.string().max(1000, 'Remarks too long').optional().or(z.literal('')),
  source: z.string().max(100, 'Source too long').optional().or(z.literal('')),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  next_follow_up_date: z.string().datetime().optional().or(z.literal('')),
  temperature: z.enum(['Hot', 'Warm', 'Cold']).optional(),
  owner_id: z.string().uuid().optional().or(z.literal(''))
});

export const updateLeadSchema = createLeadSchema.partial();

export const leadStageSchema = z.enum(['New', 'Qualified', 'Negotiation', 'Proposal', 'Contacted', 'Won', 'Lost']);

// Deal validation schemas
export const createDealSchema = z.object({
  lead_id: z.string().uuid('Invalid lead ID'),
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  amount: z.number().positive('Amount must be positive'),
  currency: z.enum(['INR', 'NPR'], { required_error: 'Currency is required' }),
  stage: z.enum(['Meeting booked', 'Proposal', 'Negotiation', 'Won', 'Lost'], {
    required_error: 'Stage is required'
  }),
  owner: z.string().min(1, 'Owner is required').max(255, 'Owner name too long'),
  expected_close_date: z.string().datetime().optional().or(z.literal('')),
  probability: z.number().min(0).max(100).optional(),
  next_step: z.string().max(500, 'Next step too long').optional().or(z.literal('')),
  competitor_info: z.string().max(1000, 'Competitor info too long').optional().or(z.literal('')),
  decision_maker: z.string().max(255, 'Decision maker name too long').optional().or(z.literal('')),
  deal_source: z.string().max(100, 'Deal source too long').optional().or(z.literal(''))
});

export const updateDealSchema = createDealSchema.partial().omit({ lead_id: true });

export const dealStageSchema = z.enum(['Meeting booked', 'Proposal', 'Negotiation', 'Won', 'Lost']);

// Activity validation schemas
export const createActivitySchema = z.object({
  lead_id: z.string().uuid('Invalid lead ID').optional(),
  deal_id: z.string().uuid('Invalid deal ID').optional(),
  user_id: z.string().uuid('Invalid user ID').optional(),
  activity_type: z.enum(['Call', 'Email', 'Meeting', 'Note', 'Task', 'Follow-up'], {
    required_error: 'Activity type is required'
  }),
  subject: z.string().max(255, 'Subject too long').optional().or(z.literal('')),
  description: z.string().max(2000, 'Description too long').optional().or(z.literal('')),
  outcome: z.string().max(1000, 'Outcome too long').optional().or(z.literal('')),
  duration_minutes: z.number().min(0).max(1440).optional(), // Max 24 hours
  scheduled_date: z.string().datetime().optional().or(z.literal('')),
  completed_date: z.string().datetime().optional().or(z.literal('')),
  is_completed: z.boolean().optional()
});

export const updateActivitySchema = createActivitySchema.partial().omit({ 
  lead_id: true, 
  deal_id: true, 
  user_id: true, 
  activity_type: true 
});

// User validation schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  full_name: z.string().min(1, 'Full name is required').max(255, 'Full name too long'),
  role: z.enum(['BD', 'Manager', 'Admin'], { required_error: 'Role is required' }),
  team_id: z.string().uuid('Invalid team ID').optional().or(z.literal('')),
  phone: z.string().max(20, 'Phone number too long').optional().or(z.literal('')),
  timezone: z.string().max(50, 'Timezone too long').optional()
});

export const updateUserSchema = createUserSchema.partial().omit({ email: true });

// Comment validation schemas
export const createCommentSchema = z.object({
  lead_id: z.string().uuid('Invalid lead ID').optional(),
  deal_id: z.string().uuid('Invalid deal ID').optional(),
  user_id: z.string().uuid('Invalid user ID').optional(),
  content: z.string().min(1, 'Content is required').max(2000, 'Content too long'),
  comment_type: z.enum(['Note', 'Update', 'Internal', 'Client']).optional(),
  is_internal: z.boolean().optional()
});

export const updateCommentSchema = createCommentSchema.partial().omit({ 
  lead_id: true, 
  deal_id: true, 
  user_id: true 
});

// Task validation schemas
export const createTaskSchema = z.object({
  lead_id: z.string().uuid('Invalid lead ID').optional(),
  deal_id: z.string().uuid('Invalid deal ID').optional(),
  assigned_to: z.string().uuid('Invalid user ID').optional(),
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional().or(z.literal('')),
  task_type: z.enum(['Follow-up', 'Call', 'Email', 'Meeting', 'Proposal', 'Contract']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  due_date: z.string().datetime().optional().or(z.literal(''))
});

export const updateTaskSchema = createTaskSchema.partial().omit({ 
  lead_id: true, 
  deal_id: true, 
  assigned_to: true 
});

// Email validation schemas
export const sendEmailSchema = z.object({
  to: z.string().email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required').max(255, 'Subject too long'),
  body: z.string().min(1, 'Body is required').max(10000, 'Body too long'),
  lead_id: z.string().uuid('Invalid lead ID').optional(),
  deal_id: z.string().uuid('Invalid deal ID').optional(),
  template_id: z.string().uuid('Invalid template ID').optional(),
  attachments: z.array(z.string()).optional()
});

export const emailTemplateSchema = z.object({
  name: z.string().min(1, 'Template name is required').max(255, 'Template name too long'),
  subject: z.string().min(1, 'Subject is required').max(255, 'Subject too long'),
  body: z.string().min(1, 'Body is required').max(10000, 'Body too long'),
  type: z.enum(['follow_up', 'proposal', 'meeting_reminder', 'welcome', 'custom']),
  created_by: z.string().uuid('Invalid user ID')
});

// Notification validation schemas
export const createNotificationSchema = z.object({
  user_id: z.string().uuid('Invalid user ID'),
  type: z.enum(['lead_assigned', 'deal_stage_change', 'task_due', 'meeting_reminder', 'system', 'team_update']),
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  message: z.string().min(1, 'Message is required').max(1000, 'Message too long'),
  data: z.any().optional()
});

export const notificationPreferencesSchema = z.object({
  user_id: z.string().uuid('Invalid user ID'),
  email_notifications: z.boolean(),
  push_notifications: z.boolean(),
  lead_assigned: z.boolean(),
  deal_stage_change: z.boolean(),
  task_due: z.boolean(),
  meeting_reminder: z.boolean(),
  system_updates: z.boolean(),
  team_updates: z.boolean()
});

// File upload validation schemas
export const fileUploadSchema = z.object({
  file: z.instanceof(File, 'File is required'),
  bucket: z.enum(['lead-attachments', 'deal-documents', 'profile-pictures']),
  path: z.string().min(1, 'Path is required').max(500, 'Path too long'),
  description: z.string().max(500, 'Description too long').optional()
});

// Search and filter schemas
export const searchLeadsSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(255, 'Search query too long'),
  stage: leadStageSchema.optional(),
  owner_id: z.string().uuid('Invalid owner ID').optional(),
  country: z.enum(['India', 'Nepal']).optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']).optional(),
  temperature: z.enum(['Hot', 'Warm', 'Cold']).optional(),
  date_range: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }).optional()
});

export const searchDealsSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(255, 'Search query too long'),
  stage: dealStageSchema.optional(),
  owner: z.string().max(255, 'Owner name too long').optional(),
  currency: z.enum(['INR', 'NPR']).optional(),
  min_amount: z.number().min(0).optional(),
  max_amount: z.number().min(0).optional(),
  date_range: z.object({
    start: z.string().datetime(),
    end: z.string().datetime()
  }).optional()
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(50),
  sort_by: z.string().max(50).optional(),
  sort_order: z.enum(['asc', 'desc']).default('desc')
});

// Date range schema
export const dateRangeSchema = z.object({
  start: z.string().datetime('Invalid start date'),
  end: z.string().datetime('Invalid end date')
}).refine(data => new Date(data.start) <= new Date(data.end), {
  message: 'Start date must be before end date',
  path: ['start']
});

// Bulk operations schemas
export const bulkAssignLeadsSchema = z.object({
  lead_ids: z.array(z.string().uuid('Invalid lead ID')).min(1, 'At least one lead ID is required'),
  assigned_to: z.string().uuid('Invalid user ID'),
  assigned_by: z.string().uuid('Invalid user ID'),
  reason: z.string().max(500, 'Reason too long').optional()
});

export const bulkUpdateLeadsSchema = z.object({
  lead_ids: z.array(z.string().uuid('Invalid lead ID')).min(1, 'At least one lead ID is required'),
  updates: updateLeadSchema
});

export const bulkImportLeadsSchema = z.object({
  leads: z.array(createLeadSchema).min(1, 'At least one lead is required').max(1000, 'Too many leads')
});

// Analytics schemas
export const analyticsDateRangeSchema = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
  period: z.enum(['daily', 'weekly', 'monthly']).optional()
});

export const leaderboardSchema = z.object({
  team_id: z.string().uuid('Invalid team ID'),
  metric: z.enum(['leads', 'deals', 'revenue', 'activities']),
  date_range: dateRangeSchema.optional()
});

// Utility functions for validation
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
}

export function validateUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

export function validateCurrency(amount: number, currency: string): boolean {
  if (currency === 'INR') {
    return amount >= 0 && amount <= 999999999; // Max 999 crores
  } else if (currency === 'NPR') {
    return amount >= 0 && amount <= 999999999; // Max 999 crores
  }
  return false;
}

// Type exports for TypeScript
export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
export type CreateDealInput = z.infer<typeof createDealSchema>;
export type UpdateDealInput = z.infer<typeof updateDealSchema>;
export type CreateActivityInput = z.infer<typeof createActivitySchema>;
export type UpdateActivityInput = z.infer<typeof updateActivitySchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type SendEmailInput = z.infer<typeof sendEmailSchema>;
export type CreateNotificationInput = z.infer<typeof createNotificationSchema>;
export type SearchLeadsInput = z.infer<typeof searchLeadsSchema>;
export type SearchDealsInput = z.infer<typeof searchDealsSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
export type BulkAssignLeadsInput = z.infer<typeof bulkAssignLeadsSchema>;
export type BulkUpdateLeadsInput = z.infer<typeof bulkUpdateLeadsSchema>;
export type BulkImportLeadsInput = z.infer<typeof bulkImportLeadsSchema>;
export type AnalyticsDateRangeInput = z.infer<typeof analyticsDateRangeSchema>;
export type LeaderboardInput = z.infer<typeof leaderboardSchema>;
