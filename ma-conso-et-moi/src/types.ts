export type ChallengeStatus = 'available' | 'active' | 'completed' | 'failed';
export type ChallengeType = 'one-time' | 'recurring-daily' | 'recurring-weekly';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: ChallengeType;
  status: ChallengeStatus;
  icon: string;
  ticketsReward: number;
  durationDays?: number;
  completedAt?: Date;
  progress?: number;
  rules?: string[];
}

export interface Action {
  id: string;
  title: string;
  description: string;
  isRecurring: boolean;
  status: 'todo' | 'done';
  ticketsReward: number;
  category: 'consumption' | 'equipment' | 'behavior' | 'learning';
  completedCount: number;
  lastCompletedAt?: Date;
}

export interface UserProfile {
  name: string;
  totalTickets: number;
  completedChallenges: number;
  completedActions: number;
  engagementLevel: 1 | 2 | 3;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  emoji: string;
  drawDate: Date;
  isGrandPrize: boolean;
  ticketsInPool?: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'level-up' | 'tickets';
  tickets?: number;
}
