import { Box } from '@chakra-ui/react';

export default function ColorBox({ color }) {
  return <Box w="16px" h="16px" bg={color} borderRadius="md" />;
}
