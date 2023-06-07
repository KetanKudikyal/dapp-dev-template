import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';

interface MedalData {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

const BarChart: React.FC = () => {
  const [chartData, setChartData] = useState<MedalData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@24912efc85/samples/data/olympic2012.json'
      );
      const data: MedalData[] = await response.json();
      setChartData(data.slice(0, 200));
    };

    fetchData();
  }, []);

  const options: Options = {
    chart: {
      type: 'scatter',
    },
    title: {
      text: 'Olympic Medals - 2012',
    },
    xAxis: {
      categories: chartData.map((item) => item.name),
    },
    yAxis: {
      title: {
        text: 'Number of Medals',
      },
    },
    series: [
      {
        name: 'Gold',
        data: chartData.map((item) => item.age),
      },
      {
        name: 'Silver',
        data: chartData.map((item) => item.age),
      },
      {
        name: 'Bronze',
        data: chartData.map((item) => item.age),
      },
    ],
  };

  return (
    <div>
      {chartData.length > 0 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BarChart;
