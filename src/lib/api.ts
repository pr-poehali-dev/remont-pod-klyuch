const API_FUNCTIONS = {
  activation: 'https://functions.poehali.dev/3e8f23e9-0df0-40bd-9232-4904769d38f0',
  tasks: 'https://functions.poehali.dev/a29307b8-67a5-4868-91d2-61833462e14c',
  taxReports: 'https://functions.poehali.dev/2d73a910-182a-4f8c-9f82-1e4c985f07fa',
  aiChat: 'https://functions.poehali.dev/46a6f4a5-8997-492d-86e5-531b4d7664b5',
};

function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

async function apiRequest(url: string, options: RequestInit = {}) {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
  
  if (response.status === 401) {
    clearAuthToken();
    window.location.href = '/';
    throw new Error('Unauthorized');
  }
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }
  
  return response.json();
}

export const activationAPI = {
  create: async () => {
    return apiRequest(API_FUNCTIONS.activation, {
      method: 'POST',
      body: JSON.stringify({ expires_days: 30 }),
    });
  },
  
  list: async () => {
    return apiRequest(API_FUNCTIONS.activation, {
      method: 'GET',
    });
  },
  
  activate: async (code: string) => {
    return apiRequest(`${API_FUNCTIONS.activation}?action=activate`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },
};

export const tasksAPI = {
  create: async (data: {
    task_type: string;
    title: string;
    description: string;
    priority: string;
    due_date?: string;
  }) => {
    return apiRequest(API_FUNCTIONS.tasks, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  list: async (params?: { status?: string; limit?: number; offset?: number }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    
    const url = query.toString() ? `${API_FUNCTIONS.tasks}?${query}` : API_FUNCTIONS.tasks;
    return apiRequest(url, { method: 'GET' });
  },
  
  update: async (id: number, data: {
    status?: string;
    description?: string;
    priority?: string;
    due_date?: string;
  }) => {
    return apiRequest(`${API_FUNCTIONS.tasks}?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

export const taxReportsAPI = {
  create: async (data: {
    report_type: string;
    title: string;
    due_date: string;
    frequency?: string;
    reminder_days?: number;
  }) => {
    return apiRequest(API_FUNCTIONS.taxReports, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  list: async (params?: {
    from_date?: string;
    to_date?: string;
    status?: string;
  }) => {
    const query = new URLSearchParams();
    if (params?.from_date) query.set('from_date', params.from_date);
    if (params?.to_date) query.set('to_date', params.to_date);
    if (params?.status) query.set('status', params.status);
    
    const url = query.toString() ? `${API_FUNCTIONS.taxReports}?${query}` : API_FUNCTIONS.taxReports;
    return apiRequest(url, { method: 'GET' });
  },
  
  update: async (id: number, data: {
    status?: string;
    due_date?: string;
    reminder_days?: number;
  }) => {
    return apiRequest(`${API_FUNCTIONS.taxReports}?id=${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

export const aiChatAPI = {
  send: async (message: string) => {
    return apiRequest(API_FUNCTIONS.aiChat, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
  
  getHistory: async (limit: number = 20) => {
    return apiRequest(`${API_FUNCTIONS.aiChat}?limit=${limit}`, {
      method: 'GET',
    });
  },
};
