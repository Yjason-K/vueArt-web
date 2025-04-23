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
} from '@chakra-ui/react';
import { ChatIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IconInput } from '../input/IconInput';
import { useNavigate } from 'react-router-dom';
import { SignupModal } from './SignupModal';

// Define the schema for form validation
const loginSchema = z.object({
  userId: z
    .string()
    .min(4, { message: 'User ID must be at least 4 characters' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const validateForm = (data: LoginFormData) => {
    try {
      const validatedData = loginSchema.parse(data);
      console.log('Form data validated:', validatedData);
      // onSubmit(validatedData);
    } catch (error) {
      console.error('Validation error:', error);
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

const SocialLoginBtnList = () => {
  return (
    <>
      <Box position="relative" w="100%" h="1px" bg="gray.200">
        <Divider w="100%" />
        <AbsoluteCenter bg="white" px="4" left="50%">
          간편 로그인
        </AbsoluteCenter>
      </Box>
      <ButtonGroup w="100%">
        {/* <SocialLoginBtn
          icon={<Icon   />}
          onClick={() => {}}
          ariaLabel="Google 로그인"
        /> */}
      </ButtonGroup>
    </>
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
