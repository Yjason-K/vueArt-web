import { tabsAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';
import type { PartsStyleObject } from '@chakra-ui/theme-tools';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const infoTabsVariant = definePartsStyle((): PartsStyleObject => {
  return {
    // TabList 부분 (Tabs 아래쪽 라인 역할)
    tablist: {
      borderBottom: '2px solid',
      borderColor: 'gray.300',
    },

    // Tab 개별 스타일
    tab: {
      color: 'gray.500',
      borderBottomWidth: '2px',
      borderBottomColor: 'transparent',
      // _hover: 미선택 탭에 hover 시 스타일
      _hover: {
        color: 'softBlack',
        borderColor: 'gray.500',
      },
      // _active: 클릭할 때 (아직 선택되기 전) 스타일
      _active: {
        bg: 'transparent', // background를 투명하게 유지
      },
      // _selected: 선택된 탭 스타일
      _selected: {
        color: 'softBlack',
        borderColor: 'softBlack',
        fontWeight: 'semibold',
      },
    },

    // TabPanel 기본 여백
    tabpanel: {
      p: 4,
    },
  };
});

const TabsTheme = defineMultiStyleConfig({
  variants: {
    infoTabs: infoTabsVariant,
  },
  defaultProps: {},
});

export default TabsTheme;
