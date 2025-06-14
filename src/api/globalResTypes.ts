// 공통 타입
export interface SuccessResponse {
  status: number; // HTTP 상태 코드
  code: string; // 응답 코드, 응답 메시지
  message: string; // 응답 메시지
}

export interface FailResponse {
  status: number; // HTTP 상태 코드
  code: string; // 에러 코드, 에러  메시지
}

export interface CommonResponse<T> {
  status: number; // HTTP 상태 코드
  message: string; // 응답 메시지
  data: T;
}
