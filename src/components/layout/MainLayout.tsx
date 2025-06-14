import { Outlet } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { Header } from '@components/header/Header';
import { Footer } from '@components/footer/Footer';

const MainLayout = () => {
  return (
    <Flex direction="column" minH="100vh" pos={'relative'}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </Flex>
  );
};

export default MainLayout;
