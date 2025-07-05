import { Box } from '@chakra-ui/react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function ColumnChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 0);

  return (
    <svg width="100%" height="300">
      {data.map((item, index) => {
        const barHeight = (item.value / max) * 250;
        return (
          <g key={item.name} transform={`translate(${index * 60}, 0)`}>
            <rect
              x={10}
              y={300 - barHeight}
              width={40}
              height={barHeight}
              fill={COLORS[index % COLORS.length]}
              rx={4}
            />
            <text x={30} y={295} fontSize="12" textAnchor="middle">
              {item.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
