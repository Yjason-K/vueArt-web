import { CommonResponse } from '@api/globalResTypes';

// POST /api/user/business-register-check
export interface BusinessRegisterDto {
  b_no: string;
}
export interface IsRegisteredBody {
  data: BusinessRegisterDto[];
}

export type CheckBusinessRegisterResponse = CommonResponse<boolean>;
