import { extendTheme } from '@chakra-ui/react';
import GlobalStyle from '@assets/theme/globalStyle/globalStyle';

const theme = {
  ...GlobalStyle,
};

export default extendTheme(theme);
