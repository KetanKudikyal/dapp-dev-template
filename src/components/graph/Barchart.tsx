// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

const BarChart = ({
  height,
  showAxis,
}: {
  height: number;
  showAxis: boolean;
}) => {
  const [_data, setData] = useState<[[number, number]] | []>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsloading(true);
      const req = await fetch(
        `https://api.dune.com/api/v1/query/1881647/results?api_key=axUib0wYIt3S3tvQWzO5MOFUNo1FlOAL`,
        { mode: 'cors' }
      );
      const res = await req.json();
      setData(res.result.rows.map((i) => i.fees));
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError('Cannot get data for ');
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  if (error) {
    return (
      <div
        className={clsxm(
          'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
        )}
      >
        Cannot get data for
      </div>
    );
  }

  const options: Highcharts.Options = {
    credits: {
      enabled: false,
    },
    chart: {
      type: 'column', // Set chart type to column for vertical bar chart
      backgroundColor: '#121619',
      marginTop: 0,
      height: height,
      marginBottom: !showAxis ? 0 : 50,
    },
    exporting: {
      enabled: false,
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
        // data: [
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   10, 15, 7, 12, 9, 10, 15, 7, 12, 9, 10, 15, 7, 12, 9, 10, 15, 7, 12,
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   9,
        // ],
        data: _data,
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
