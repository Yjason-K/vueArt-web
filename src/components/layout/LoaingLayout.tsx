import { Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

export const LoginLayout = () => {
  return (
    <LoginWrapper>
      <Outlet />
    </LoginWrapper>
  );
};

function LoginWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      minH={'80rem'}
    >
      {children}
    </Flex>
  );
}
