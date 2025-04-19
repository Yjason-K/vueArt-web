import { forwardRef, ForwardedRef } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

export interface IconInputProps extends InputProps {
  icon?: React.ReactNode;
  placeholder?: string;
  children?: React.ReactNode;
}

export const IconInput = forwardRef(
  (props: IconInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { icon, placeholder, children, ...rest } = props;

    return (
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">{icon}</InputLeftElement>
        )}
        <Input type="text" placeholder={placeholder} ref={ref} {...rest} />
        {children && <InputRightElement>{children}</InputRightElement>}
      </InputGroup>
    );
  },
);

IconInput.displayName = 'IconInput';
