import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE = {
  activation: 'https://functions.poehali.dev/3e8f23e9-0df0-40bd-9232-4904769d38f0',
  tasks: 'https://functions.poehali.dev/a29307b8-67a5-4868-91d2-61833462e14c',
  taxReports: 'https://functions.poehali.dev/2d73a910-182a-4f8c-9f82-1e4c985f07fa',
  aiChat: 'https://functions.poehali.dev/46a6f4a5-8997-492d-86e5-531b4d7664b5',
};

export const getAuthToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('auth_token');
};

export const setAuthToken = async (token: string): Promise<void> => {
  await AsyncStorage.setItem('auth_token', token);
};

export const clearAuthToken = async (): Promise<void> => {
  await AsyncStorage.removeItem('auth_token');
};

const apiRequest = async (url: string, options: any = {}) => {
  const token = await getAuthToken();
  
  const headers: any = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await axios({
      url,
      method: options.method || 'GET',
      headers,
      data: options.body,
      ...options,
    });
    
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      await clearAuthToken();
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

export const activationAPI = {
  activate: async (code: string) => {
    return apiRequest(`${API_BASE.activation}?action=activate`, {
      method: 'POST',
      body: JSON.stringify({code}),
    });
  },
};

export const tasksAPI = {
  list: async (params?: {status?: string; limit?: number}) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.limit) query.set('limit', params.limit.toString());
    
    const url = query.toString() ? `${API_BASE.tasks}?${query}` : API_BASE.tasks;
    return apiRequest(url);
  },
  
  update: async (id: number, data: any) => {
    return apiRequest(`${API_BASE.tasks}?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

export const taxReportsAPI = {
  list: async (params?: {status?: string}) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    
    const url = query.toString() ? `${API_BASE.taxReports}?${query}` : API_BASE.taxReports;
    return apiRequest(url);
  },
};

export const aiChatAPI = {
  send: async (message: string) => {
    return apiRequest(API_BASE.aiChat, {
      method: 'POST',
      body: JSON.stringify({message}),
    });
  },
  
  getHistory: async (limit: number = 20) => {
    return apiRequest(`${API_BASE.aiChat}?limit=${limit}`);
  },
};
