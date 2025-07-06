import { Box, Text, HStack, Circle } from '@chakra-ui/react';
import COLORS from '../constants/chartColors';
import { getStepSize, formatCategory } from '../utils/chartHelpers';

export default function ColumnChart({ data, category, legendColor }) {
  const chartHeight = 300;
  const barWidth = 50;
  const barGap = 50;

  // Determine the maximum value among data points
  const maxValue = Math.max(...data.map(d => d.value), 0);

  // Calculate suitable step size for Y axis labels
  const stepSize = getStepSize(maxValue);

  // Calculate maximum Y axis value with padding
  const maxY = Math.ceil((maxValue * 1.15) / stepSize) * stepSize;

  // Number of horizontal grid lines / steps on Y axis
  const stepsCount = Math.floor(maxY / stepSize);

  // Calculate total chart width based on number of bars and gaps
  const chartWidth = data.length * (barWidth + barGap) + barGap;

  const topMargin = 30;

  return (
    <Box>
      <svg width={chartWidth + 70} height={chartHeight + 40 + topMargin}>
        {/* Y axis label rotated vertically */}
        <text
          x={-(chartHeight / 2)}
          y={15 + topMargin / 2}
          transform="rotate(-90)"
          textAnchor="middle"
          fontSize="14"
          fontWeight="500"
          fill="#333"
        >
          {category ? `${formatCategory(category)} prices in $` : 'Prices in $'}
        </text>

        {/* Draw horizontal grid lines and Y axis labels */}
        {[...Array(stepsCount + 1).keys()].map(i => {
          const yValue = i * stepSize;
          const yPos = topMargin + chartHeight - (yValue / maxY) * chartHeight;

          return (
            <g key={i}>
              <line
                x1={70}
                x2={chartWidth + 70}
                y1={yPos}
                y2={yPos}
                stroke="#e0e0e0"
                strokeWidth={1}
              />
              <text
                x={65}
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

        {/* Draw bars and labels for each data item */}
        {data.map((item, index) => {
          const x = 80 + index * (barWidth + barGap);
          const barHeight = maxY > 0 ? (item.value / maxY) * chartHeight : 0;
          const y = topMargin + chartHeight - barHeight;

          return (
            <g key={item.name}>
              {/* Bar rect with optional custom color */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || COLORS[index % COLORS.length]}
                rx={2}
              />
              {/* Value label above the bar */}
              <text
                x={x + barWidth / 2}
                y={y - 6}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
              >
                {item.value.toFixed(2)} $
              </text>
              {/* Name label below the bar, truncated if too long */}
              <text
                x={x + barWidth / 2}
                y={topMargin + chartHeight + 15}
                textAnchor="middle"
                fontSize="11"
              >
                {item.name.length > 18 ? item.name.slice(0, 16) + '...' : item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}
