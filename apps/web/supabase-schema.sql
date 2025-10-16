-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  company TEXT,
  country TEXT CHECK (country IN ('India', 'Nepal')),
  stage TEXT NOT NULL CHECK (stage IN ('New', 'Qualified', 'Negotiation', 'Proposal', 'Contacted', 'Won', 'Lost')),
  owner TEXT NOT NULL,
  total_amount DECIMAL(10, 2) DEFAULT 0,
  total_deals INTEGER DEFAULT 0,
  remarks TEXT,
  assigned_date TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create deals table
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT CHECK (currency IN ('INR', 'NPR')),
  stage TEXT NOT NULL CHECK (stage IN ('Meeting booked', 'Proposal', 'Negotiation', 'Won', 'Lost')),
  owner TEXT NOT NULL,
  expected_close_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_leads_stage ON leads(stage);
CREATE INDEX idx_leads_assigned_date ON leads(assigned_date);
CREATE INDEX idx_leads_owner ON leads(owner);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_lead_id ON deals(lead_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO leads (name, email, company, country, stage, owner, total_amount, total_deals, remarks, assigned_date) VALUES
('Sadhvi Shakti Puri Everest Tea trader', 'sadhvi@everesttea.com', 'Everest Tea Company', 'India', 'New', 'John Doe', 150000, 3, 'Interested in bulk order', NOW()),
('Rajesh Kumar', 'rajesh@techcorp.com', 'TechCorp Solutions', 'India', 'Qualified', 'Jane Smith', 250000, 2, 'High priority client', NOW()),
('Priya Sharma', 'priya@startup.com', 'StartupXYZ', 'India', 'Negotiation', 'Mike Johnson', 100000, 1, 'Budget constraints', NOW()),
('Amit Patel', 'amit@enterprise.com', 'Enterprise Ltd', 'India', 'Proposal', 'Sarah Wilson', 500000, 4, 'Large enterprise deal', NOW()),
('Sita Gurung', 'sita@nepalcorp.com', 'Nepal Corp', 'Nepal', 'Contacted', 'David Brown', 75000, 1, 'Initial contact made', NOW());

INSERT INTO deals (lead_id, title, amount, currency, stage, owner, expected_close_date) VALUES
((SELECT id FROM leads WHERE name = 'Sadhvi Shakti Puri Everest Tea trader'), 'Everest Tea Bulk Order', 150000, 'INR', 'Meeting booked', 'John Doe', '2024-02-15'),
((SELECT id FROM leads WHERE name = 'Rajesh Kumar'), 'TechCorp Software License', 250000, 'INR', 'Proposal', 'Jane Smith', '2024-02-20'),
((SELECT id FROM leads WHERE name = 'Priya Sharma'), 'StartupXYZ Consulting', 100000, 'INR', 'Negotiation', 'Mike Johnson', '2024-02-25');

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Enable read access for all users" ON leads FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON leads FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON leads FOR DELETE USING (true);

CREATE POLICY "Enable read access for all users" ON deals FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all users" ON deals FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all users" ON deals FOR UPDATE USING (true);
CREATE POLICY "Enable delete access for all users" ON deals FOR DELETE USING (true);
