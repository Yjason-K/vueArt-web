import { useState, useRef, useEffect } from 'react';

import {
  Box,
  Flex,
  IconButton,
  IconButtonProps,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ExhibitionCard } from '@components/card/ExhibitionCard';
import { ExhibitionStatus } from '@components/badge/StatusBadge';
import { PageWrapper } from '@components/layout';

export const Recommend = () => {
  return (
    <Box as="section" w="100%" py="12">
      <PageWrapper>
        <Text fontSize="2xl" fontWeight="bold">
          오늘 뜨는 추천 전시회
        </Text>
        <ExhibitionSlider />
      </PageWrapper>
    </Box>
  );
};

function ExhibitionSlider() {
  const SampeData = {
    title: '[서울] 달항아리를 만든 곳, 금사리',
    location: '국립중앙박물관',
    date: '2024-06-25~2025-06-22',
    description:
      '18세기 전반 운영된 경기도 광주 금사리 관요 수습 파편과 완형을 함께 전시',
    price: 12000,
    status: 'onGoing' as ExhibitionStatus,
  };

  const items = [1, 2, 3, 4, 5, 6];
  const itemsPerPage = useBreakpointValue({ base: 1, sm: 2, md: 3 }) ?? 3;
  const totalPages = Math.ceil(items.length / itemsPerPage); // 전체 페이지 수
  const maxIndex = totalPages - 1; // 0부터 시작하므로 pages-1
  const [currentPage, setCurrentPage] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, maxIndex));

  useEffect(() => {
    if (!viewportRef.current || !sliderRef.current) return;
    const slideWidth = viewportRef.current.offsetWidth;
    sliderRef.current.style.transform = `translateX(-${currentPage * slideWidth}px)`;
  }, [currentPage]);

  return (
    <Box position="relative">
      {/* 뷰포트 */}
      <Box overflow="hidden" ref={viewportRef}>
        <Flex
          ref={sliderRef}
          transition="transform 0.3s ease-in-out"
          w={`calc(100% * ${totalPages})`}
        >
          {items.map((item) => (
            <Box
              key={item}
              w={{ base: '100%', sm: '50%', md: `${100 / itemsPerPage}%` }}
              p={2}
            >
              <ExhibitionCard
                title={SampeData.title}
                date={SampeData.date}
                location={SampeData.location}
                description={SampeData.description}
                price={SampeData.price}
                status={SampeData.status}
              />
            </Box>
          ))}
        </Flex>
      </Box>

      {/* 이전 버튼 */}
      <SliderButton
        left={0}
        aria-label="Previous Slide"
        icon={<ChevronLeftIcon />}
        onClick={handlePrev}
        isDisabled={currentPage === 0}
      />

      {/* 다음 버튼 */}
      <SliderButton
        right={-30}
        aria-label="Next Slide"
        icon={<ChevronRightIcon />}
        onClick={handleNext}
        isDisabled={currentPage === maxIndex}
        position="absolute"
      />
    </Box>
  );
}

function SliderButton(props: IconButtonProps) {
  return (
    <IconButton
      position="absolute"
      top="50%"
      transform="translateY(-50%) translateX(-1rem)"
      h={10}
      w={10}
      borderRadius="full"
      bg="whiteAlpha.800"
      boxShadow="md"
      color="darkGray"
      _disabled={{ opacity: 0.3, cursor: 'not-allowed' }}
      {...props}
    />
  );
}

export default ExhibitionSlider;
