import { Box, Text, HStack, Circle } from '@chakra-ui/react';
import COLORS from '../constants/chartColors';
import { getStepSize, formatCategory } from '../utils/chartHelpers';

export default function ColumnChart({ data, category }) {
  const chartHeight = 300;
  const barWidth = 50;
  const barGap = 30;
  const maxValue = Math.max(...data.map(d => d.value), 0);
  const stepSize = getStepSize(maxValue);
  const maxY = Math.ceil(maxValue / stepSize) * stepSize;
  const stepsCount = Math.floor(maxY / stepSize);
  const chartWidth = data.length * (barWidth + barGap) + barGap;

  return (
    <Box>
      <Text fontWeight="bold" fontSize="md" mb={2}>
        Products in selected Category
      </Text>

      <svg width={chartWidth + 70} height={chartHeight + 40}>
        {/* Y-axis label */}
        <text
          x={-chartHeight / 2}
          y={15}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="14"
          fontWeight="500"
          fill="#333"
        >
          {category ? `${formatCategory(category)} prices in $` : 'Prices in $'}
        </text>

        {/* Grid lines */}
        {[...Array(stepsCount + 1).keys()].map(i => {
          const yValue = i * stepSize;
          const yPos = chartHeight - (yValue / maxY) * chartHeight;

          return (
            <g key={i}>
              <line
                x1={40}
                x2={chartWidth + 40}
                y1={yPos}
                y2={yPos}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              <text x={35} y={yPos + 5} fontSize="12" fill="#666" textAnchor="end">
                {yValue}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const x = 50 + index * (barWidth + barGap);
          const barHeight = maxY > 0 ? (item.value / maxY) * chartHeight : 0;
          const y = chartHeight - barHeight;

          return (
            <g key={item.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={COLORS[index % COLORS.length]}
                rx={2}
              />
              <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize="12" fontWeight="bold">
                {item.value.toFixed(2)} $
              </text>
              <text x={x + barWidth / 2} y={chartHeight + 15} textAnchor="middle" fontSize="11">
                {item.name.length > 18 ? item.name.slice(0, 16) + '...' : item.name}
              </text>
            </g>
          );
        })}
      </svg>

      <HStack mt={2} alignItems="center">
        <Circle size="10px" bg="#999" />
        <Text fontSize="sm" color="gray.600">Price</Text>
      </HStack>
    </Box>
  );
}
