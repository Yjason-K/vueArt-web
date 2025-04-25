import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { SignupForm } from './SignupForm.tsx'; // 경로는 실제 폴더 구조에 맞게 수정

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회원가입</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* 회원가입 폼 컴포넌트 */}
          <SignupForm onSuccess={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
