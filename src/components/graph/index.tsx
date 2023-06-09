import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useRef, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

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
    credits: {
      enabled: false,
    },
    chart: {
      zooming: {
        type: 'x',
      },
      backgroundColor: '#121619',
      // backgroundColor: '#072338',
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: ``,
      style: {
        color: '#fff',
        fontSize: '8px',
        opacity: 0.5,
        fontWeight: '400',
        fontFamily: 'Inter',
      },
    },
    xAxis: {
      visible: props.showAxis,
      lineWidth: 0,
      title: {
        text: '',
      },
      // title: {
      //   style: {
      //     color: '#fff',
      //     fontSize: '10px',
      //     opacity: 0.5,
      //     fontWeight: '500',
      //     fontFamily: 'Inter',
      //   },
      // },
      // lineWidth: 0,
      // lineColor: '#345B74',
      // minorTickLength: 0,
      // tickColor: '#345B74',
      // type: 'datetime',
      // labels: {
      //   overflow: 'justify',
      //   formatter: function (value) {
      //     return new Date(value.pos as number).toLocaleDateString();
      //   },
      // },
      tickColor: '#242A2E',

      labels: {
        style: {
          color: '#242A2E',
        },
      },
    },
    yAxis: {
      visible: props.showAxis,
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
    tooltip: {
      style: {
        fontSize: '8px',
        fontFamily: 'Inter',
      },
      borderRadius: 5,
      backgroundColor: '#21252B',
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
      line: {
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
        type: 'line',
        color: '#fff',
        name: 'Price',
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
