import {
  Box,
  Heading,
  Input,
  Button,
  Image,
  InputGroup,
  InputLeftElement,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import placeholder from '@assets/imgs/placeholder.svg';

export const HeroBanner = () => {
  return (
    <Box as="section" position="relative" height="500px" width="100%">
      {/* @TODO 배경 이미지 추가 */}
      <Image
        src={placeholder}
        alt="전시회 키비주얼"
        objectFit="cover"
        width="100%"
        height="100%"
      />

      {/* 오버레이 */}
      <Flex
        position="absolute"
        inset={0}
        bg="softBlackAlpha.700"
        direction="column"
        align="center"
        justify="center"
        px={4}
      >
        <Heading
          mb={8}
          textAlign="center"
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="bold"
          color="gray.50"
        >
          가까운 전시회를 지금 예약하세요
        </Heading>
        <ExhibitionSearchInput />
      </Flex>
    </Box>
  );
};

function ExhibitionSearchInput() {
  return (
    <Box width="100%" maxW="42rem">
      <InputGroup alignItems={'center'}>
        <InputLeftElement pointerEvents="none" h={'100%'}>
          <SearchIcon color="mediumGray" boxSize={5} />
        </InputLeftElement>

        <Input
          type="text"
          placeholder="전시회 이름, 장소, 작가 등을 검색하세요"
          height="56px"
          bg="gray.50"
          border="1px solid transparent"
          borderRadius="md"
          pl={12}
          pr={32}
          fontSize="lg"
          boxShadow="lg"
          focusBorderColor="gray.300"
          _focus={{
            boxShadow: '0 0 0 2px gray.100',
          }}
        />

        <Button
          position="absolute"
          zIndex={3}
          right={2}
          top="50%"
          transform="translateY(-50%)"
          height="40px"
          px={6}
          fontSize="md"
          fontWeight="medium"
          bg="gray.300"
          color="softBlack"
          _hover={{ opacity: 0.9 }}
        >
          검색
        </Button>
      </InputGroup>
    </Box>
  );
}
