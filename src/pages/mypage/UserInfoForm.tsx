import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { updateMyInfo } from '@/api/user';

interface Props {
  field: 'nickname' | 'password';
  onCancel: () => void;
}

export function UserInfoForm({ field, onCancel }: Props) {
  const toast = useToast();

  const schema = z.object({
    value: z
      .string()
      .min(field === 'password' ? 8 : 2, `${field} 값이 너무 짧습니다`),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ value: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { value: string }) => {
    try {
      await updateMyInfo(
        field === 'password'
          ? { password: data.value }
          : { nickname: data.value }, // 아이디 변경은 별도 API로 뺄 수도 있음
      );
      toast({
        title: '변경 완료',
        description: `${field} 변경이 완료되었습니다.`,
        status: 'success',
        isClosable: true,
      });
      onCancel();
    } finally {
      toast({
        title: '오류 발생',
        description: '정보 변경 중 문제가 발생했습니다.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="start">
        <FormControl isInvalid={!!errors.value}>
          <FormLabel>
            {field === 'nickname' ? '새 닉네임' : '새 비밀번호'}
          </FormLabel>
          <Input
            type={field === 'password' ? 'password' : 'text'}
            {...register('value')}
          />
          <FormErrorMessage>{errors.value?.message}</FormErrorMessage>
        </FormControl>
        <HStack>
          <Button type="submit" colorScheme="blue" isLoading={isSubmitting}>
            저장
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            취소
          </Button>
        </HStack>
      </VStack>
    </form>
  );
}
