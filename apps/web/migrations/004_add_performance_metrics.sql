-- Migration 004: Add Performance Metrics and Additional Tables
-- This migration adds performance tracking, comments, tasks, and other supporting tables

-- Create performance metrics table
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

-- Create indexes for performance_metrics
CREATE INDEX idx_performance_metrics_user_id ON performance_metrics(user_id);
CREATE INDEX idx_performance_metrics_date ON performance_metrics(metric_date);
CREATE INDEX idx_performance_metrics_user_date ON performance_metrics(user_id, metric_date);

-- Create trigger for performance_metrics updated_at
CREATE TRIGGER update_performance_metrics_updated_at BEFORE UPDATE ON performance_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create comments table
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

-- Create indexes for comments
CREATE INDEX idx_comments_lead_id ON comments(lead_id);
CREATE INDEX idx_comments_deal_id ON comments(deal_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_created_at ON comments(created_at);

-- Create trigger for comments updated_at
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create tasks table
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

-- Create indexes for tasks
CREATE INDEX idx_tasks_lead_id ON tasks(lead_id);
CREATE INDEX idx_tasks_deal_id ON tasks(deal_id);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
CREATE INDEX idx_tasks_completed ON tasks(is_completed);
CREATE INDEX idx_tasks_priority ON tasks(priority);

-- Create trigger for tasks updated_at
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create attachments table
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

-- Create indexes for attachments
CREATE INDEX idx_attachments_lead_id ON attachments(lead_id);
CREATE INDEX idx_attachments_deal_id ON attachments(deal_id);
CREATE INDEX idx_attachments_user_id ON attachments(user_id);

-- Create lead assignments table
CREATE TABLE lead_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  assigned_to UUID REFERENCES users(id),
  assigned_by UUID REFERENCES users(id),
  assigned_at TIMESTAMP DEFAULT NOW(),
  reason TEXT
);

-- Create indexes for lead_assignments
CREATE INDEX idx_lead_assignments_lead_id ON lead_assignments(lead_id);
CREATE INDEX idx_lead_assignments_assigned_to ON lead_assignments(assigned_to);
CREATE INDEX idx_lead_assignments_assigned_at ON lead_assignments(assigned_at);

-- Create deal history table
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

-- Create indexes for deal_history
CREATE INDEX idx_deal_history_deal_id ON deal_history(deal_id);
CREATE INDEX idx_deal_history_user_id ON deal_history(user_id);
CREATE INDEX idx_deal_history_created_at ON deal_history(created_at);

-- Enable RLS for all new tables
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for performance_metrics
CREATE POLICY "Users can view own metrics" ON performance_metrics FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Managers can view team metrics" ON performance_metrics FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

-- Create RLS policies for comments
CREATE POLICY "Users can view comments for own leads" ON comments FOR SELECT USING (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can create comments for own leads" ON comments FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can update own comments" ON comments FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own comments" ON comments FOR DELETE USING (user_id = auth.uid());

-- Create RLS policies for tasks
CREATE POLICY "Users can view assigned tasks" ON tasks FOR SELECT USING (
  assigned_to = auth.uid() OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can create tasks for own leads" ON tasks FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can update assigned tasks" ON tasks FOR UPDATE USING (
  assigned_to = auth.uid() OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can delete own tasks" ON tasks FOR DELETE USING (
  assigned_to = auth.uid() OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Create RLS policies for attachments
CREATE POLICY "Users can view attachments for own leads" ON attachments FOR SELECT USING (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can upload attachments for own leads" ON attachments FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);
CREATE POLICY "Users can delete own attachments" ON attachments FOR DELETE USING (user_id = auth.uid());

-- Create RLS policies for lead_assignments
CREATE POLICY "Users can view lead assignments" ON lead_assignments FOR SELECT USING (
  assigned_to = auth.uid() OR
  assigned_by = auth.uid() OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

-- Create RLS policies for deal_history
CREATE POLICY "Users can view deal history for own deals" ON deal_history FOR SELECT USING (
  deal_id IN (
    SELECT d.id FROM deals d 
    JOIN leads l ON d.lead_id = l.id 
    WHERE l.owner_id = auth.uid()
  )
);
