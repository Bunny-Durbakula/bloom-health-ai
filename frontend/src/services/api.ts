import { ChatResponse, DocumentAnalysisResponse, User } from '../types';

const API_BASE = '/api';

function getToken(): string | null {
  return localStorage.getItem('bloom_token');
}

export function setToken(token: string | null): void {
  if (token) {
    localStorage.setItem('bloom_token', token);
  } else {
    localStorage.removeItem('bloom_token');
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Set default JSON Content-Type unless FormData is passed
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: `Request failed with status ${response.status}` };
    }
    const error = new Error(errorData.message || 'An unexpected error occurred');
    (error as unknown as { status: number }).status = response.status;
    (error as unknown as { data: unknown }).data = errorData;
    throw error;
  }

  return response.json();
}

export const api = {
  // Health
  checkHealth: () => request<{ status: string; service: string }>('/health'),

  // Chat
  sendMessage: (payload: { message: string; language: string; conversationId?: string | null }) =>
    request<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  // Auth
  register: (payload: { email: string; password: string }) =>
    request<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  login: (payload: { email: string; password: string }) =>
    request<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  logout: () =>
    request<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),

  getMe: () => request<User>('/auth/me'),

  // Medical Document Analysis
  analyzeDocument: (file: File, language: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    return request<DocumentAnalysisResponse>('/documents/analyze', {
      method: 'POST',
      body: formData,
    });
  },
};
