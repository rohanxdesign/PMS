export type FxPair = { inrPerNpr: number; nprPerInr: number; fetchedAt: number };

let cached: FxPair | null = null;

export async function fetchInrNprRate(): Promise<FxPair> {
  const now = Date.now();
  if (cached && now - cached.fetchedAt < 6 * 60 * 60 * 1000) return cached;
  try {
    // Use exchangerate.host (free) with INR base to get NPR
    const res = await fetch("https://api.exchangerate.host/latest?base=INR&symbols=NPR", { cache: "no-store" });
    const json = await res.json().catch(() => ({} as any));
    const nprPerInr = Number(json?.rates?.NPR) || 1.6; // sensible fallback
    const inrPerNpr = 1 / nprPerInr;
    cached = { inrPerNpr, nprPerInr, fetchedAt: now };
    return cached;
  } catch {
    // Fallback approximate rate if network fails
    cached = { inrPerNpr: 1 / 1.6, nprPerInr: 1.6, fetchedAt: now };
    return cached;
  }
}

export function formatCurrency(amount: number, currency: "INR" | "NPR") {
  // Use consistent formatting to avoid hydration mismatches
  const formattedAmount = new Intl.NumberFormat('en-US', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  }).format(amount);
  
  return `${currency} ${formattedAmount}`;
}



