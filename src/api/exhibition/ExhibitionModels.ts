import { SuccessResponse } from '@api/globalResTypes';

// POST /api/exhibition/exhibition-info (전시회 정보 저장)
// PUT  /api/exhibition/exhibition-info/{id} (전시회 정보 수정)
export interface ExhibitionInfoRequest {
  title: string;
  summary: string;
  description: string;
  startDate: string; // date
  endDate: string; // date
  location: string;
  isPresale: boolean;
  categoryId: number;
}

export type ExhibitionInfoResponse = SuccessResponse;

// export type CreateExhibitionResponse = SuccessResponse | FailResponse;
// export type UpdateExhibitionResponse = SuccessResponse | FailResponse;
