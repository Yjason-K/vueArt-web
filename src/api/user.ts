// /api/user.ts
import { createAxiosInstance } from '@/utils/axios';

export interface UserInfo {
  userId: string;
  nickname: string;
  profileImageUrl?: string; // 프로필 이미지 URL
  keywords?: string[];
  // 필요시 email, role 등 추가
}

const { get, post } = createAxiosInstance({ baseURL: '/user' });

// 사용자 정보 조회
export const getMyInfo = () => get<UserInfo>('/me');

// 사용자 정보 수정
export const updateMyInfo = (
  data: Partial<{ nickname: string; password: string }>,
) => post('/me', undefined, data);

// 프로필 이미지 업로드
export const uploadProfileImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch('/api/user/profile-image', {
    method: 'POST',
    body: formData,
  });
};
