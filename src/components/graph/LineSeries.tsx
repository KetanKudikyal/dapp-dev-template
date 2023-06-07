// import { GetServerSideProps } from "next";
// import React, { useEffect, useState, useRef } from "react";

// import Highcharts from "highcharts";
// import HighchartsExporting from "highcharts/modules/exporting";
// import HighchartsReact from "highcharts-react-official";
// import dayjs from "dayjs";
// import { useRouter } from "next/router";
// import DarkUnica from "highcharts/themes/dark-unica";

// if (typeof Highcharts === "object") {
//   DarkUnica(Highcharts);
//   HighchartsExporting(Highcharts);
// }
// export interface ChartDataBins {
//   bins: {
//     [bin: number]: { native: number; usd: number };
//   };
//   binSize: number;
//   price: number;
// }
// type Address = string;
// type PrefixAddress = string;
// type Chain = string;
// type Protocol = string;
// type Symbol = string;

// export interface Position {
//   owner: Address;
//   liqPrice: number;
//   collateralValue: number;
//   collateralAmount: number;
//   chain: Chain;
//   protocol: Protocol; // protocol adapter id, like "aave-v2", "liquity"...
//   collateral: PrefixAddress; // token address formatted as "ethereum:0x1234..."
//   displayName?: string;
//   url: string;
// }

// export type PositionSmol = Omit<Position, "collateral" | "owner">;
// export type ChartData = {
//   name: string;
//   symbol: string; // could change to coingeckoId in the future
//   currentPrice: number;
//   totalLiquidable: number; // excluding bad debts
//   totalLiquidables: {
//     protocols: { [protocol: string]: number };
//     chains: { [chain: string]: number };
//   };
//   badDebts: number;
//   dangerousPositionsAmount: number; // amount of -20% current price
//   dangerousPositionsAmounts: {
//     protocols: { [protocol: string]: number };
//     chains: { [chain: string]: number };
//   };
//   chartDataBins: {
//     // aggregated by either protocol or chain
//     protocols: { [protocol: string]: ChartDataBins };
//     chains: { [chain: string]: ChartDataBins };
//   };
//   totalBins: number;
//   binSize: number;
//   availability: {
//     protocols: string[];
//     chains: string[];
//   };
//   time: number;
//   topPositions: PositionSmol[];
//   totalPositions: number;
// };
// const Liquidation = ({ token }: { token: string }) => {
//   const [data, setData] = useState<ChartData | []>([]);
//   const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
//   const disabledProtocols: string | any[] = [];

//   const fetchData = async () => {
//     try {
//       const request = await fetch(`/api/liquidations?token=${token}`, {
//         method: "GET",
//       });
//       const response = await request.json();
//       const data = response.data;
//       const currentPrice = data.currentPrice;
//       const positions = data.positions.filter(
//         (p: { protocol: any }) => !disabledProtocols.includes(p.protocol)
//       );
//       const validPositions = positions.filter(
//         (p: { liqPrice: number }) =>
//           p.liqPrice <= currentPrice && p.liqPrice > currentPrice / 1000000
//       );
//       console.log(validPositions);

//       setData(response.data);
//     } catch (e) {
//       setData([]);
//     }
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       console.log("This will be called every 60 seconds");
//     }, 60000);
//     return () => clearInterval(interval);
//   }, []);
//   const options = {
//     title: {
//       text: "My stock chart",
//     },
//     series: [
//       {
//         data: [1, 2, 3],
//       },
//     ],
//   };
//   return (
//     <HighchartsReact
//       highcharts={Highcharts}
//       contructorType="stockChart"
//       options={options}
//       ref={chartComponentRef}
//     />
//   );
// };

// export const getServerSideProps: GetServerSideProps<{
//   token?: string;
// }> = async ({ params }) => {
//   return {
//     props: { token: params?.token as string },
//   };
// };
// export default Liquidation;

import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';

// Initialize Highcharts modules

if (typeof Highcharts === 'object') {
  HighchartsStock(Highcharts);
}
const LineSeriesGraph = () => {
  const options = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: 'Stock Prices',
    },
    series: [
      {
        name: 'Stock Price',
        data: [
          // Replace with your own data
          [1552483200000, 10],
          [1552569600000, 20],
          [1552656000000, 30],
          [1552742400000, 40],
          [1552828800000, 50],
        ],
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType='stockChart'
        options={options}
      />
    </div>
  );
};

export default LineSeriesGraph;
