import { FailResponse, SuccessResponse } from '@api/globalResTypes';

// GET  /api/subscriptions?subscriberId={subscriberId}
export interface User {
  id: number;
  userId: string;
  password: string;
  email: string;
  business: 'Y' | 'N';
  userName: string;
  region: string;
  role: 'USER';
  provider: string;
  providerId: string;
  createdDate: string; // date-time
  updatedDate: string; // date-time
}

export interface Subscription {
  id: number;
  subscriber: User;
  organizer: User;
  subscribedAt: string; // date-time
}

export type GetSubscriptionsResponse = Subscription[] | FailResponse;

// POST /api/subscriptions
export interface SubscribeRequest {
  subscriberId: number;
  organizerId: number;
}

export type SubscribeResponse = SuccessResponse | FailResponse;

// DELETE /api/subscriptions?subscriberId={}&organizerId={}
export type UnsubscribeResponse = SuccessResponse | FailResponse;
