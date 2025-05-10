import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  AbsoluteCenter,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { ChatIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconInput } from '../input/IconInput';
import { useNavigate } from 'react-router-dom';
import { SignupModal } from './SignupModal';
import { SocialLoginBtnList } from './SocialLoginBtnList';
import { loginUser } from '@/api/auth'; // 로그인 API 호출
import axios from 'axios';

// Define the schema for form validation
const loginSchema = z.object({
  userId: z
    .string()
    .min(6, { message: 'User ID must be at least 6 characters' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

// Infer the type from the schema
type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  // onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  // onSubmit,
  isLoading = false,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const validateForm = async (data: LoginFormData) => {
    try {
      const validatedData = loginSchema.parse(data);

      // 로그인 api 호출
      await loginUser({
        userId: validatedData.userId,
        password: validatedData.password,
      });
      console.log('Form data validated:', validatedData);
      // 로그인 성공시 메인 페이지로 이동동
      navigate('/'); // 메인 주소 설정 필요요

      // onSubmit(validatedData);
    } catch (error: unknown) {
      console.error('Validation error:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          toast({
            title: '로그인 실패',
            description: '아이디나 비밀번호가 일치하지 않습니다.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: '로그인 실패',
          description: '서버와 통신 중 문제가 발생했습니다.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(validateForm)}
      direction={'column'}
      w="100%"
      justify={'center'}
      align={'center'}
      pr="1rem"
      gap="1rem"
    >
      <VStack spacing={4} align="stretch" w="100%">
        <FormControl isInvalid={!!errors.userId}>
          <FormLabel htmlFor="userId">아이디</FormLabel>
          <IconInput
            icon={<ChatIcon />}
            id="userId"
            placeholder="아이디"
            {...register('userId')}
          />
          {errors.userId && (
            <FormErrorMessage>{errors.userId.message}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <IconInput
            icon={<LockIcon />}
            id="password"
            placeholder="비밀번호"
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
          >
            <IconButton
              variant={'ghost'}
              aria-label="Show password"
              icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
              onClick={() => setShowPassword(!showPassword)}
            />
          </IconInput>
          {errors.password && (
            <FormErrorMessage>{errors.password.message}</FormErrorMessage>
          )}
        </FormControl>

        <Button
          type="submit"
          colorScheme="orange"
          w="100%"
          mt={4}
          isLoading={isLoading}
        >
          로그인
        </Button>
      </VStack>
      <LoginRouteBtn onOpen={onOpen} />
      <SignupModal isOpen={isOpen} onClose={onClose} />
      <Box position="relative" w="100%" h="1px" bg="gray.200">
        <Divider w="100%" />
        <AbsoluteCenter bg="white" px="4" left="50%">
          간편 로그인
        </AbsoluteCenter>
      </Box>
      <SocialLoginBtnList />
    </Flex>
  );
};

const LoginRouteBtn = ({ onOpen }: { onOpen: () => void }) => {
  const navigate = useNavigate();

  return (
    <ButtonGroup w="100%">
      <Button
        w="100%"
        variant={'ghost'}
        colorScheme="gray"
        onClick={() => navigate('/find-id')}
      >
        아이디 찾기
      </Button>
      <Button
        w="100%"
        variant={'ghost'}
        colorScheme="gray"
        onClick={() => navigate('/find-password')}
      >
        비밀번호 찾기
      </Button>
      <Button w="100%" variant={'ghost'} colorScheme="gray" onClick={onOpen}>
        회원가입
      </Button>
    </ButtonGroup>
  );
};

// const SocialLoginBtn = ({
//   icon,
//   onClick,
//   ariaLabel,
// }: {
//   icon: React.ReactNode;
//   onClick: ButtonProps['onClick'];
//   ariaLabel: ButtonProps['aria-label'];
// }) => {
//   return (
//     <Button
//       variant="ghost"
//       colorScheme="gray"
//       w="48px"
//       h="48px"
//       borderRadius="50%"
//       aria-label={ariaLabel}
//       onClick={onClick}
//     >
//       {icon}
//     </Button>
//   );
// };
