export interface DashboardData {
  id: string;
  date: string;
  revenue: number;
  users: number;
  conversions: number;
  growth: number;
  spend: number;
  sessions: number;
  bounceRate: number;
  avgSessionDuration: number;
  trafficSources: {
    organic: number;
    paid: number;
    social: number;
    direct: number;
    referral: number;
  };
  topPages: Array<{
    page: string;
    views: number;
    uniqueViews: number;
    bounceRate: number;
  }>;
  campaigns: Array<{
    id: string;
    name: string;
    status: 'active' | 'paused' | 'stopped';
    budget: number;
    spent: number;
    impressions: number;
    clicks: number;
    conversions: number;
    roi: number;
    ctr: number;
    cpc: number;
    startDate: string;
    endDate: string;
  }>;
}

// Generate realistic mock data
export function generateMockData(): DashboardData[] {
  const data: DashboardData[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const baseRevenue = 45000;
    const revenueVariation = (Math.random() - 0.5) * 10000;
    const revenue = Math.max(0, baseRevenue + revenueVariation);
    
    const baseUsers = 1200;
    const usersVariation = (Math.random() - 0.5) * 400;
    const users = Math.max(0, Math.floor(baseUsers + usersVariation));
    
    const conversionRate = 0.02 + (Math.random() - 0.5) * 0.01;
    const conversions = Math.floor(users * conversionRate);
    
    const growth = ((Math.random() - 0.3) * 50);
    
    data.push({
      id: `day-${i}`,
      date: date.toISOString().split('T')[0],
      revenue: Math.round(revenue),
      users,
      conversions,
      growth: Math.round(growth * 10) / 10,
      spend: Math.round(revenue * 0.3),
      sessions: Math.floor(users * 1.3),
      bounceRate: Math.round((0.4 + Math.random() * 0.3) * 100),
      avgSessionDuration: Math.round(120 + Math.random() * 180),
      trafficSources: {
        organic: Math.round(35 + Math.random() * 10),
        paid: Math.round(25 + Math.random() * 10),
        social: Math.round(15 + Math.random() * 10),
        direct: Math.round(15 + Math.random() * 10),
        referral: Math.round(10 + Math.random() * 5),
      },
      topPages: [
        { page: '/dashboard', views: Math.floor(users * 0.4), uniqueViews: Math.floor(users * 0.35), bounceRate: Math.round(Math.random() * 40) },
        { page: '/products', views: Math.floor(users * 0.3), uniqueViews: Math.floor(users * 0.25), bounceRate: Math.round(Math.random() * 50) },
        { page: '/about', views: Math.floor(users * 0.2), uniqueViews: Math.floor(users * 0.18), bounceRate: Math.round(Math.random() * 60) },
        { page: '/contact', views: Math.floor(users * 0.1), uniqueViews: Math.floor(users * 0.08), bounceRate: Math.round(Math.random() * 45) },
      ],
      campaigns: [],
    });
  }

  // Add campaigns data
  const campaigns = [
    {
      id: 'camp-1',
      name: 'Summer Sale 2024',
      status: 'active' as const,
      budget: 15000,
      spent: 12450,
      impressions: 245000,
      clicks: 4900,
      conversions: 98,
      roi: 24.5,
      ctr: 2.0,
      cpc: 2.54,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
    },
    {
      id: 'camp-2',
      name: 'Brand Awareness Q3',
      status: 'active' as const,
      budget: 8500,
      spent: 6200,
      impressions: 180000,
      clicks: 2700,
      conversions: 54,
      roi: 18.2,
      ctr: 1.5,
      cpc: 2.30,
      startDate: '2024-07-01',
      endDate: '2024-09-30',
    },
    {
      id: 'camp-3',
      name: 'Product Launch Campaign',
      status: 'paused' as const,
      budget: 12000,
      spent: 8900,
      impressions: 156000,
      clicks: 3120,
      conversions: 40,
      roi: 12.8,
      ctr: 2.0,
      cpc: 2.85,
      startDate: '2024-05-15',
      endDate: '2024-07-15',
    },
    {
      id: 'camp-4',
      name: 'Holiday Campaign 2024',
      status: 'active' as const,
      budget: 22000,
      spent: 18500,
      impressions: 320000,
      clicks: 6400,
      conversions: 201,
      roi: 31.4,
      ctr: 2.0,
      cpc: 2.89,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
    },
    {
      id: 'camp-5',
      name: 'Back to School',
      status: 'stopped' as const,
      budget: 9500,
      spent: 9500,
      impressions: 167000,
      clicks: 2505,
      conversions: 38,
      roi: 8.9,
      ctr: 1.5,
      cpc: 3.79,
      startDate: '2024-08-01',
      endDate: '2024-09-15',
    },
  ];

  // Add campaigns to the last entry
  if (data.length > 0) {
    data[data.length - 1].campaigns = campaigns;
  }

  return data;
}

export const mockData = generateMockData();