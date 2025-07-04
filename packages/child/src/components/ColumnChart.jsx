const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

export default function ColumnChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 0);

  return (
    <svg width="100%" height="300">
      {data.map((d, index) => {
        const barHeight = (d.value / max) * 250;
        const barWidth = 40;
        const gap = 20;
        const x = index * (barWidth + gap) + 30;
        const y = 300 - barHeight;

        return (
          <g key={d.name}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={COLORS[index % COLORS.length]}
            />
            <text
              x={x + barWidth / 2}
              y={y - 5}
              fontSize="10"
              textAnchor="middle"
              fill="#333"
            >
              {d.value}
            </text>
            <text
              x={x + barWidth / 2}
              y={310}
              fontSize="10"
              textAnchor="middle"
              fill="#333"
            >
              {d.name.length > 6 ? d.name.slice(0, 6) + '…' : d.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
