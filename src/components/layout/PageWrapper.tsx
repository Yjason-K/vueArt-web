import { Container, ContainerProps } from '@chakra-ui/react';

export const PageWrapper = (props: ContainerProps) => {
  return (
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
      {...props}
    />
  );
};

export default PageWrapper;
