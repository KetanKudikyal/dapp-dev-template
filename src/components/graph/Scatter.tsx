// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

interface MedalData {
  name: string;
  gold: number;
  silver: number;
  bronze: number;
}

const ScatterChart = ({ height }: { height: number }) => {
  const [chartData, setChartData] = useState<MedalData[]>([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const response = await fetch(
        'https://api.dune.com/api/v1/query/2506251/results?api_key=axUib0wYIt3S3tvQWzO5MOFUNo1FlOAL'
      );
      const data: MedalData[] = await response.json();
      setChartData(data.result.rows);
      setIsloading(false);
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
        name: '',
        color: '#02CD58',
        data: chartData.map((item) => item.amount),
      },
    ],
  };

  if (isLoading) {
    return (
      <div
        className={clsxm(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        <ImSpinner2 className='animate-spin' size={20} />
      </div>
    );
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ScatterChart;
