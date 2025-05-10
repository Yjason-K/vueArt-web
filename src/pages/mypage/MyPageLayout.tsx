// src/pages/mypage/MyPageLayout.tsx
import { Box, Flex, VStack, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';

export default function MyPageLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const menuItems = [
    { label: '프로필', path: '/mypage/profile' },
    { label: '계정 관리', path: '/mypage/account' },
    { label: '내가 쓴 글', path: '/mypage/posts' },
  ];

  return (
    <Flex minH="100vh" bg="gray.50">
      {/* 사이드 메뉴 */}
      <VStack
        align="stretch"
        w="200px"
        p={6}
        bg="white"
        borderRight="1px solid #E2E8F0"
        spacing={4}
      >
        <Heading size="md" mb={4}>
          내 계정
        </Heading>
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={currentPath === item.path ? 'solid' : 'ghost'}
            colorScheme="blue"
            justifyContent="flex-start"
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Button>
        ))}
      </VStack>

      {/* 메인 콘텐츠 영역 */}
      <Box flex="1" p={10}>
        <Outlet />
      </Box>
    </Flex>
  );
}
