import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

import HIGHCHARTS_CONFIG from '@/config/highcharts';

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
    ...HIGHCHARTS_CONFIG,
    chart: {
      ...HIGHCHARTS_CONFIG.chart,
      type: 'scatter',
      height: height,
    },
    series: [
      {
        type: 'scatter',
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
