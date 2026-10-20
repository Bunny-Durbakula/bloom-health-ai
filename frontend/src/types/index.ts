export type Language = 'en' | 'te' | 'hi';

export interface User {
  id: string;
  email: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface ChatResponse {
  conversationId: string;
  message: string;
  language: string;
  timestamp: string;
}

export interface DocumentAnalysisResponse {
  documentId: string;
  originalFilename: string;
  status: 'SUCCESS' | 'NON_MEDICAL' | 'UNCERTAIN' | 'ERROR';
  classification: 'MEDICAL_DOCUMENT' | 'NON_MEDICAL_DOCUMENT' | 'UNCERTAIN_DOCUMENT';
  explanation: string | null;
  message: string;
  processedAt: string;
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  path?: string;
  validationErrors?: string[];
}
