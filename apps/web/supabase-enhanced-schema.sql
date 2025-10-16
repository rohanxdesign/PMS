-- Enhanced Supabase Schema for BD Associates
-- This extends the initial schema with additional tables and features

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. USERS TABLE (for BD associates and team)
-- =============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('BD', 'Manager', 'Admin')),
  team_id UUID,
  avatar_url TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 2. ENHANCED LEADS TABLE (add new fields)
-- =============================================
-- First, add new columns to existing leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority TEXT CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS next_follow_up_date TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_contacted_date TIMESTAMP;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS temperature TEXT CHECK (temperature IN ('Hot', 'Warm', 'Cold'));
ALTER TABLE leads ADD COLUMN IF NOT EXISTS lost_reason TEXT;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES users(id);

-- =============================================
-- 3. ENHANCED DEALS TABLE (add new fields)
-- =============================================
ALTER TABLE deals ADD COLUMN IF NOT EXISTS probability INTEGER CHECK (probability >= 0 AND probability <= 100);
ALTER TABLE deals ADD COLUMN IF NOT EXISTS next_step TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS competitor_info TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS decision_maker TEXT;
ALTER TABLE deals ADD COLUMN IF NOT EXISTS deal_source TEXT;

-- =============================================
-- 4. ACTIVITIES TABLE (call logs, meetings, emails)
-- =============================================
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('Call', 'Email', 'Meeting', 'Note', 'Task', 'Follow-up')),
  subject TEXT,
  description TEXT,
  outcome TEXT,
  duration_minutes INTEGER,
  scheduled_date TIMESTAMP,
  completed_date TIMESTAMP,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 5. TASKS TABLE (follow-ups and reminders)
-- =============================================
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  title TEXT NOT NULL,
  description TEXT,
  task_type TEXT CHECK (task_type IN ('Follow-up', 'Call', 'Email', 'Meeting', 'Proposal', 'Contract')),
  priority TEXT CHECK (priority IN ('Low', 'Medium', 'High', 'Urgent')),
  due_date TIMESTAMP,
  completed_date TIMESTAMP,
  is_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 6. COMMENTS TABLE (notes and updates)
-- =============================================
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  comment_type TEXT CHECK (comment_type IN ('Note', 'Update', 'Internal', 'Client')),
  is_internal BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 7. ATTACHMENTS TABLE (documents, proposals)
-- =============================================
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 8. LEAD ASSIGNMENTS TABLE (track ownership changes)
-- =============================================
CREATE TABLE lead_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  reason TEXT
);

-- =============================================
-- 9. DEAL HISTORY TABLE (audit trail)
-- =============================================
CREATE TABLE deal_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  change_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- 10. PERFORMANCE METRICS TABLE
-- =============================================
CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  metric_date DATE NOT NULL,
  leads_created INTEGER DEFAULT 0,
  deals_created INTEGER DEFAULT 0,
  deals_won INTEGER DEFAULT 0,
  deals_lost INTEGER DEFAULT 0,
  calls_made INTEGER DEFAULT 0,
  emails_sent INTEGER DEFAULT 0,
  meetings_held INTEGER DEFAULT 0,
  pipeline_value DECIMAL(12, 2) DEFAULT 0,
  revenue_generated DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, metric_date)
);

-- =============================================
-- INDEXES FOR PERFORMANCE
-- =============================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_team_id ON users(team_id);

-- Enhanced leads indexes
CREATE INDEX idx_leads_owner_id ON leads(owner_id);
CREATE INDEX idx_leads_priority ON leads(priority);
CREATE INDEX idx_leads_temperature ON leads(temperature);
CREATE INDEX idx_leads_next_follow_up ON leads(next_follow_up_date);
CREATE INDEX idx_leads_last_contacted ON leads(last_contacted_date);

-- Enhanced deals indexes
CREATE INDEX idx_deals_probability ON deals(probability);
CREATE INDEX idx_deals_decision_maker ON deals(decision_maker);

-- Activities indexes
CREATE INDEX idx_activities_lead_id ON activities(lead_id);
CREATE INDEX idx_activities_deal_id ON activities(deal_id);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_scheduled_date ON activities(scheduled_date);
CREATE INDEX idx_activities_completed ON activities(is_completed);

-- Tasks indexes
CREATE INDEX idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX idx_tasks_deal_id ON tasks(deal_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(is_completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- Comments indexes
CREATE INDEX idx_comments_lead_id ON comments(lead_id);
CREATE INDEX idx_comments_deal_id ON comments(deal_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Attachments indexes
CREATE INDEX idx_attachments_lead_id ON attachments(lead_id);
CREATE INDEX idx_attachments_deal_id ON attachments(deal_id);
CREATE INDEX idx_attachments_user_id ON attachments(user_id);

-- Lead assignments indexes
CREATE INDEX idx_lead_assignments_lead_id ON lead_assignments(lead_id);
CREATE INDEX idx_lead_assignments_assigned_to ON lead_assignments(assigned_to);
CREATE INDEX idx_lead_assignments_assigned_at ON lead_assignments(assigned_at);

-- Deal history indexes
CREATE INDEX idx_deal_history_deal_id ON deal_history(deal_id);
CREATE INDEX idx_deal_history_user_id ON deal_history(user_id);
CREATE INDEX idx_deal_history_created_at ON deal_history(created_at);

-- Performance metrics indexes
CREATE INDEX idx_performance_metrics_user_id ON performance_metrics(user_id);
CREATE INDEX idx_performance_metrics_date ON performance_metrics(metric_date);
CREATE INDEX idx_performance_metrics_user_date ON performance_metrics(user_id, metric_date);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_performance_metrics_updated_at BEFORE UPDATE ON performance_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- SAMPLE DATA
-- =============================================

-- Insert sample users
INSERT INTO users (email, full_name, role, phone) VALUES
('john.doe@company.com', 'John Doe', 'BD', '+1-555-0101'),
('jane.smith@company.com', 'Jane Smith', 'BD', '+1-555-0102'),
('mike.johnson@company.com', 'Mike Johnson', 'BD', '+1-555-0103'),
('sarah.wilson@company.com', 'Sarah Wilson', 'Manager', '+1-555-0104'),
('david.brown@company.com', 'David Brown', 'BD', '+1-555-0105');

-- Update existing leads with new fields
UPDATE leads SET 
  source = 'Website',
  priority = 'High',
  next_follow_up_date = NOW() + INTERVAL '2 days',
  last_contacted_date = NOW() - INTERVAL '1 day',
  temperature = 'Warm',
  owner_id = (SELECT id FROM users WHERE email = 'john.doe@company.com')
WHERE name = 'Sadhvi Shakti Puri Everest Tea trader';

UPDATE leads SET 
  source = 'Referral',
  priority = 'Medium',
  next_follow_up_date = NOW() + INTERVAL '1 day',
  last_contacted_date = NOW() - INTERVAL '2 hours',
  temperature = 'Hot',
  owner_id = (SELECT id FROM users WHERE email = 'jane.smith@company.com')
WHERE name = 'Rajesh Kumar';

UPDATE leads SET 
  source = 'Cold Call',
  priority = 'Low',
  next_follow_up_date = NOW() + INTERVAL '3 days',
  last_contacted_date = NOW() - INTERVAL '1 day',
  temperature = 'Cold',
  owner_id = (SELECT id FROM users WHERE email = 'mike.johnson@company.com')
WHERE name = 'Priya Sharma';

UPDATE leads SET 
  source = 'Website',
  priority = 'Urgent',
  next_follow_up_date = NOW() + INTERVAL '1 day',
  last_contacted_date = NOW() - INTERVAL '30 minutes',
  temperature = 'Hot',
  owner_id = (SELECT id FROM users WHERE email = 'sarah.wilson@company.com')
WHERE name = 'Amit Patel';

UPDATE leads SET 
  source = 'Referral',
  priority = 'Medium',
  next_follow_up_date = NOW() + INTERVAL '2 days',
  last_contacted_date = NOW() - INTERVAL '1 day',
  temperature = 'Warm',
  owner_id = (SELECT id FROM users WHERE email = 'david.brown@company.com')
WHERE name = 'Sita Gurung';

-- Update existing deals with new fields
UPDATE deals SET 
  probability = 75,
  next_step = 'Send proposal',
  decision_maker = 'CTO',
  deal_source = 'Website'
WHERE title = 'Everest Tea Bulk Order';

UPDATE deals SET 
  probability = 60,
  next_step = 'Schedule demo',
  decision_maker = 'CEO',
  deal_source = 'Referral'
WHERE title = 'TechCorp Software License';

UPDATE deals SET 
  probability = 40,
  next_step = 'Follow up on budget',
  decision_maker = 'Founder',
  deal_source = 'Cold Call'
WHERE title = 'StartupXYZ Consulting';

-- Insert sample activities
INSERT INTO activities (lead_id, user_id, activity_type, subject, description, outcome, duration_minutes, completed_date, is_completed) VALUES
((SELECT id FROM leads WHERE name = 'Sadhvi Shakti Puri Everest Tea trader'), (SELECT id FROM users WHERE email = 'john.doe@company.com'), 'Call', 'Initial discovery call', 'Discussed requirements and timeline', 'Positive - interested in proposal', 30, NOW() - INTERVAL '1 day', true),
((SELECT id FROM leads WHERE name = 'Rajesh Kumar'), (SELECT id FROM users WHERE email = 'jane.smith@company.com'), 'Email', 'Follow-up on demo', 'Sent demo recording and next steps', 'Opened and clicked', 0, NOW() - INTERVAL '2 hours', true),
((SELECT id FROM leads WHERE name = 'Priya Sharma'), (SELECT id FROM users WHERE email = 'mike.johnson@company.com'), 'Meeting', 'Budget discussion', 'Discussed pricing and payment terms', 'Needs approval from board', 45, NOW() - INTERVAL '1 day', true);

-- Insert sample tasks
INSERT INTO tasks (lead_id, assigned_to, title, description, task_type, priority, due_date) VALUES
((SELECT id FROM leads WHERE name = 'Sadhvi Shakti Puri Everest Tea trader'), (SELECT id FROM users WHERE email = 'john.doe@company.com'), 'Send proposal', 'Prepare and send detailed proposal for tea trading deal', 'Proposal', 'High', NOW() + INTERVAL '1 day'),
((SELECT id FROM leads WHERE name = 'Rajesh Kumar'), (SELECT id FROM users WHERE email = 'jane.smith@company.com'), 'Schedule demo', 'Set up technical demo with their development team', 'Meeting', 'Medium', NOW() + INTERVAL '2 days'),
((SELECT id FROM leads WHERE name = 'Priya Sharma'), (SELECT id FROM users WHERE email = 'mike.johnson@company.com'), 'Follow up on budget', 'Check if they have budget approval from board', 'Follow-up', 'Low', NOW() + INTERVAL '3 days');

-- Insert sample comments
INSERT INTO comments (lead_id, user_id, content, comment_type, is_internal) VALUES
((SELECT id FROM leads WHERE name = 'Sadhvi Shakti Puri Everest Tea trader'), (SELECT id FROM users WHERE email = 'john.doe@company.com'), 'Very interested in our services. Mentioned they have 3 locations and need bulk pricing.', 'Note', true),
((SELECT id FROM leads WHERE name = 'Rajesh Kumar'), (SELECT id FROM users WHERE email = 'jane.smith@company.com'), 'Technical team is evaluating our solution. They seem impressed with the demo.', 'Update', true),
((SELECT id FROM leads WHERE name = 'Priya Sharma'), (SELECT id FROM users WHERE email = 'mike.johnson@company.com'), 'Budget constraints mentioned. Need to focus on ROI and cost savings.', 'Internal', true);

-- Insert sample performance metrics
INSERT INTO performance_metrics (user_id, metric_date, leads_created, deals_created, deals_won, deals_lost, calls_made, emails_sent, meetings_held, pipeline_value, revenue_generated) VALUES
((SELECT id FROM users WHERE email = 'john.doe@company.com'), CURRENT_DATE, 3, 2, 1, 0, 8, 15, 2, 150000, 50000),
((SELECT id FROM users WHERE email = 'jane.smith@company.com'), CURRENT_DATE, 2, 1, 0, 0, 5, 12, 1, 250000, 0),
((SELECT id FROM users WHERE email = 'mike.johnson@company.com'), CURRENT_DATE, 1, 1, 0, 0, 3, 8, 1, 100000, 0),
((SELECT id FROM users WHERE email = 'sarah.wilson@company.com'), CURRENT_DATE, 1, 1, 0, 0, 4, 10, 1, 500000, 0),
((SELECT id FROM users WHERE email = 'david.brown@company.com'), CURRENT_DATE, 1, 0, 0, 0, 2, 5, 0, 75000, 0);

-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- =============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Managers can view team members" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

-- Activities policies
CREATE POLICY "Users can view own activities" ON activities FOR SELECT USING (
  user_id = auth.uid() OR 
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can create activities for own leads" ON activities FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Tasks policies
CREATE POLICY "Users can view assigned tasks" ON tasks FOR SELECT USING (
  assigned_to = auth.uid() OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can create tasks for own leads" ON tasks FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Comments policies
CREATE POLICY "Users can view comments for own leads" ON comments FOR SELECT USING (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can create comments for own leads" ON comments FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Attachments policies
CREATE POLICY "Users can view attachments for own leads" ON attachments FOR SELECT USING (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can upload attachments for own leads" ON attachments FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Performance metrics policies
CREATE POLICY "Users can view own metrics" ON performance_metrics FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Managers can view team metrics" ON performance_metrics FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);
