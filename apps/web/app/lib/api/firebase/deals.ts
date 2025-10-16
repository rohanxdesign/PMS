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

export interface Deal {
  id: string;
  lead_id: string;
  title: string;
  amount: number;
  currency: 'INR' | 'NPR';
  stage: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner: string;
  expected_close_date?: string;
  created_at: string;
  updated_at: string;
  // Enhanced fields
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

export interface CreateDealData {
  lead_id: string;
  title: string;
  amount: number;
  currency: 'INR' | 'NPR';
  stage: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner: string;
  expected_close_date?: string;
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

export interface UpdateDealData {
  title?: string;
  amount?: number;
  currency?: 'INR' | 'NPR';
  stage?: 'Meeting booked' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  owner?: string;
  expected_close_date?: string;
  probability?: number;
  next_step?: string;
  competitor_info?: string;
  decision_maker?: string;
  deal_source?: string;
}

// Fetch all deals
export async function fetchDeals(): Promise<Deal[]> {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(dealsRef, orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
}

// Create a new deal
export async function createDeal(dealData: CreateDealData): Promise<Deal> {
  try {
    const dealsRef = collection(db, 'deals');
    const docRef = await addDoc(dealsRef, {
      ...dealData,
      expected_close_date: dealData.expected_close_date ? Timestamp.fromDate(new Date(dealData.expected_close_date)) : null,
      created_at: serverTimestamp(),
      updated_at: serverTimestamp()
    });
    
    const newDeal = await getDoc(docRef);
    return {
      id: docRef.id,
      ...newDeal.data(),
      created_at: newDeal.data()?.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: newDeal.data()?.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: newDeal.data()?.expected_close_date?.toDate?.()?.toISOString()
    } as Deal;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
}

// Update deal
export async function updateDeal(dealId: string, updates: UpdateDealData): Promise<Deal> {
  try {
    const dealRef = doc(db, 'deals', dealId);
    const updateData: any = {
      ...updates,
      updated_at: serverTimestamp()
    };
    
    if (updates.expected_close_date) {
      updateData.expected_close_date = Timestamp.fromDate(new Date(updates.expected_close_date));
    }
    
    await updateDoc(dealRef, updateData);
    
    const updatedDeal = await getDoc(dealRef);
    return {
      id: dealId,
      ...updatedDeal.data(),
      created_at: updatedDeal.data()?.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: updatedDeal.data()?.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: updatedDeal.data()?.expected_close_date?.toDate?.()?.toISOString()
    } as Deal;
  } catch (error) {
    console.error('Error updating deal:', error);
    throw error;
  }
}

// Delete deal
export async function deleteDeal(dealId: string): Promise<void> {
  try {
    const dealRef = doc(db, 'deals', dealId);
    await deleteDoc(dealRef);
  } catch (error) {
    console.error('Error deleting deal:', error);
    throw error;
  }
}

// Get deals by lead
export async function getDealsByLead(leadId: string): Promise<Deal[]> {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(
      dealsRef, 
      where('lead_id', '==', leadId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals by lead:', error);
    throw error;
  }
}

// Get deals by owner
export async function getDealsByOwner(ownerId: string): Promise<Deal[]> {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(
      dealsRef, 
      where('owner', '==', ownerId),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals by owner:', error);
    throw error;
  }
}

// Get deals by stage
export async function getDealsByStage(stage: Deal['stage']): Promise<Deal[]> {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(
      dealsRef, 
      where('stage', '==', stage),
      orderBy('created_at', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals by stage:', error);
    throw error;
  }
}

// Get count of KT pending deals
export async function getKTPendingCount(): Promise<number> {
  try {
    const dealsRef = collection(db, 'deals');
    const q = query(
      dealsRef,
      where('stage', 'in', ['Meeting booked', 'Proposal'])
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting KT pending count:', error);
    throw error;
  }
}

// Move deal to new stage
export async function moveDealStage(dealId: string, newStage: Deal['stage'], userId: string, reason?: string): Promise<Deal> {
  try {
    const dealRef = doc(db, 'deals', dealId);
    await updateDoc(dealRef, { 
      stage: newStage,
      updated_at: serverTimestamp() 
    });
    
    const updatedDeal = await getDoc(dealRef);
    return {
      id: dealId,
      ...updatedDeal.data(),
      created_at: updatedDeal.data()?.created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: updatedDeal.data()?.updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: updatedDeal.data()?.expected_close_date?.toDate?.()?.toISOString()
    } as Deal;
  } catch (error) {
    console.error('Error moving deal stage:', error);
    throw error;
  }
}

// Calculate deal probability based on stage
export async function calculateDealProbability(dealId: string): Promise<number> {
  try {
    const dealRef = doc(db, 'deals', dealId);
    const dealDoc = await getDoc(dealRef);
    
    if (!dealDoc.exists()) {
      throw new Error('Deal not found');
    }
    
    const deal = dealDoc.data();
    
    // Base probability by stage
    const stageProbabilities = {
      'Meeting booked': 20,
      'Proposal': 40,
      'Negotiation': 60,
      'Won': 100,
      'Lost': 0
    };
    
    let probability = stageProbabilities[deal.stage as keyof typeof stageProbabilities] || 0;
    
    // Adjust based on expected close date
    if (deal.expected_close_date) {
      const closeDate = deal.expected_close_date.toDate();
      const today = new Date();
      const daysUntilClose = Math.ceil((closeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      // If closing soon, increase probability
      if (daysUntilClose <= 7 && daysUntilClose > 0) {
        probability = Math.min(probability + 10, 90);
      }
      // If overdue, decrease probability
      else if (daysUntilClose < 0) {
        probability = Math.max(probability - 20, 0);
      }
    }
    
    // Update deal with calculated probability
    await updateDoc(dealRef, { 
      probability,
      updated_at: serverTimestamp() 
    });
    
    return probability;
  } catch (error) {
    console.error('Error calculating deal probability:', error);
    throw error;
  }
}

// Get pipeline value
export async function getPipelineValue(ownerId?: string): Promise<number> {
  try {
    const dealsRef = collection(db, 'deals');
    let q = query(
      dealsRef,
      where('stage', 'in', ['Meeting booked', 'Proposal', 'Negotiation'])
    );
    
    if (ownerId) {
      q = query(
        dealsRef,
        where('stage', 'in', ['Meeting booked', 'Proposal', 'Negotiation']),
        where('owner', '==', ownerId)
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    // Calculate weighted pipeline value
    const pipelineValue = querySnapshot.docs.reduce((total, doc) => {
      const deal = doc.data();
      const weightedAmount = (deal.amount * (deal.probability || 0)) / 100;
      return total + weightedAmount;
    }, 0);
    
    return pipelineValue;
  } catch (error) {
    console.error('Error getting pipeline value:', error);
    throw error;
  }
}

// Get deals closing soon
export async function getDealsClosingSoon(ownerId?: string): Promise<Deal[]> {
  try {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const dealsRef = collection(db, 'deals');
    let q = query(
      dealsRef,
      where('expected_close_date', '>=', Timestamp.fromDate(today)),
      where('expected_close_date', '<=', Timestamp.fromDate(nextWeek)),
      where('stage', 'in', ['Meeting booked', 'Proposal', 'Negotiation']),
      orderBy('expected_close_date', 'asc')
    );
    
    if (ownerId) {
      q = query(
        dealsRef,
        where('expected_close_date', '>=', Timestamp.fromDate(today)),
        where('expected_close_date', '<=', Timestamp.fromDate(nextWeek)),
        where('stage', 'in', ['Meeting booked', 'Proposal', 'Negotiation']),
        where('owner', '==', ownerId),
        orderBy('expected_close_date', 'asc')
      );
    }
    
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
  } catch (error) {
    console.error('Error fetching deals closing soon:', error);
    throw error;
  }
}

// Real-time subscription to deals
export function subscribeToDeals(callback: (deals: Deal[]) => void): () => void {
  const dealsRef = collection(db, 'deals');
  const q = query(dealsRef, orderBy('created_at', 'desc'));
  
  return onSnapshot(q, (querySnapshot) => {
    const deals = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      created_at: doc.data().created_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      updated_at: doc.data().updated_at?.toDate?.()?.toISOString() || new Date().toISOString(),
      expected_close_date: doc.data().expected_close_date?.toDate?.()?.toISOString()
    })) as Deal[];
    
    callback(deals);
  });
}
