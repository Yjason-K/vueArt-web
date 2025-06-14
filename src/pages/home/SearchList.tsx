import { Box, Text, Grid, Button, Flex } from '@chakra-ui/react';
import { ExhibitionStatus } from '@components/badge/StatusBadge';
import { ExhibitionCard } from '@components/card/ExhibitionCard';
import { PageWrapper } from '@/components/layout';

export const SearchList = () => {
  const SampeData = {
    title: '[서울] 달항아리를 만든 곳, 금사리',
    location: '국립중앙박물관',
    date: '2024-06-25~2025-06-22',
    description:
      '18세기 전반 운영된 경기도 광주 금사리 관요 수습 파편과 완형을 함께 전시',
    price: 12000,
    status: 'onGoing' as ExhibitionStatus,
  };
  const items = [1, 2, 3, 4, 5];
  return (
    <Box as="section" w="100%" py="8" bg="gray.50">
      <PageWrapper>
        <Text fontSize="2xl" fontWeight="bold" mb="6" color="softBlack">
          전시회 리스트
        </Text>
        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={3}>
          {items.map((item) => (
            <ExhibitionCard
              key={item}
              title={SampeData.title}
              date={SampeData.date}
              location={SampeData.location}
              description={SampeData.description}
              price={SampeData.price}
              status={SampeData.status}
            />
          ))}
        </Grid>
        <Flex justifyContent={'center'} mt={4}>
          <Button
            alignSelf={'center'}
            px={6}
            py={4}
            variant={'outline'}
            borderColor="gray.300"
            color="softBlack"
            _hover={{ bg: 'gray.200', color: 'softBlack' }}
          >
            더보기
          </Button>
        </Flex>
      </PageWrapper>
    </Box>
  );
};
