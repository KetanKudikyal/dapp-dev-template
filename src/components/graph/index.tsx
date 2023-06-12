import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import HIGHCHARTS_CONFIG from '@/config/highcharts';

export const ONE_HOUR_SECONDS = 3600;

export const TimeWindow: {
  [key: string]: 'day' | 'week' | 'month';
} = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
};

const Graph = (
  props: {
    address: `0x${string}`;
    symbol: string;
    showAxis?: boolean;
  } & HighchartsReact.Props
) => {
  const [priceData, setPricedata] = useState<[[number, number]] | []>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const fetchTokenPrice = async (address: string) => {
    try {
      setIsloading(true);
      const req = await fetch(
        `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${address}/market_chart/?vs_currency=usd&days=24h`,
        { mode: 'cors' }
      );
      const res = await req.json();
      setPricedata(res.prices.slice(0, 20));
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      setError('Cannot get data for ' + props.symbol);
    }
  };

  useEffect(() => {
    if (props.address) {
      fetchTokenPrice(props.address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.address]);

  if (isLoading || !props.address) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <ImSpinner2 className='animate-spin' size={20} />
      </div>
    );
  }
  if (error) {
    return (
      <div className='flex h-[100px] w-full items-center justify-center'>
        Cannot get data for {props.symbol}
      </div>
    );
  }
  const options: Highcharts.Options = {
    ...HIGHCHARTS_CONFIG,
    xAxis: {
      ...HIGHCHARTS_CONFIG.xAxis,
      visible: props.showAxis,
    },
    yAxis: {
      ...HIGHCHARTS_CONFIG.yAxis,
      visible: props.showAxis,
    },
    tooltip: {
      ...HIGHCHARTS_CONFIG.tooltip,
      formatter: function () {
        return (
          this.point.series.name +
          ': <b>' +
          Highcharts.numberFormat(this.point.y || 0, 1, ',', '.') +
          '</b><br/>' +
          'Date: <b>' +
          new Date(this.point.x * 1000).toLocaleDateString() +
          '</b><br/>'
        );
      },
    },
    plotOptions: { line: HIGHCHARTS_CONFIG.plotOptions?.line },
    series: [
      {
        type: 'line',
        color: '#fff',
        name: 'Price',
        animation: false,
        data: priceData,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      containerProps={{ style: { height: '100%', width: '100%' } }}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
export default Graph;
