import { Box, Flex, Img } from '@chakra-ui/react';
import logo from '@assets/imgs/login_img.png';
import { LoginForm } from '@components/auth/LoginForm';

const Login = () => {
  return (
    <Box width={'60rem'} margin={'0 auto'}>
      <Flex w="100%" h="100%">
        <LoginForm />
        <Img src={logo} alt="logo" w={'50%'} p="2rem" />
      </Flex>
    </Box>
  );
};

export default Login;
