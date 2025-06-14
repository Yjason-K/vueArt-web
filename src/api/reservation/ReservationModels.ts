import { FailResponse, SuccessResponse } from '@api/globalResTypes';

// POST /api/reservation
export interface ReservationRequest {
  ticketId: number;
  exhibitionId: number;
  userId: number;
  boughtQuantity: number;
}

export type ReserveResponse = SuccessResponse | FailResponse;

// POST /api/reservation/{reservationId}/cancel
export type CancelReservationResponse = SuccessResponse | FailResponse;
