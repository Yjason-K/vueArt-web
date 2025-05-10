// src/pages/mypage/AccountSettingsPage.tsx
import {
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { useRef } from 'react';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountSettingsPage() {
  const toast = useToast();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef(null);

  const {
    isOpen: isPwModalOpen,
    onOpen: openPwModal,
    onClose: closePwModal,
  } = useDisclosure();

  const handleSendEmailVerification = () => {
    toast({
      title: '인증 메일 발송',
      description: '이메일 인증 메일이 전송되었습니다.',
      status: 'info',
      isClosable: true,
    });
  };

  const handleRequestBusiness = () => {
    toast({
      title: '등록 요청 완료',
      description: '사업자 인증 요청이 제출되었습니다.',
      status: 'success',
      isClosable: true,
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: '계정 삭제',
      description: '계정이 삭제되었습니다. (실제 API 필요)',
      status: 'error',
      isClosable: true,
    });
    onDeleteClose();
  };

  return (
    <VStack spacing={8} align="stretch">
      {/* 이메일 인증 */}
      <Box>
        <Text fontWeight="bold">이메일 인증</Text>
        <HStack mt={2}>
          <Text>현재 상태: 인증되지 않음</Text>
          <Button size="sm" onClick={handleSendEmailVerification}>
            인증 메일 보내기
          </Button>
        </HStack>
      </Box>

      <Divider />

      {/* 소셜 계정 연동 */}
      <Box>
        <Text fontWeight="bold">소셜 계정 연동</Text>
        <VStack align="start" spacing={2} mt={2}>
          <HStack>
            <Text>Google: 연동 안됨</Text>
            <Button size="sm" colorScheme="blue">
              연동하기
            </Button>
          </HStack>
          <HStack>
            <Text>Instagram: 연동 안됨</Text>
            <Button size="sm" colorScheme="blue">
              연동하기
            </Button>
          </HStack>
          <HStack>
            <Text>KaKaoTalk: 연동 안됨</Text>
            <Button size="sm" colorScheme="blue">
              연동하기
            </Button>
          </HStack>
          <HStack>
            <Text>Naver: 연동 안됨</Text>
            <Button size="sm" colorScheme="blue">
              연동하기
            </Button>
          </HStack>
        </VStack>
      </Box>

      <Divider />

      {/* 사업자 인증 */}
      <Box>
        <Text fontWeight="bold">전시 등록자 인증</Text>
        <HStack mt={2}>
          <Text>현재 상태: 미인증</Text>
          <Button size="sm" onClick={handleRequestBusiness}>
            등록 요청
          </Button>
        </HStack>
      </Box>

      <Divider />

      {/* 비밀번호 변경 */}
      <Box>
        <Text fontWeight="bold">비밀번호 변경</Text>
        <Button size="sm" mt={2} onClick={openPwModal}>
          비밀번호 변경
        </Button>
      </Box>

      <Modal isOpen={isPwModalOpen} onClose={closePwModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>비밀번호 변경</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ChangePasswordForm onSuccess={closePwModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Divider />
      {/* 회원 탈퇴 */}
      <Box>
        <Text fontWeight="bold" color="red.500">
          계정 삭제
        </Text>
        <Button colorScheme="red" size="sm" mt={2} onClick={onDeleteOpen}>
          회원 탈퇴
        </Button>
      </Box>

      {/* 탈퇴 확인 다이얼로그 */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>정말로 탈퇴하시겠습니까?</AlertDialogHeader>
            <AlertDialogBody>
              계정이 완전히 삭제되며 복구할 수 없습니다.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                취소
              </Button>
              <Button colorScheme="red" onClick={handleDeleteAccount} ml={3}>
                탈퇴하기
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
}
