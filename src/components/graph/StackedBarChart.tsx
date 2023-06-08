// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

const StackedBarChart: React.FC = () => {
  // Sample data for the chart
  const data = [
    {
      name: 'Series 1',
      data: [2, 8, 4],
      borderWidth: 0,
      color: '#FA4D56', // Red
    },
    {
      name: 'Series 2',
      data: [1, 8, 3],
      borderWidth: 0,

      color: '#1B452B', // Green
    },
    {
      name: 'Series 3',
      data: [2, 9, 4],
      borderWidth: 0,

      color: '#02CD58', // Blue
    },
  ];

  // Highcharts configuration options
  const options: Highcharts.Options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column',
      backgroundColor: '#121619',
      marginBottom: 0,
      height: 70,
    },
    title: {
      text: '',
    },

    xAxis: {
      visible: false,
      categories: ['Category 1', 'Category 2', 'Category 3'],
      labels: {
        rotation: -90,
      },
    },
    exporting: {
      enabled: false,
    },
    yAxis: {
      visible: false,

      min: 0,
      title: {
        text: 'Total',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 0,
        stacking: 'normal',
        pointWidth: 70, // Adjust the width of the columns here
      },
    },
    series: data,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StackedBarChart;
