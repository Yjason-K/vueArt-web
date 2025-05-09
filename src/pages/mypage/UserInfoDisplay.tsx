import {
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { getMyInfo, UserInfo } from '@/api/user';

export function UserInfoDisplay({
  onEditField,
  onEditProfile,
}: {
  onEditField: (field: 'nickname' | 'password') => void;
  onEditProfile: () => void;
}) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    getMyInfo().then((res) => setUser(res.data));
  }, []);

  if (!user) return <Text>로딩 중...</Text>;

  return (
    <VStack spacing={6} align="start">
      <HStack spacing={6}>
        <Avatar
          size="xl"
          name={user.nickname}
          src={user.profileImageUrl || undefined}
        />
        <Button onClick={onEditProfile}>프로필 사진 변경</Button>
      </HStack>

      <Box>
        <HStack justify="space-between">
          <Text fontWeight="bold">닉네임</Text>
          <HStack>
            <Text>{user.nickname}</Text>
            <Button size="sm" onClick={() => onEditField('nickname')}>
              변경
            </Button>
          </HStack>
        </HStack>
        <Divider mt={2} />
      </Box>

      <Box>
        <HStack justify="space-between">
          <Text fontWeight="bold">아이디</Text>
          <Text>{user.userId}</Text>
        </HStack>
        <Divider mt={2} />
      </Box>

      <Box>
        <HStack justify="space-between">
          <Text fontWeight="bold">비밀번호</Text>
          <HStack>
            <Text>********</Text>
            <Button size="sm" onClick={() => onEditField('password')}>
              변경
            </Button>
          </HStack>
        </HStack>
        <Divider mt={2} />
      </Box>
    </VStack>
  );
}
