import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import DarkUnica from 'highcharts/themes/dark-unica';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

if (typeof Highcharts === 'object') {
  DarkUnica(Highcharts);
  HighchartsExporting(Highcharts);
}

export const ONE_HOUR_SECONDS = 3600;

export const TimeWindow: {
  [key: string]: 'day' | 'week' | 'month';
} = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
};

const LineSeriesGraph = (
  props: {
    address: `0x${string}`;
    symbol: string;
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
        `https://api.coingecko.com/api/v3/coins/polygon-pos/contract/${address}/market_chart/?vs_currency=usd&days=10`,
        { mode: 'cors' }
      );
      const res = await req.json();
      setPricedata(res.prices);
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
      <div className='flex h-[200px] w-full items-center justify-center'>
        <ImSpinner2 className='animate-spin' size={20} />
      </div>
    );
  }
  if (error) {
    return (
      <div className='flex h-[200px] w-full items-center justify-center'>
        Cannot get data for {props.symbol}
      </div>
    );
  }
  const options: Highcharts.Options = {
    credits: {
      enabled: false,
    },
    chart: {
      zooming: {
        type: 'x',
      },
      height: 200,
      backgroundColor: '#122939',
      // backgroundColor: '#072338',
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: `${props.symbol} Price`,
      style: {
        color: '#fff',
        fontSize: '8px',
        opacity: 0.5,
        fontWeight: '400',
        fontFamily: 'Inter',
      },
    },
    xAxis: {
      visible: true,
      title: {
        style: {
          color: '#fff',
          fontSize: '10px',
          opacity: 0.5,
          fontWeight: '500',
          fontFamily: 'Inter',
        },
      },
      lineWidth: 0,
      lineColor: '#345B74',
      minorTickLength: 0,
      tickColor: '#345B74',
      type: 'datetime',
      labels: {
        overflow: 'justify',
        formatter: function (value) {
          return new Date(value.pos as number).toLocaleDateString();
        },
      },
    },
    yAxis: {
      visible: true,
      lineWidth: 0,
      minorTickLength: 0,
      tickColor: '#345B74',

      gridLineColor: '#345B74',
      title: {
        text: '',
        style: {
          color: '#fff',
          fontSize: '10px',
          fontWeight: '500',
          opacity: 0.5,
          fontFamily: 'Inter',
        },
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      style: {
        borderRadius: 30,
        fontSize: '8px',
        fontFamily: 'Inter',
      },
      borderRadius: 15,
      backgroundColor: '#0F1B1F',
      shadow: false,

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
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
          stops: [
            [0, '#0e5eab'],
            [1, 'rgba(0, 51, 153, 0.10)'],
          ],
        },
        marker: {
          enabled: false,
        },
        lineWidth: 1.5,
        states: {
          hover: {
            lineWidth: 1.5,
          },
        },
        threshold: null,
      },
    },
    series: [
      {
        type: 'area',
        color: '#0e5eab',
        name: 'Price',
        data: priceData,
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts.Chart}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  );
};
export default LineSeriesGraph;
