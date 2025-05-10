import { Box, SimpleGrid, Heading, Text, Link, Stack } from '@chakra-ui/react';
import { PageWrapper } from '@components/layout/PageWrapper';

export const Footer = () => {
  return (
    <Box as="footer" mt="auto" w="100%" bg="darkGray" py={8} color="offWhite">
      <PageWrapper>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {/* EXHIBITION */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              EXHIBITION
            </Heading>
            <Text fontSize="sm" color="lightGray">
              전시회 검색 및 예약 서비스를 제공하는 플랫폼입니다.
            </Text>
          </Box>

          {/* 고객센터 */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              고객센터
            </Heading>
            <Text fontSize="sm" color="lightGray" lineHeight="tall">
              평일 10:00 - 18:00
              <br />
              주말 및 공휴일 휴무
              <br />
              이메일: vue-art@nextdev.com
            </Text>
          </Box>

          {/* 바로가기 */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              바로가기
            </Heading>
            <Stack spacing={2} fontSize="sm">
              <Link
                href="/about"
                color="lightGray"
                _hover={{ color: 'offWhite' }}
              >
                서비스소개
              </Link>
              <Link
                href="/terms"
                color="lightGray"
                _hover={{ color: 'offWhite' }}
              >
                이용약관
              </Link>
              <Link
                href="/privacy"
                color="lightGray"
                _hover={{ color: 'offWhite' }}
              >
                개인정보처리방침
              </Link>
              <Link
                href="/faq"
                color="lightGray"
                _hover={{ color: 'offWhite' }}
              >
                자주 묻는 질문
              </Link>
            </Stack>
          </Box>
        </SimpleGrid>

        <Box
          mt={8}
          pt={6}
          borderTop="1px solid"
          borderColor="mediumGray"
          textAlign="center"
        >
          <Text fontSize="sm" color="lightGray">
            © {new Date().getFullYear()} VUE-ART. All rights reserved.
          </Text>
        </Box>
      </PageWrapper>
    </Box>
  );
};
