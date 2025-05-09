import { Box, Heading, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { UserInfoDisplay } from './UserInfoDisplay';
import { UserInfoForm } from './UserInfoForm';

export default function MyPage() {
  const [editField, setEditField] = useState<
    'nickname' | 'password' | 'userId' | null
  >(null);

  return (
    <Container maxW="lg" py={10}>
      <Heading size="lg" mb={8}>
        마이페이지
      </Heading>

      <UserInfoDisplay
        onEditField={(field) => setEditField(field)}
        onEditProfile={() => alert('프로필 변경 기능은 추후 연결')}
      />

      {editField && (
        <Box mt={10}>
          <UserInfoForm field={editField} onCancel={() => setEditField(null)} />
        </Box>
      )}
    </Container>
  );
}
