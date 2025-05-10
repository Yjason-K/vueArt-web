// src/pages/mypage/ProfilePage.tsx
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getMyInfo } from '@/api/user';

export default function ProfilePage() {
  const toast = useToast();
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  console.log(profileImage);

  useEffect(() => {
    getMyInfo().then((res) => {
      setUserId(res.data.userId);
      setNickname(res.data.nickname);
      setProfileImageUrl(res.data.profileImageUrl || '');
    });
  }, []);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag('');
    }
  };

  const handleDeleteTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    toast({
      title: '저장 완료',
      description: '회원 정보가 저장되었습니다. (API 연동 예정)',
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <VStack spacing={8} align="start">
      {/* 프로필 이미지 */}
      <HStack spacing={6}>
        <Avatar size="xl" src={profileImageUrl} name={nickname} />
        <Box>
          <FormLabel>프로필 이미지</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
        </Box>
      </HStack>

      {/* 아이디 (read only) */}
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <Input value={userId} isReadOnly />
        <Text fontSize="sm" color="gray.500">
          아이디는 수정할 수 없습니다.
        </Text>
      </FormControl>

      {/* 닉네임 */}
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </FormControl>

      {/* 관심 키워드 */}
      <FormControl>
        <FormLabel>관심 키워드</FormLabel>
        <HStack wrap="wrap">
          {tags.map((tag) => (
            <Tag key={tag} variant="subtle" colorScheme="blue" m={1}>
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleDeleteTag(tag)} />
            </Tag>
          ))}
        </HStack>
        <HStack mt={2}>
          <Input
            placeholder="새 키워드 입력"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button onClick={handleAddTag}>추가</Button>
        </HStack>
      </FormControl>

      <Button colorScheme="blue" onClick={handleSave}>
        저장
      </Button>
    </VStack>
  );
}
