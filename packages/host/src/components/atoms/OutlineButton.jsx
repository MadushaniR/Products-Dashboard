import { Button } from '@chakra-ui/react';

export default function OutlineButton({ children, ...props }) {
  return (
    <Button variant="outline" colorScheme="red" w="100%" {...props}>
      {children}
    </Button>
  );
}
