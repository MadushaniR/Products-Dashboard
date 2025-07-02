const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

export default function ProductPieChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;

  // Function to convert percent to SVG Arc coordinates
  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
  };

  return (
    <svg width="300" height="300" viewBox="-1 -1 2 2" style={{ transform: 'rotate(-90deg)' }}>
      {data.map((slice, index) => {
        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
        const slicePercent = slice.value / total;
        cumulativePercent += slicePercent;
        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

        const largeArcFlag = slicePercent > 0.5 ? 1 : 0;

        const pathData = `
          M ${startX} ${startY}
          A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
          L 0 0
        `;

        return (
          <path
            key={index}
            d={pathData}
            fill={COLORS[index % COLORS.length]}
            stroke="#fff"
            strokeWidth="0.01"
          >
            <title>{`${slice.name}: ${slice.value}`}</title>
          </path>
        );
      })}
    </svg>
  );
}
