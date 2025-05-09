export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  content: string;
  id: string;
}

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  message: ChatMessage;
}
