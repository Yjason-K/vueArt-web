import {
  Box,
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { CalendarExample } from './CalendarExample';

export const ExhTabs = () => {
  return (
    <Box as="section" w="100%" py="8" bg={'offWhite'}>
      <Container
        mx="auto"
        px="4"
        maxW={{
          base: '100%',
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        }}
      >
        <Flex gap={3}>
          <Tabs variant="infoTabs" w="full">
            <TabList>
              <Tab>전시회 일정</Tab>
              <Tab>선택된 전시회 일정</Tab>
            </TabList>
            <TabPanels mt="4" bg={'offWhite'}>
              <TabPanel p={0}>
                <CalendarExample />
              </TabPanel>
              <TabPanel p={4}>
                <Text>사용자 별 선택된 전시회 일정</Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Container>
    </Box>
  );
};
