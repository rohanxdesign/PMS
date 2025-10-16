# Supabase Backend Setup for Leads and Deals

This document explains how to set up the Supabase backend to enable dynamic counts for new leads and KT pending items.

## Prerequisites

1. A Supabase account and project
2. Supabase CLI installed (optional but recommended)

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from the project settings

### 2. Set Environment Variables

Create a `.env.local` file in the `apps/web` directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Database Schema

Execute the SQL schema in your Supabase SQL editor:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL script

This will create:
- `leads` table with proper constraints and indexes
- `deals` table with foreign key relationships
- Sample data for testing
- Row Level Security policies
- Automatic timestamp triggers

### 4. Verify Setup

After running the schema, you should see:

1. **Tables created**: `leads` and `deals` in your database
2. **Sample data**: 5 leads and 3 deals inserted
3. **Indexes**: Performance indexes on frequently queried columns
4. **Policies**: RLS policies for data access

### 5. Test the Application

1. Start your Next.js development server: `npm run dev`
2. Navigate to `/sales/leads`
3. The header should now display dynamic counts from the database:
   - "You have X new leads assigned and Y KTs pending today"

## Database Schema Details

### Leads Table
- **id**: UUID primary key
- **name**: Lead's full name (required)
- **email**: Contact email
- **company**: Company name
- **country**: India or Nepal
- **stage**: Lead stage (New, Qualified, Negotiation, etc.)
- **owner**: Sales person assigned
- **total_amount**: Total deal value
- **total_deals**: Number of deals
- **remarks**: Additional notes
- **assigned_date**: When lead was assigned
- **created_at/updated_at**: Timestamps

### Deals Table
- **id**: UUID primary key
- **lead_id**: Foreign key to leads table
- **title**: Deal title
- **amount**: Deal value
- **currency**: INR or NPR
- **stage**: Deal stage (Meeting booked, Proposal, etc.)
- **owner**: Sales person assigned
- **expected_close_date**: Expected closing date
- **created_at/updated_at**: Timestamps

## API Functions

The following functions are available in `app/lib/api/leads.ts`:

- `fetchLeads()`: Get all leads
- `fetchDeals()`: Get all deals
- `getNewLeadsCountToday()`: Count new leads assigned today
- `getKTPendingCount()`: Count KT pending deals
- `updateLeadStage()`: Update lead stage

## Customization

### Adding New Stages
To add new lead or deal stages, update the CHECK constraints in the schema:

```sql
ALTER TABLE leads DROP CONSTRAINT leads_stage_check;
ALTER TABLE leads ADD CONSTRAINT leads_stage_check 
  CHECK (stage IN ('New', 'Qualified', 'Negotiation', 'Proposal', 'Contacted', 'Won', 'Lost', 'YourNewStage'));
```

### Modifying Count Logic
Update the count functions in `app/lib/api/leads.ts` to change what constitutes "new leads" or "KT pending":

```typescript
// Example: Change KT pending to include different stages
export async function getKTPendingCount() {
  const { count, error } = await supabase
    .from('deals')
    .select('*', { count: 'exact', head: true })
    .in('stage', ['Meeting booked', 'Proposal', 'YourNewStage']);
  
  if (error) throw error;
  return count || 0;
}
```

## Security Considerations

The current setup uses permissive RLS policies for development. For production:

1. Implement proper authentication
2. Create user-specific policies
3. Add data validation
4. Set up proper backup strategies

## Troubleshooting

### Common Issues

1. **"Failed to fetch counts"**: Check your environment variables and Supabase connection
2. **Empty counts**: Verify sample data was inserted correctly
3. **Permission errors**: Check RLS policies and user authentication

### Debug Steps

1. Check browser console for errors
2. Verify Supabase project is active
3. Test API calls in Supabase dashboard
4. Check network tab for failed requests
