export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Book {
  id: string;
  userId: string;
  title: string;
  totalPages: number;
  currentPage: number;
  previousPage: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export type FeedbackType = 'no-progress' | 'small-progress' | 'medium-progress' | 'great-progress' | 'almost-done' | 'completed';

export interface CharacterFeedback {
  type: FeedbackType;
  message: string;
  imageUrl: string;
}
