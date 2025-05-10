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
import { useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupUser } from '@/api/auth';
import { checkUserIdDuplicate } from '@/api/auth'; // 중복 확인 API 호출
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { SocialLoginBtnList } from './SocialLoginBtnList';
import axios from 'axios';

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;

const signupSchema = z
  .object({
    userId: z.string().min(6, '아이디는 6자 이상이어야 합니다.'),
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
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [userIdCheckResult, setUserIdCheckResult] = useState<
    'available' | 'unavailable' | null
  >(null);

  const watchedUserId = watch('userId'); // userID 실시간 감시
  const watchedPassword = watch('password');
  const watchedConfirmPassword = watch('confirmPassword');

  useEffect(() => {
    if (userIdCheckResult !== null) {
      setUserIdCheckResult(null);
    }
  }, [watchedUserId, userIdCheckResult]);

  const isUserIdValid = () => {
    if (!watchedUserId) return false;
    const regex = /^[A-Za-z][A-Za-z0-9]{5,}$/;
    return regex.test(watchedUserId);
  };

  const isPasswordValid = () => {
    if (!watchedPassword) return false;
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^])[A-Za-z\d@$!%*#?&^]{8,}$/;
    return passwordRegex.test(watchedPassword || '');
  };

  const isPasswordMatched = () => {
    return watchedPassword === watchedConfirmPassword;
  };

  const onSubmit = async (data: SignupFormData) => {
    console.log('회원가입 데이터:', data);

    try {
      const { userId, email, password } = data;

      //  API 호출 - 백엔드로 전송
      await signupUser({ userId, email, password });

      // 성공 처리
      alert('회원가입이 완료되었습니다!');
      reset();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      // 실패 처리
      if (axios.isAxiosError(err)) {
        console.error('회원가입 실패:', err.response?.data || err.message);
        if (err.response?.status === 409) {
          alert('이미 존재하는 이메일입니다.');
        }
      } else {
        alert('회원가입 중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch" pb={4}>
        <FormControl isInvalid={!!errors.userId}>
          <FormLabel>아이디</FormLabel>
          <InputGroup>
            <Input
              {...register('userId')}
              placeholder="6자 이상, 문자로 시작"
            />
            <InputRightElement width="6rem">
              <Button
                size="sm"
                colorScheme="gray"
                onClick={async () => {
                  const userId = getValues('userId');
                  try {
                    await checkUserIdDuplicate(userId);
                    setUserIdCheckResult('available' as const);
                  } catch {
                    setUserIdCheckResult('unavailable' as const);
                  }
                }}
                isDisabled={!isUserIdValid()}
              >
                중복 확인
              </Button>
            </InputRightElement>
          </InputGroup>

          {/* 아이디 중복 결과 메시지 표시 */}
          {userIdCheckResult === 'available' && (
            <Box mt={1} fontSize="sm" color="green.500">
              사용 가능한 아이디입니다.
            </Box>
          )}
          {userIdCheckResult === 'unavailable' && (
            <Box mt={1} fontSize="sm" color="red.500">
              이미 사용 중인 아이디입니다.
            </Box>
          )}
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
              placeholder="8자 이상, 영문+숫자+특수문자 포함"
              {...register('password')}
            />

            <InputRightElement width="4rem">
              <IconButton
                variant={'ghost'}
                aria-label="Show password"
                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                onClick={() => setShowPassword(!showPassword)}
                size="sm"
              />
            </InputRightElement>
          </InputGroup>

          {/* 비밀번호 조건 메시지 추가 */}
          {watchedPassword && (
            <Box
              mt={1}
              fontSize="sm"
              color={isPasswordValid() ? 'green.500' : 'red.500'}
            >
              {isPasswordValid()
                ? '사용 가능한 비밀번호입니다.'
                : '비밀번호는 8자 이상, 영문+숫자+특수문자를 포함해야 합니다.'}
            </Box>
          )}

          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input type="password" {...register('confirmPassword')} />

          {/* 비밀번호 일치 여부 메시지 추가 */}
          {watchedConfirmPassword && (
            <Box
              mt={1}
              fontSize="sm"
              color={isPasswordMatched() ? 'green.500' : 'red.500'}
            >
              {isPasswordMatched()
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.'}
            </Box>
          )}

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
