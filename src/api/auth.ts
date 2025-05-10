import { createAxiosInstance } from '@/utils/axios';
//import { module } from '@/utils/axios/module';

const { get, post } = createAxiosInstance({
  baseURL: 'http://10.180.220.45:8080/api', // module 객체가 정의되었다고 가정
});

interface SignupData {
  email: string;
  userId: string;
  password: string;
}

export const checkUserIdDuplicate = (userId: string) => {
  return get('/auth/check-id', [], { params: { userId } });
};

export const signupUser = (data: SignupData) => {
  return post('/auth/sign-up', [], data); // module.auth?.subModule?.register?.url 써도 됨
};

interface LoginData {
  userId: string;
  password: string;
}

export const loginUser = (data: LoginData) => {
  return post('/auth/sign-in', [], data); // 구조적 경로 설계 시 subModule 사용 가능
};
