import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Box,
  AbsoluteCenter,
  Divider,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//import { signupUser } from '@/api/auth';
import { checkUserIdDuplicate } from '@/api/auth'; // 중복 확인 API 호출
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { SocialLoginBtnList } from './SocialLoginBtnList';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;

const signupSchema = z
  .object({
    userId: z.string().min(4, '아이디는 4자 이상이어야 합니다.'),
    email: z.string().email('유효한 이메일을 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다.')
      .regex(passwordRegex, '영문, 숫자, 특수문자를 모두 포함해야 합니다.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSuccess?: () => void;
}

export const SignupForm = ({ onSuccess }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  //const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data: SignupFormData) => {
    console.log('회원가입 데이터:', data);

    /*

    try {
      const { userId, email, password } = data;

      // ✨ API 호출 - 백엔드로 전송
      await signupUser({ userId, email, password });

      // 성공 처리
      reset(); // 입력 값 초기화
      if (onSuccess) onSuccess(); // 모달 닫기
      alert('회원가입이 완료되었습니다!');
    } catch (err: any) {
      // 실패 처리
      console.error('회원가입 실패:', err.response?.data || err.message);
      alert('회원가입 중 문제가 발생했습니다.');
    }

    */
    // 성공 시
    reset(); // 폼 초기화
    if (onSuccess) onSuccess(); // 모달 닫기
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch" pb={4}>
        <FormControl isInvalid={!!errors.userId}>
          <FormLabel>아이디</FormLabel>
          <InputGroup>
            <Input {...register('userId')} />
            <InputRightElement width="6rem">
              <Button
                size="sm"
                colorScheme="teal"
                onClick={async () => {
                  const userId = getValues('userId');
                  try {
                    await checkUserIdDuplicate(userId);
                    alert('사용 가능한 아이디입니다.');
                  } catch {
                    alert('이미 사용 중인 아이디입니다다.');
                  }
                }}
              >
                중복 확인
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.userId?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel>이메일</FormLabel>
          <Input {...register('email')} />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel>비밀번호</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
            />
            <InputRightElement width="4rem">
              <IconButton
                variant={'ghost'}
                aria-label="비밀번호 보기기"
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
              />
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input type="password" {...register('confirmPassword')} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="orange"
          isLoading={isSubmitting}
          mt={4}
          mb={4}
        >
          가입하기
        </Button>
        <Box position="relative" w="100%" h="1px" bg="gray.200">
          <Divider w="100%" />
          <AbsoluteCenter bg="white" px="4" left="50%">
            간편 회원가입
          </AbsoluteCenter>
        </Box>
        <SocialLoginBtnList />
      </VStack>
    </form>
  );
};
