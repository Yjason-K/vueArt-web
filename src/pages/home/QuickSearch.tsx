import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { PageWrapper } from '@/components/layout';

export const QuickSearch = () => {
  return (
    <Box as="section" w="100%" py="8" bg="offWhite">
      <PageWrapper>
        <Text fontSize="2xl" fontWeight="bold" mb="6">
          빠른 검색
        </Text>
        <Flex gap={3}>
          <SeachOptionList />
        </Flex>
      </PageWrapper>
    </Box>
  );
};

const SeachOptionList = () => {
  const dateList = ['오늘', '이번 주말', '이번주', '이번 말'];
  const locationList = [
    '서울',
    '경기',
    '인천',
    '강원',
    '충청',
    '전라',
    '부산',
    '대구',
    '광주',
    '전남',
    '전북',
    '경남',
    '경북',
  ];
  const fieldList = [
    '미술',
    '조각',
    '사진',
    '영화',
    '음악',
    '문학',
    '문화',
    '철학',
    '과학',
    '기타',
  ];
  return (
    <>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          bg="white"
        >
          날짜 선택
        </MenuButton>
        <MenuList>
          {dateList.map((date) => (
            <MenuItem key={date}>{date}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          bg="white"
        >
          장소 선택
        </MenuButton>
        <MenuList>
          {locationList.map((location) => (
            <MenuItem key={location}>{location}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Menu matchWidth>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w="100%"
          bg="white"
        >
          분야 선택
        </MenuButton>
        <MenuList>
          {fieldList.map((field) => (
            <MenuItem key={field}>{field}</MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Button bg="peach" px={6}>
        검색
      </Button>
    </>
  );
};
