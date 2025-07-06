import { HStack, Text } from '@chakra-ui/react';
import ColorBox from '../atoms/ColorBox';

export default function LegendItem({ color, label }) {
  return (
    <HStack align="center" mb="2">
      {/* Colored square box representing the legend color */}
      <ColorBox color={color} />
      {/* Label text next to the color box */}
      <Text fontSize="sm">{label}</Text>
    </HStack>
  );
}
