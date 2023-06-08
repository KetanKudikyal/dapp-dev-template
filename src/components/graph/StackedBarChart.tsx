// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

const StackedBarChart = ({
  height,
  showAxis,
  pointWidth,
}: {
  height: number;
  pointWidth: number;
  showAxis: boolean;
}) => {
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
      marginBottom: !showAxis ? 0 : 50,

      height: height,
    },
    title: {
      text: '',
    },

    xAxis: {
      visible: showAxis,
      lineWidth: 0,
      tickColor: '#242A2E',
      tickWidth: 1,
      labels: {
        style: {
          color: '#242A2E',
        },
      },
      title: {
        text: '',
      },
    },
    exporting: {
      enabled: false,
    },
    yAxis: {
      visible: showAxis,
      gridLineColor: '#242A2E',
      tickColor: '#242A2E',
      tickWidth: 1,
      labels: {
        style: {
          color: '#242A2E',
        },
      },
      title: {
        text: '',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: 0,
        stacking: 'normal',
        pointWidth: pointWidth, // Adjust the width of the columns here
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
