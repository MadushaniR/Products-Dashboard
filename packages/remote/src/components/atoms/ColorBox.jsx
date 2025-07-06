import { Box } from '@chakra-ui/react';

export default function ColorBox({ color }) {
  // Small square box filled with the given color and rounded corners
  return <Box w="16px" h="16px" bg={color} borderRadius="md" />;
}
