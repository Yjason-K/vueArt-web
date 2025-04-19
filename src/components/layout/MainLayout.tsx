import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Box as={'header'}>{/* Header 표시 영역 */}</Box>
      <Outlet />
    </>
  );
};

export default MainLayout;
