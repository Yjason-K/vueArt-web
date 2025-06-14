import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Stack,
} from '@chakra-ui/react';

interface MobileProfileDrawerProps {
  isLoggedIn: boolean;
  isOpen: boolean;
  onClose: () => void;
  handleProfile: () => void;
  handleLogin: () => void;
  handleSignup: () => void;
}

export const MobileProfileDrawer = ({
  isLoggedIn,
  isOpen,
  onClose,
  handleProfile,
  handleLogin,
  handleSignup,
}: MobileProfileDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <>
        <DrawerOverlay />
        <DrawerContent bg={'offWhite'}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px"></DrawerHeader>
          <DrawerBody>
            <Stack spacing={4} mt={4}>
              {isLoggedIn ? (
                <Flex
                  align="center"
                  p={4}
                  borderRadius="md"
                  cursor="pointer"
                  onClick={handleProfile}
                >
                  <Avatar size="sm" bg={'peach'} color={'darkGray'} mr={3} />
                  <Box>프로필</Box>
                </Flex>
              ) : (
                <Stack spacing={4}>
                  <Button
                    w="full"
                    variant="outline"
                    colorScheme="gray"
                    onClick={handleLogin}
                  >
                    로그인
                  </Button>
                  <Button
                    w="full"
                    bg={'darkGray'}
                    color={'offWhite'}
                    _hover={{ bg: 'mediumGray' }}
                    onClick={handleSignup}
                  >
                    회원가입
                  </Button>
                </Stack>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </>
    </Drawer>
  );
};
