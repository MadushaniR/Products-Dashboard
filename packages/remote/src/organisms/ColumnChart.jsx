import { Box, Text, HStack, Circle } from '@chakra-ui/react';

const COLORS = [
  '#22543D',
  '#276749',
  '#2C7A7B',
  '#319795',
  '#38B2AC',
  '#4FD1C5',
  '#63E6BE',
  '#81E6D9',
  '#B2F5EA',
  '#C6F6D5',
  '#D6FCE9',
  '#E6FFFA',
  '#F0FFF4',
  '#EDFDFD',
  '#E6FFFA'
];



// Helper to get "nice" step size for Y axis
function getStepSize(maxValue, numSteps = 5) {
  const roughStep = maxValue / numSteps;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;

  if (residual >= 5) return 5 * magnitude;
  if (residual >= 2) return 2 * magnitude;
  return magnitude;
}

export default function ColumnChart({ data, category }) {
  const chartHeight = 300;
  const barWidth = 50;
  const barGap = 30;

  const maxValue = Math.max(...data.map(d => d.value), 0);

  // Calculate step size & max for Y-axis scale
  const stepSize = getStepSize(maxValue);
  // Round maxY up to nearest multiple of stepSize
  const maxY = Math.ceil(maxValue / stepSize) * stepSize;
  // Number of steps
  const stepsCount = Math.floor(maxY / stepSize);

  const chartWidth = data.length * (barWidth + barGap) + barGap;

  const formatCategory = (str) =>
    str?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Box>
      <Text fontWeight="bold" fontSize="md" mb={2}>
        Products in selected Category
      </Text>

      <svg width={chartWidth + 70} height={chartHeight + 40}>
        {/* Y-axis Label (Vertical) */}
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

        {/* Grid Lines & Y-axis labels */}
        {[...Array(stepsCount + 1).keys()].map(i => {
          const yValue = i * stepSize;
          const yPos = chartHeight - (yValue / maxY) * chartHeight;

          return (
            <g key={i}>
              {/* Grid line */}
              <line
                x1={40}
                x2={chartWidth + 40}
                y1={yPos}
                y2={yPos}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              {/* Y-axis label */}
              <text
                x={35}
                y={yPos + 5}
                fontSize="12"
                fill="#666"
                textAnchor="end"
              >
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
              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                {item.value.toFixed(2)} $
              </text>
              <text
                x={x + barWidth / 2}
                y={chartHeight + 15}
                textAnchor="middle"
                fontSize="11"
              >
                {item.name.length > 18
                  ? item.name.slice(0, 16) + '...'
                  : item.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <HStack mt={2} alignItems="center">
        <Circle size="10px" bg="#999" />
        <Text fontSize="sm" color="gray.600">
          Price
        </Text>
      </HStack>
    </Box>
  );
}
