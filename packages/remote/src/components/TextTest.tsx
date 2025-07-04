import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TextTest: React.FC = () => {
  const chartOptions: Options = {
    chart: { type: "column" },
    title: { text: "Highcharts/React/Typescript" },
    series: [{ type: "column", data: [1, 2, 3] }],
    xAxis: {
      categories: ["Foo", "Bar", "Baz"],
      labels: {
        useHTML: true,
        formatter: function () {
          // `this.value` holds the category label
          return `<span style="color: teal; font-weight: bold;">${this.value}</span>`;
        }
      }
    }
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default TextTest;
