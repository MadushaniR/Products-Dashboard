import { Button } from '@chakra-ui/react';

export default function PrimaryButton({ children, ...props }) {
  return (
    <Button colorScheme="teal" w="100%" {...props}>
      {children}
    </Button>
  );
}
