import { HStack, Text } from '@chakra-ui/react';
import ColorBox from '../atoms/ColorBox';

export default function LegendItem({ color, label }) {
  return (
    <HStack align="center" mb="2">
      <ColorBox color={color} />
      <Text fontSize="sm">{label}</Text>
    </HStack>
  );
}
