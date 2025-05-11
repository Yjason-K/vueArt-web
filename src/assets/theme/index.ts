import { extendTheme } from '@chakra-ui/react';
import GlobalStyle from '@assets/theme/globalStyle/globalStyle';
import colors from '@assets/theme/foundations/colors';
import { components } from '@assets/theme/components';

const theme = {
  ...GlobalStyle,
  colors,
  components,
};

export default extendTheme(theme);
