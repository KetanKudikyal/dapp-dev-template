import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

const BarChart = () => {
  const options: Highcharts.Options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column', // Set chart type to column for vertical bar chart
      backgroundColor: '#121619',
      marginTop: 0,
      height: 70,
      marginBottom: 0,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: '',
    },
    xAxis: {
      visible: false,
      categories: [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4',
        'Category 5',
      ],
      title: {
        text: 'Categories',
      },
    },
    yAxis: {
      visible: false,
      title: {
        text: 'Value',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        pointPadding: 0.1,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: 'Series 1',
        color: '#02CD58',
        style: {
          borderRadius: 0,
        },
        borderWidth: 0,
        borderRadius: 0,
        data: [
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          10, 15, 7, 12, 9, 10, 15, 7, 12, 9, 10, 15, 7, 12, 9, 10, 15, 7, 12,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          9,
        ],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default BarChart;
