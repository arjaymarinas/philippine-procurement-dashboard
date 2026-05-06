const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

export const api = {
  getAwards: () => fetchFromAPI<{ data: Award[]; count: number }>('/api/awards'),
  getStats: () => fetchFromAPI<DashboardStats>('/api/stats'),
  getVendors: () => fetchFromAPI<{ data: Vendor[]; count: number }>('/api/vendors'),
  healthCheck: () => fetchFromAPI<{ status: string; timestamp: string }>('/api/health'),
};

// Types
export interface Award {
  id: string;
  title: string;
  vendor_name: string;
  contract_value: string;
  award_date: string;
  category: string;
  status: string;
}

export interface DashboardStats {
  totalBids: number;
  totalContractValue: number;
  activeVendors: number;
  awardsThisYear: number;
}

export interface Vendor {
  name: string;
  totalContracts: number;
  totalValue: number;
}
