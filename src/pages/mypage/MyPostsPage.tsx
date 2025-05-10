// src/pages/mypage/MyPostsPage.tsx

import {
  Box,
  Heading,
  Input,
  VStack,
  HStack,
  Tag,
  Text,
  Divider,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  tags: string[];
  date: string;
  summary: string;
}

export default function MyPostsPage() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

  // Mock data (추후 API 연동)
  useEffect(() => {
    const mock: Post[] = [];
    setPosts(mock);
    setFilteredPosts(mock);
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(
        posts.filter(
          (post) =>
            post.title.includes(search) ||
            post.tags.some((tag) => tag.includes(search)),
        ),
      );
    }
  }, [search, posts]);

  return (
    <VStack align="start" spacing={6}>
      <Heading size="md">내가 쓴 글</Heading>

      {/* 검색창 */}
      <Input
        placeholder="제목 또는 태그 검색"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 게시글 리스트 */}
      {filteredPosts.map((post) => (
        <Box key={post.id} w="100%" p={4} borderWidth={1} borderRadius="md">
          <HStack justify="space-between">
            <Heading size="sm">{post.title}</Heading>
            <Text fontSize="sm" color="gray.500">
              {post.date}
            </Text>
          </HStack>

          <HStack spacing={2} mt={2}>
            {post.tags.map((tag) => (
              <Tag key={tag} variant="subtle" colorScheme="blue">
                {tag}
              </Tag>
            ))}
          </HStack>

          <Text mt={2} color="gray.700">
            {post.summary}
          </Text>

          <Divider my={4} />

          <HStack justify="flex-end">
            <Button size="sm" variant="outline">
              보기
            </Button>
            <Button size="sm" colorScheme="gray">
              수정
            </Button>
            <Button size="sm" colorScheme="red">
              삭제
            </Button>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
}
