export type SampleLead = {
  id: string;
  name: string;           // Lead name (person/organization)
  company: string;
  country: "India" | "Nepal";
  industry?: string;
  email?: string;
  stage: "New" | "Contacted" | "Qualified";
  owner: string;
  totalDeals: number;     // Number of deals associated
  totalAmount: number;    // Total value of all deals
  remarks?: string;
};

export type SampleDeal = {
  id: string;
  leadId: string;         // Reference to the lead
  name: string;           // Deal name (account/retainer type)
  company: string;        // Company name
  accountType: string;    // e.g., "Personal Instagram", "Ashram Account", "Holy Cow Shed"
  stage: "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Won" | "Lost" | "Meeting booked";
  owner: string;
  amount: number;         // Monthly retainer amount
  currency: string;       // Currency code (e.g., "NR", "INR")
  requestedBy: string;    // Person who requested the deal
  requestedTime: string;  // Time when deal was requested
  estimateCloseDate: string; // Estimated close date
  remarks?: string;
  // BD-specific fields
  leadSource: string;     // How the lead was acquired
  probability: number;    // Deal probability percentage
  nextStep: string;       // Next action required
  lastContact: string;    // Last contact date
  priority: "High" | "Medium" | "Low";
  leadScore: number;      // Lead scoring (1-100)
};

export const sampleLeadsINandNP: SampleLead[] = [
  { 
    id: "lead-1", 
    name: "Sanjeev Thakur", 
    company: "Personal + Ashram", 
    country: "India", 
    industry: "Spiritual Leader", 
    email: "sanjeev@ashram.org", 
    stage: "Qualified", 
    owner: "Alex", 
    totalDeals: 2, 
    totalAmount: 89999.0, 
    remarks: "Personal Instagram + Holy Cow Shed marketing" 
  },
  { 
    id: "lead-2", 
    name: "Sadhvi Shakti Puri", 
    company: "Sadhvi Shakti Puri Trust", 
    country: "India", 
    industry: "Spiritual Org", 
    email: "media@sadhvishaktipuri.org", 
    stage: "Contacted", 
    owner: "Priya", 
    totalDeals: 2, 
    totalAmount: 125999.0, 
    remarks: "Main account + Festival coverage" 
  },
  { 
    id: "lead-3", 
    name: "Balakanad Ashram", 
    company: "Balakanad Ashram", 
    country: "India", 
    industry: "Spiritual Org", 
    email: "info@balakanad.org", 
    stage: "New", 
    owner: "Rohan", 
    totalDeals: 1, 
    totalAmount: 24999.0, 
    remarks: "Ashram outreach and satsang content" 
  },
  { 
    id: "lead-4", 
    name: "Himalaya Crafts Co.", 
    company: "Himalaya Crafts Co.", 
    country: "Nepal", 
    industry: "Handicrafts", 
    email: "sales@himalayacrafts.com.np", 
    stage: "New", 
    owner: "Kamal", 
    totalDeals: 1, 
    totalAmount: 18999.0, 
    remarks: "Festival content pack" 
  },
  { 
    id: "lead-5", 
    name: "Everest Tea Traders", 
    company: "Everest Tea Traders", 
    country: "Nepal", 
    industry: "FMCG Export", 
    email: "info@everesttea.com.np", 
    stage: "Contacted", 
    owner: "Maya", 
    totalDeals: 1, 
    totalAmount: 22999.0, 
    remarks: "SEO + blog content" 
  },
];

export const sampleDeals: SampleDeal[] = [
  // Sanjeev Thakur's deals
  { 
    id: "deal-1", 
    leadId: "lead-1", 
    name: "Personal Instagram Retainer", 
    company: "Sanjeev Thakur Ashram",
    accountType: "Personal Instagram", 
    stage: "Meeting booked", 
    owner: "Alex", 
    amount: 31987.96, 
    currency: "NR",
    requestedBy: "Rohan Arora",
    requestedTime: "5 hours ago",
    estimateCloseDate: "in 2 Months",
    remarks: "Monthly content creation and management",
    leadSource: "Referral",
    probability: 75,
    nextStep: "Schedule demo call",
    lastContact: "2 days ago",
    priority: "High",
    leadScore: 85
  },
  { 
    id: "deal-2", 
    leadId: "lead-1", 
    name: "Holy Cow Shed Marketing", 
    company: "Sanjeev Thakur Ashram",
    accountType: "Holy Cow Shed", 
    stage: "Proposal", 
    owner: "Alex", 
    amount: 40000.00, 
    currency: "NR",
    requestedBy: "Sanjeev Thakur",
    requestedTime: "1 day ago",
    estimateCloseDate: "in 1 Month",
    remarks: "Ashram cow shed promotion campaign",
    leadSource: "Direct Outreach",
    probability: 60,
    nextStep: "Send proposal",
    lastContact: "1 day ago",
    priority: "Medium",
    leadScore: 70
  },
  
  // Sadhvi Shakti Puri's deals
  { 
    id: "deal-3", 
    leadId: "lead-2", 
    name: "Main Account Retainer", 
    company: "Sadhvi Shakti Puri Trust",
    accountType: "Main Instagram", 
    stage: "Won", 
    owner: "Priya", 
    amount: 79999.00, 
    currency: "NR",
    requestedBy: "Sadhvi Shakti Puri",
    requestedTime: "3 days ago",
    estimateCloseDate: "Closed",
    remarks: "Satsang live streaming + content",
    leadSource: "Website",
    probability: 100,
    nextStep: "Onboard client",
    lastContact: "3 days ago",
    priority: "High",
    leadScore: 95
  },
  { 
    id: "deal-4", 
    leadId: "lead-2", 
    name: "Festival Coverage", 
    company: "Sadhvi Shakti Puri Trust",
    accountType: "Festival Events", 
    stage: "Negotiation", 
    owner: "Priya", 
    amount: 46000.00, 
    currency: "NR",
    requestedBy: "Event Manager",
    requestedTime: "1 week ago",
    estimateCloseDate: "in 3 weeks",
    remarks: "Photo/video + testimonials",
    leadSource: "Referral",
    probability: 40,
    nextStep: "Price negotiation",
    lastContact: "2 days ago",
    priority: "Medium",
    leadScore: 65
  },
  
  // Balakanad Ashram's deal
  { 
    id: "deal-5", 
    leadId: "lead-3", 
    name: "Ashram Outreach Kit", 
    company: "Balakanad Ashram",
    accountType: "Ashram Account", 
    stage: "New", 
    owner: "Rohan", 
    amount: 24999.00, 
    currency: "NR",
    requestedBy: "Ashram Manager",
    requestedTime: "2 weeks ago",
    estimateCloseDate: "in 6 weeks",
    remarks: "Monthly satsang creatives + reels",
    leadSource: "Cold Call",
    probability: 25,
    nextStep: "Initial contact",
    lastContact: "2 weeks ago",
    priority: "Low",
    leadScore: 45
  },
  
  // Nepal deals
  { 
    id: "deal-6", 
    leadId: "lead-4", 
    name: "Content Pack – Festival", 
    company: "Himalaya Crafts Co.",
    accountType: "Main Account", 
    stage: "New", 
    owner: "Kamal", 
    amount: 18999.00, 
    currency: "NR",
    requestedBy: "Marketing Head",
    requestedTime: "1 week ago",
    estimateCloseDate: "in 4 weeks",
    remarks: "Reels + carousels + blog",
    leadSource: "Social Media",
    probability: 30,
    nextStep: "Send portfolio",
    lastContact: "1 week ago",
    priority: "Medium",
    leadScore: 55
  },
  { 
    id: "deal-7", 
    leadId: "lead-5", 
    name: "SEO + Blog Retainer", 
    company: "Everest Tea Traders",
    accountType: "Website + Social", 
    stage: "Contacted", 
    owner: "Maya", 
    amount: 22999.00, 
    currency: "NR",
    requestedBy: "CEO",
    requestedTime: "3 days ago",
    estimateCloseDate: "in 5 weeks",
    remarks: "English + Hindi content",
    leadSource: "LinkedIn",
    probability: 50,
    nextStep: "Schedule meeting",
    lastContact: "3 days ago",
    priority: "High",
    leadScore: 75
  },
];


