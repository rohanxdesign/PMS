-- Migration 002: Add Activities Table
-- This migration adds the activities table for tracking calls, meetings, emails, notes, and tasks

-- Create activities table
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

-- Create indexes for activities
CREATE INDEX idx_activities_lead_id ON activities(lead_id);
CREATE INDEX idx_activities_deal_id ON activities(deal_id);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_activities_type ON activities(activity_type);
CREATE INDEX idx_activities_scheduled_date ON activities(scheduled_date);
CREATE INDEX idx_activities_completed ON activities(is_completed);

-- Create trigger for updated_at
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own activities" ON activities FOR SELECT USING (
  user_id = auth.uid() OR 
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can create activities for own leads" ON activities FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid())
);

CREATE POLICY "Users can update own activities" ON activities FOR UPDATE USING (
  user_id = auth.uid()
);

CREATE POLICY "Users can delete own activities" ON activities FOR DELETE USING (
  user_id = auth.uid()
);
