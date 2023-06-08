// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';

interface MedalData {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

const ScatterChart = ({ height }: { height: number }) => {
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
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    chart: {
      type: 'scatter',
      backgroundColor: '#121619',
      height: height,
    },
    title: {
      text: '',
    },
    xAxis: {
      visible: true,
      lineWidth: 0,
      tickColor: '#242A2E',
      tickWidth: 1,
      labels: {
        style: {
          color: '#242A2E',
        },
      },
    },
    yAxis: {
      visible: true,
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
    series: [
      {
        name: 'Gold',
        color: '#02CD58',
        data: chartData.map((item) => item.age),
      },
      {
        name: 'Silver',
        color: '#02CD58',

        data: chartData.map((item) => item.age),
      },
      {
        name: 'Bronze',
        color: '#02CD58',

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

export default ScatterChart;
