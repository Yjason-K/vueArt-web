import { FailResponse } from '@api/globalResTypes';

// PATCH /api/notifications/{id}/read
export type MarkAsReadResponse = void | FailResponse;

// PATCH /api/notifications/read-all?userId={userId}
export type MarkAllAsReadResponse = void | FailResponse;
