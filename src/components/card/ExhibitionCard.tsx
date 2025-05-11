import {
  Box,
  Image,
  Heading,
  Text,
  Link,
  Flex,
  Stack,
  Button,
} from '@chakra-ui/react';
import { CalendarIcon, InfoIcon } from '@chakra-ui/icons';
import placeholder from '@assets/imgs/placeholder.svg';
import {
  StatusBadge,
  type ExhibitionStatus,
} from '@components/badge/StatusBadge';

interface ExhibitionCardProps {
  image?: string;
  title: string;
  date: string;
  location: string;
  description: string;
  price: number;
  status: ExhibitionStatus;
}

export const ExhibitionCard = ({
  image,
  title,
  date,
  location,
  description,
  price,
  status,
}: ExhibitionCardProps) => {
  return (
    <Box
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ boxShadow: 'lg' }}
    >
      {/* 전시회 이미지 */}
      <Box position="relative" height="240px" overflow="hidden">
        <Image
          src={image || placeholder}
          alt="전시회 이미지"
          objectFit="cover"
          width="100%"
          height="100%"
          transition="transform 0.3s"
          _groupHover={{ transform: 'scale(1.05)' }}
        />
        {/* 전시회 상태 배지 */}
        <StatusBadge status={status} position="absolute" bottom={2} left={2} />
      </Box>

      {/* 내용 */}
      <Box p={4}>
        <Heading as="h3" size="md" mb={2} noOfLines={1} color="darkGray">
          {/* 전시회 제목 */}
          <Link href="/exhibition/1" _hover={{ color: 'mediumGray' }}>
            {title}
          </Link>
        </Heading>
        {/* 전시회 정보 */}
        <Stack spacing={3} color="mediumGray" fontSize="sm" mb={4}>
          <Flex align="center">
            <CalendarIcon mr={1} boxSize={4} />
            <Text>{date}</Text>
          </Flex>
          <Flex align="center">
            <InfoIcon mr={1} boxSize={4} />
            <Text>{location}</Text>
          </Flex>
        </Stack>
        <Text noOfLines={2} mb={4} color="mediumGray" fontSize="sm">
          {description}
        </Text>
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium" color="darkGray">
            ₩{price}
          </Text>
          {/* @TODO 전시회 상태에 따른 로직 분기 필요 */}
          <Button
            as={Link}
            href="/booking/1"
            size="sm"
            bg="peach"
            color="darkGray"
            _hover={{ bg: 'peachAlpha.800' }}
          >
            예약하기
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
