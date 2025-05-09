// /api/user.ts
import { createAxiosInstance } from '@/utils/axios';

export interface UserInfo {
  nickname: string;
  userId: string;
  profileImageUrl: string; // 프로필 이미지 URL
  // 필요시 email, role 등 추가
}

const { get, post } = createAxiosInstance({ baseURL: '/user' });

export const getMyInfo = () => get('/me');
export const updateMyInfo = (
  data: Partial<{ nickname: string; password: string }>,
) => post('/me', undefined, data);
