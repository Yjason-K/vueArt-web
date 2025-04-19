import { CircularProgress, Flex } from '@chakra-ui/react';

export const CenterSpinner = () => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
      minH={'80rem'}
    >
      <CircularProgress isIndeterminate color="gray.300" alignSelf="center" />
    </Flex>
  );
};
