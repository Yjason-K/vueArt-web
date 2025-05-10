import { useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Avatar,
  IconButton,
  useDisclosure,
  Stack,
  useBreakpointValue,
  ButtonProps,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { MobileProfileDrawer } from '@components/header/MobileProfileDrawer';

export const Header = () => {
  // Mock authentication state - replace with actual auth logic
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // For mobile menu
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogin = () => {
    // Navigation logic to login page
    console.log('Navigate to login page');
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    // Navigation logic to signup page
    console.log('Navigate to signup page');
  };

  const handleProfile = () => {
    // Navigation logic to profile page
    console.log('Navigate to profile page');
    setIsLoggedIn(false);
  };

  return (
    <Box
      as="header"
      bg={'offWhite'}
      color={'darkGray'}
      boxShadow="sm"
      position="sticky"
      top={0}
      zIndex={5}
    >
      <Flex
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        py={3}
        px={4}
      >
        {/* Logo */}
        <Box fontSize="xl" fontWeight="bold">
          Vue-Art
        </Box>

        {/* Desktop Navigation Buttons */}
        {!isMobile && (
          <Flex align="center">
            {isLoggedIn ? (
              <Avatar
                size="sm"
                bg={'peach'}
                color={'darkGray'}
                onClick={handleProfile}
                cursor="pointer"
              />
            ) : (
              <Stack direction="row" spacing={4}>
                <HeaderButton onClick={handleLogin}>로그인</HeaderButton>
                <HeaderButton onClick={handleSignup}>회원가입</HeaderButton>
              </Stack>
            )}
          </Flex>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            onClick={onOpen}
          />
        )}

        {/* Mobile Drawer */}
        <MobileProfileDrawer
          isLoggedIn={isLoggedIn}
          isOpen={isOpen}
          onClose={onClose}
          handleProfile={handleProfile}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      </Flex>
    </Box>
  );
};

function HeaderButton(props: ButtonProps) {
  return (
    <Button size="sm" variant="ghost" _hover={{ opacity: 0.5 }} {...props} />
  );
}
