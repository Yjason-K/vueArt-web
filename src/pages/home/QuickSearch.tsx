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
import { PageWrapper } from '@components/layout';

interface SearchMenuProps {
  title: string;
  options: string[];
}

const SearchMenu = ({ title, options }: SearchMenuProps) => {
  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        w="100%"
        bg="gray.200"
        color="softBlack"
        _hover={{ bg: 'gray.300' }}
      >
        {title}
      </MenuButton>
      <MenuList>
        {options.map((option) => (
          <MenuItem key={option}>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export const QuickSearch = () => {
  return (
    <Box as="section" w="100%" py="8" bg="gray.50">
      <PageWrapper>
        <Text fontSize="2xl" fontWeight="bold" mb="6" color="softBlack">
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
      <SearchMenu title="날짜 선택" options={dateList} />
      <SearchMenu title="장소 선택" options={locationList} />
      <SearchMenu title="분야 선택" options={fieldList} />
      <Button px={6} bg="gray.300" color="softBlack" _hover={{ opacity: 0.9 }}>
        검색
      </Button>
    </>
  );
};
