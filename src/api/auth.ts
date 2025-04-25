import { createAxiosInstance } from '@/utils/axios';
import { module } from '@/utils/axios/module';

const { get, post } = createAxiosInstance({
  baseURL: module.auth?.url ?? '', // module 객체가 정의되었다고 가정
});

interface SignupData {
  userId: string;
  email: string;
  password: string;
}

export const checkUserIdDuplicate = (userId: string) => {
  return get('/check-id', [], { params: { userId } });
};

export const signupUser = (data: SignupData) => {
  return post('/register', [], data); // module.auth?.subModule?.register?.url 써도 됨
};

interface LoginData {
  userId: string;
  password: string;
}

export const loginUser = (data: LoginData) => {
  return post('/login', [], data); // 구조적 경로 설계 시 subModule 사용 가능
};
