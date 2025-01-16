export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface FileContent {
  name: string;
  content: string;
}