import { Box, Text } from "@chakra-ui/react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

export default function ColumnChart({ data }) {
  const max = Math.max(...data.map((d) => d.value), 0);
  const chartHeight = 220;
  const chartPadding = 30;
  const barWidth = 30;
  const gap = 15;
  const totalWidth = data.length * (barWidth + gap) + chartPadding;

  return (
    <Box w="100%" overflowX="auto">
      <svg
        viewBox={`0 0 ${totalWidth} ${chartHeight + 50}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMinYMin meet"
      >
        {/* Chart Title */}
        <text x="10" y="16" fontSize="14" fontWeight="bold" fill="#333">
          Products in selected Category
        </text>

        {/* Y-axis grid lines and labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
          const y = 180 - fraction * 150;
          const label = (fraction * max).toFixed(0);
          return (
            <g key={i}>
              <line x1={25} x2={totalWidth - 10} y1={y} y2={y} stroke="#ccc" />
              <text x="0" y={y + 4} fontSize="8" fill="#555">
                {label}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, index) => {
          const barHeight = (d.value / max) * 150;
          const x = index * (barWidth + gap) + chartPadding;
          const y = 180 - barHeight;

          return (
            <g key={d.name}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={COLORS[index % COLORS.length]}
                opacity={0.7}
              />
              <text
                x={x + barWidth / 2}
                y={y - 4}
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                fill="#000"
              >
                {d.value.toFixed(2)} $
              </text>
              <foreignObject x={x - 10} y={190} width={60} height={30}>
                <Box as="div" fontSize="8px" textAlign="center" color="#333">
                  {d.name.length > 12 ? d.name.slice(0, 10) + '…' : d.name}
                </Box>
              </foreignObject>
            </g>
          );
        })}

        {/* Legend */}
        <circle cx={25} cy={chartHeight + 25} r={4} fill="#888" />
        <text x={35} y={chartHeight + 28} fontSize="10" fill="#333">
          Price
        </text>
      </svg>
    </Box>
  );
}
