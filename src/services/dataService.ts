import type { Customer, Segment, PlatformConnection, Recommendation, AnalyticsData } from '@/types';
import { mockCustomers, mockSegments, mockPlatformConnections, mockRecommendations, mockAnalyticsData } from './mockData';

export const dataService = {
  getCustomers: async (filters?: {
    segment?: string;
    platform?: string;
    sentiment?: string;
    search?: string;
  }): Promise<Customer[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filtered = [...mockCustomers];
    
    if (filters?.segment) {
      filtered = filtered.filter(c => c.segmentId === filters.segment);
    }
    
    if (filters?.platform) {
      filtered = filtered.filter(c => c.platform === filters.platform);
    }
    
    if (filters?.sentiment) {
      filtered = filtered.filter(c => c.sentiment === filters.sentiment);
    }
    
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchLower) ||
        c.email.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  },

  getCustomerById: async (id: string): Promise<Customer | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCustomers.find(c => c.id === id) || null;
  },

  getSegments: async (): Promise<Segment[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSegments;
  },

  getSegmentById: async (id: string): Promise<Segment | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSegments.find(s => s.id === id) || null;
  },

  getPlatformConnections: async (): Promise<PlatformConnection[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockPlatformConnections;
  },

  updatePlatformConnection: async (
    id: string,
    data: Partial<PlatformConnection>
  ): Promise<PlatformConnection> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const connection = mockPlatformConnections.find(c => c.id === id);
    if (!connection) {
      throw new Error('Connection not found');
    }
    return { ...connection, ...data };
  },

  getRecommendations: async (segmentId?: string): Promise<Recommendation[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    if (segmentId) {
      return mockRecommendations.filter(r => r.segmentId === segmentId);
    }
    return mockRecommendations;
  },

  getAnalyticsData: async (): Promise<AnalyticsData> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockAnalyticsData;
  },

  syncPlatformData: async (platformId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  },

  runSegmentation: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
};
