-- Migration 005: Add Row Level Security Policies
-- This migration adds comprehensive RLS policies for all tables

-- Update existing leads table RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON leads;
DROP POLICY IF EXISTS "Enable insert access for all users" ON leads;
DROP POLICY IF EXISTS "Enable update access for all users" ON leads;
DROP POLICY IF EXISTS "Enable delete access for all users" ON leads;

-- Create comprehensive leads policies
CREATE POLICY "BD can view own leads" ON leads FOR SELECT USING (
  owner_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can create leads" ON leads FOR INSERT WITH CHECK (
  owner_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can update own leads" ON leads FOR UPDATE USING (
  owner_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can delete own leads" ON leads FOR DELETE USING (
  owner_id = auth.uid() OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

-- Update existing deals table RLS policies
DROP POLICY IF EXISTS "Enable read access for all users" ON deals;
DROP POLICY IF EXISTS "Enable insert access for all users" ON deals;
DROP POLICY IF EXISTS "Enable update access for all users" ON deals;
DROP POLICY IF EXISTS "Enable delete access for all users" ON deals;

-- Create comprehensive deals policies
CREATE POLICY "BD can view own deals" ON deals FOR SELECT USING (
  owner = (SELECT full_name FROM users WHERE id = auth.uid()) OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can create deals for own leads" ON deals FOR INSERT WITH CHECK (
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can update own deals" ON deals FOR UPDATE USING (
  owner = (SELECT full_name FROM users WHERE id = auth.uid()) OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

CREATE POLICY "BD can delete own deals" ON deals FOR DELETE USING (
  owner = (SELECT full_name FROM users WHERE id = auth.uid()) OR
  lead_id IN (SELECT id FROM leads WHERE owner_id = auth.uid()) OR
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('Manager', 'Admin'))
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL CHECK (type IN ('lead_assigned', 'deal_stage_change', 'task_due', 'meeting_reminder', 'system', 'team_update')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

-- Create indexes for notifications
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- Enable RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notifications
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users can delete own notifications" ON notifications FOR DELETE USING (user_id = auth.uid());

-- Create notification preferences table
CREATE TABLE IF NOT EXISTS notification_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  email_notifications BOOLEAN DEFAULT true,
  push_notifications BOOLEAN DEFAULT true,
  lead_assigned BOOLEAN DEFAULT true,
  deal_stage_change BOOLEAN DEFAULT true,
  task_due BOOLEAN DEFAULT true,
  meeting_reminder BOOLEAN DEFAULT true,
  system_updates BOOLEAN DEFAULT true,
  team_updates BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create trigger for notification_preferences updated_at
CREATE TRIGGER update_notification_preferences_updated_at BEFORE UPDATE ON notification_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS for notification_preferences
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for notification_preferences
CREATE POLICY "Users can view own notification preferences" ON notification_preferences FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can update own notification preferences" ON notification_preferences FOR ALL USING (user_id = auth.uid());

-- Create function to automatically create notification preferences for new users
CREATE OR REPLACE FUNCTION create_default_notification_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notification_preferences (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create notification preferences
CREATE TRIGGER create_user_notification_preferences
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_default_notification_preferences();

-- Create function to log lead stage changes
CREATE OR REPLACE FUNCTION log_lead_stage_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.stage IS DISTINCT FROM NEW.stage THEN
    INSERT INTO activities (
      lead_id,
      user_id,
      activity_type,
      subject,
      description,
      is_completed,
      completed_date,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      NEW.owner_id,
      'Note',
      'Stage Changed',
      'Lead stage changed from ' || COALESCE(OLD.stage, 'Unknown') || ' to ' || NEW.stage,
      true,
      NOW(),
      NOW(),
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to log lead stage changes
CREATE TRIGGER log_lead_stage_changes
  AFTER UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION log_lead_stage_change();

-- Create function to log deal stage changes
CREATE OR REPLACE FUNCTION log_deal_stage_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.stage IS DISTINCT FROM NEW.stage THEN
    INSERT INTO deal_history (
      deal_id,
      user_id,
      field_name,
      old_value,
      new_value,
      change_reason,
      created_at
    ) VALUES (
      NEW.id,
      (SELECT id FROM users WHERE full_name = NEW.owner LIMIT 1),
      'stage',
      OLD.stage,
      NEW.stage,
      'Stage updated',
      NOW()
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to log deal stage changes
CREATE TRIGGER log_deal_stage_changes
  AFTER UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION log_deal_stage_change();

-- Create function to update performance metrics
CREATE OR REPLACE FUNCTION update_daily_performance_metrics()
RETURNS TRIGGER AS $$
DECLARE
  user_id_val UUID;
  metric_date_val DATE;
BEGIN
  -- Get user_id from owner name (this is a simplified approach)
  SELECT id INTO user_id_val FROM users WHERE full_name = NEW.owner LIMIT 1;
  
  IF user_id_val IS NOT NULL THEN
    metric_date_val := CURRENT_DATE;
    
    -- Insert or update performance metrics
    INSERT INTO performance_metrics (
      user_id,
      metric_date,
      leads_created,
      deals_created,
      deals_won,
      deals_lost,
      created_at,
      updated_at
    ) VALUES (
      user_id_val,
      metric_date_val,
      CASE WHEN TG_TABLE_NAME = 'leads' THEN 1 ELSE 0 END,
      CASE WHEN TG_TABLE_NAME = 'deals' THEN 1 ELSE 0 END,
      CASE WHEN TG_TABLE_NAME = 'deals' AND NEW.stage = 'Won' THEN 1 ELSE 0 END,
      CASE WHEN TG_TABLE_NAME = 'deals' AND NEW.stage = 'Lost' THEN 1 ELSE 0 END,
      NOW(),
      NOW()
    )
    ON CONFLICT (user_id, metric_date)
    DO UPDATE SET
      leads_created = performance_metrics.leads_created + CASE WHEN TG_TABLE_NAME = 'leads' THEN 1 ELSE 0 END,
      deals_created = performance_metrics.deals_created + CASE WHEN TG_TABLE_NAME = 'deals' THEN 1 ELSE 0 END,
      deals_won = performance_metrics.deals_won + CASE WHEN TG_TABLE_NAME = 'deals' AND NEW.stage = 'Won' THEN 1 ELSE 0 END,
      deals_lost = performance_metrics.deals_lost + CASE WHEN TG_TABLE_NAME = 'deals' AND NEW.stage = 'Lost' THEN 1 ELSE 0 END,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update performance metrics
CREATE TRIGGER update_performance_on_lead_insert
  AFTER INSERT ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_performance_metrics();

CREATE TRIGGER update_performance_on_deal_insert
  AFTER INSERT ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_performance_metrics();

CREATE TRIGGER update_performance_on_deal_update
  AFTER UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION update_daily_performance_metrics();
