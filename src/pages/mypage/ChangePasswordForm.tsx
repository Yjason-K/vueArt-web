// src/pages/mypage/ChangePasswordForm.tsx
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateMyInfo } from '@/api/user';

const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, '8자 이상이어야 합니다.')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^]).+$/,
        '영문, 숫자, 특수문자를 포함해야 합니다.',
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function ChangePasswordForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateMyInfo({ password: data.newPassword });
      toast({
        title: '비밀번호 변경 완료',
        description: '새 비밀번호로 저장되었습니다.',
        status: 'success',
        isClosable: true,
      });
      reset();
      onSuccess?.(); // 모달 닫기용 콜백 호출
    } catch {
      toast({
        title: '변경 실패',
        description: '서버 오류가 발생했습니다.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack align="start" spacing={4}>
        <FormControl isInvalid={!!errors.newPassword}>
          <FormLabel>새 비밀번호</FormLabel>
          <Input type="password" {...register('newPassword')} />
          <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input type="password" {...register('confirmPassword')} />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
          변경하기
        </Button>
      </VStack>
    </form>
  );
}
