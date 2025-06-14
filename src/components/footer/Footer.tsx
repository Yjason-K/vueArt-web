import { Box, SimpleGrid, Heading, Text, Link, Stack } from '@chakra-ui/react';
import { PageWrapper } from '@components/layout/PageWrapper';

export const Footer = () => {
  return (
    <Box as="footer" mt="auto" w="100%" bg="softBlack" py={8} color="gray.100">
      <PageWrapper>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {/* EXHIBITION */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="gray.100">
              EXHIBITION
            </Heading>
            <Text fontSize="sm" color="gray.400">
              전시회 검색 및 예약 서비스를 제공하는 플랫폼입니다.
            </Text>
          </Box>

          {/* 고객센터 */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="gray.100">
              고객센터
            </Heading>
            <Text fontSize="sm" color="gray.400" lineHeight="tall">
              평일 10:00 - 18:00
              <br />
              주말 및 공휴일 휴무
              <br />
              이메일: vue-art@nextdev.com
            </Text>
          </Box>

          {/* 바로가기 */}
          <Box>
            <Heading as="h3" size="md" mb={4} color="gray.100">
              바로가기
            </Heading>
            <Stack spacing={2} fontSize="sm">
              <Link
                href="/about"
                color="gray.300"
                _hover={{ color: 'gray.100' }}
              >
                서비스소개
              </Link>
              <Link
                href="/terms"
                color="gray.300"
                _hover={{ color: 'gray.100' }}
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                color="gray.300"
                _hover={{ color: 'gray.100' }}
              >
                개인정보처리방침
              </Link>
              <Link href="/faq" color="gray.300" _hover={{ color: 'gray.100' }}>
                자주 묻는 질문
              </Link>
            </Stack>
          </Box>
        </SimpleGrid>

        <Box
          mt={8}
          pt={6}
          borderTop="1px solid"
          borderColor="gray.700"
          textAlign="center"
        >
          <Text fontSize="sm" color="gray.400">
            © {new Date().getFullYear()} VUE-ART. All rights reserved.
          </Text>
        </Box>
      </PageWrapper>
    </Box>
  );
};
