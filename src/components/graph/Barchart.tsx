import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

const BarChart = () => {
  const options = {
    chart: {
      type: 'column', // Set chart type to column for vertical bar chart
    },
    title: {
      text: 'Bar Chart Example',
    },
    xAxis: {
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
      title: {
        text: 'Value',
      },
    },
    series: [
      {
        name: 'Series 1',
        data: [10, 15, 7, 12, 9],
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
