import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '@assets/theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 기본 restCSS - true*/}
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
