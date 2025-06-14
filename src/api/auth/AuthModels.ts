import {
  CommonResponse,
  FailResponse,
  SuccessResponse,
} from '@api/globalResTypes';

// POST /api/auth/sign-up
export interface SignUpRequest {
  email: string;
  userId: string;
  password: string;
  region: string;
}

export type SignUpResponse = SuccessResponse | FailResponse;

// POST /api/auth/sign-in
export interface SignInRequest {
  userId: string;
  password: string;
}

export interface TokenDto {
  accessToken: string;
  refreshToken: string;
}

export type CommonApiResponseTokenDto = CommonResponse<TokenDto>;

export type SignInResponse = CommonApiResponseTokenDto | FailResponse;
