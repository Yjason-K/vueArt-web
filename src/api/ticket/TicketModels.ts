import { FailResponse, SuccessResponse } from '@api/globalResTypes';

// POST /api/ticket
export interface TicketRequest {
  ticketName: string;
  price: number;
  startDate: string; // date-time
  endDate: string; // date-time
  totalQuantity: number;
  exhibitionId: number;
}

export type CreateTicketResponse = SuccessResponse | FailResponse;
