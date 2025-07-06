import { Box, HStack, Text } from '@chakra-ui/react';
import LegendItem from '../molecules/LegendItem';
import COLORS from '../constants/chartColors';

const RADIUS = 1;

export default function ProductPieChart({ data }) {
  if (data.length === 0) {
    return (
      <Text textAlign="center" color="gray.500">
        No data to display.
      </Text>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <HStack align="center" spacing={8} flexWrap="wrap">
      <Box>
        <svg width="300" height="300" viewBox="-1 -1 2 2">
          <g transform="rotate(-90)">
            {data.map((slice, index) => {
              const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
              const slicePercent = slice.value / total;
              cumulativePercent += slicePercent;
              const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
              const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

              const pathData = `
                M ${startX} ${startY}
                A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${endX} ${endY}
                L 0 0
              `;

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={slice.color || COLORS[index % COLORS.length]}
                  stroke="#fff"
                  strokeWidth="0.01"
                />
              );
            })}
          </g>

          {/* Labels */}
          {(() => {
            let labelCumulative = 0;
            return data.map((slice, index) => {
              const slicePercent = slice.value / total;
              const midPercent = labelCumulative + slicePercent / 2;
              labelCumulative += slicePercent;
              const angle = 2 * Math.PI * midPercent;
              const labelX = 0.5 * Math.cos(angle - Math.PI / 2);
              const labelY = 0.5 * Math.sin(angle - Math.PI / 2);
              const percentage = `${(slicePercent * 100).toFixed(1)}%`;

              return (
                <text
                  key={`label-${index}`}
                  x={labelX}
                  y={labelY}
                  fill="white"
                  fontSize="0.08"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {percentage}
                </text>
              );
            });
          })()}
        </svg>
      </Box>

      <Box>
        {data.map((slice, index) => (
          <LegendItem
            key={index}
            color={slice.color || COLORS[index % COLORS.length]}
            label={slice.name}
          />
        ))}
      </Box>
    </HStack>
  );
}
