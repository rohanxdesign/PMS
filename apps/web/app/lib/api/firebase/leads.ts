import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/app/lib/firebase';

export interface Lead {
  id: string;
  name: string;
  email?: string;
  company?: string;
  country: 'India' | 'Nepal';
  stage: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner: string;
  totalAmount: number;
  totalDeals: number;
  remarks?: string;
  assigned_date: string;
  created_at: string;
  updated_at: string;
  // Enhanced fields
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  last_contacted_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  lost_reason?: string;
  owner_id?: string;
}

export interface CreateLeadData {
  name: string;
  email?: string;
  company?: string;
  country: 'India' | 'Nepal';
  stage: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner: string;
  remarks?: string;
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  owner_id?: string;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  company?: string;
  country?: 'India' | 'Nepal';
  stage?: 'New' | 'Qualified' | 'Negotiation' | 'Proposal' | 'Contacted' | 'Won' | 'Lost';
  owner?: string;
  remarks?: string;
  source?: string;
  priority?: 'Low' | 'Medium' | 'High' | 'Urgent';
  next_follow_up_date?: string;
  last_contacted_date?: string;
  temperature?: 'Hot' | 'Warm' | 'Cold';
  lost_reason?: string;
  owner_id?: string;
}

// Fetch all leads
export async function fetchLeads(): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
}

// Create a new lead
export async function createLead(leadData: CreateLeadData): Promise<Lead> {
  try {
    const leadsRef = collection(db, 'leads');
    const docRef = await addDoc(leadsRef, {
      ...leadData,
      totalAmount: 0,
      totalDeals: 0,
      assigned_date: serverTimestamp(),
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    
    const newLead = await getDoc(docRef);
    return {
      id: docRef.id,
      ...newLead.data(),
      created_at: newLead.data()?.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: newLead.data()?.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: newLead.data()?.assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: newLead.data()?.next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: newLead.data()?.last_contacted_date?.toDate?.()?.toISOString()
    } as Lead;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
}

// Update lead
export async function updateLead(leadId: string, updates: UpdateLeadData): Promise<Lead> {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await updateDoc(leadRef, {
      ...updates,
      updated_at: serverTimestamp()
    });
    
    const updatedLead = await getDoc(leadRef);
    return {
      id: leadId,
      ...updatedLead.data(),
      created_at: updatedLead.data()?.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: updatedLead.data()?.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: updatedLead.data()?.assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: updatedLead.data()?.next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: updatedLead.data()?.last_contacted_date?.toDate?.()?.toISOString()
    } as Lead;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
}

// Delete lead
export async function deleteLead(leadId: string): Promise<void> {
  try {
    const leadRef = doc(db, 'leads', leadId);
    await deleteDoc(leadRef);
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
}

// Get leads by owner
export async function getLeadsByOwner(ownerId: string): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(
      leadsRef, 
      where('owner_id', '==', ownerId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
  } catch (error) {
    console.error('Error fetching leads by owner:', error);
    throw error;
  }
}

// Get leads by stage
export async function getLeadsByStage(stage: Lead['stage']): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(
      leadsRef, 
      where('stage', '==', stage),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
  } catch (error) {
    console.error('Error fetching leads by stage:', error);
    throw error;
  }
}

// Search leads
export async function searchLeads(searchQuery: string): Promise<Lead[]> {
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const allLeads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
    
    // Client-side filtering (Firebase doesn't have full-text search)
    return allLeads.filter(lead => 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching leads:', error);
    throw error;
  }
}

// Get count of new leads assigned today
export async function getNewLeadsCountToday(): Promise<number> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const leadsRef = collection(db, 'leads');
    const q = query(
      leadsRef,
      where('stage', '==', 'New'),
      where('assigned_date', '>=', Timestamp.fromDate(today)),
      where('assigned_date', '<', Timestamp.fromDate(tomorrow))
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting new leads count:', error);
    throw error;
  }
}

// Get leads for today (follow-up due today)
export async function getLeadsForToday(): Promise<Lead[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const leadsRef = collection(db, 'leads');
    const q = query(
      leadsRef,
      where('next_follow_up_date', '>=', Timestamp.fromDate(today)),
      where('next_follow_up_date', '<', Timestamp.fromDate(tomorrow)),
      orderBy('next_follow_up_date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
  } catch (error) {
    console.error('Error fetching leads for today:', error);
    throw error;
  }
}

// Get leads for this week
export async function getLeadsForWeek(): Promise<Lead[]> {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);
    
    const leadsRef = collection(db, 'leads');
    const q = query(
      leadsRef,
      where('next_follow_up_date', '>=', Timestamp.fromDate(today)),
      where('next_follow_up_date', '<=', Timestamp.fromDate(weekEnd)),
      orderBy('next_follow_up_date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
  } catch (error) {
    console.error('Error fetching leads for week:', error);
    throw error;
  }
}

// Update lead stage
export async function updateLeadStage(leadId: string, stage: Lead['stage'], lostReason?: string): Promise<void> {
  try {
    const leadRef = doc(db, 'leads', leadId);
    const updateData: any = { 
      stage, 
      updated_at: serverTimestamp() 
    };
    
    if (stage === 'Lost' && lostReason) {
      updateData.lost_reason = lostReason;
    }
    
    await updateDoc(leadRef, updateData);
  } catch (error) {
    console.error('Error updating lead stage:', error);
    throw error;
  }
}

// Real-time subscription to leads
export function subscribeToLeads(callback: (leads: Lead[]) => void): () => void {
  const leadsRef = collection(db, 'leads');
  const q = query(leadsRef, orderBy('created_at', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const leads = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      assigned_date: doc.data().assigned_date?.toDate?.()?.toISOString() || new Date().toISOString(),
      next_follow_up_date: doc.data().next_follow_up_date?.toDate?.()?.toISOString(),
      last_contacted_date: doc.data().last_contacted_date?.toDate?.()?.toISOString()
    })) as Lead[];
    
    callback(leads);
  });
}
