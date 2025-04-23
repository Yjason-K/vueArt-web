import { extendTheme } from '@chakra-ui/react';
import GlobalStyle from '@assets/theme/globalStyle/globalStyle';
import colors from '@assets/theme/foundations/colors';

const theme = {
  ...GlobalStyle,
  colors,
};

export default extendTheme(theme);
