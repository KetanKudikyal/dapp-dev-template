import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';

import clsxm from '@/lib/clsxm';

import HIGHCHARTS_CONFIG from '@/config/highcharts';

const StackedBarChart = ({
  height,
  showAxis,
  pointWidth,
}: {
  height: number;
  pointWidth: number;
  showAxis: boolean;
}) => {
  // Sample data for the chart
  const [_data, setData] = useState<[[number, number]] | []>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setIsloading(true);
      const req = await fetch(
        `https://api.dune.com/api/v1/query/2464110/results?api_key=axUib0wYIt3S3tvQWzO5MOFUNo1FlOAL`,
        { mode: 'cors' }
      );
      const res = await req.json();
      setData(res.result.rows);
      const combinedElements = new Map();
      res.result.rows.forEach((element) => {
        const propertyValue = element['chain_name'];

        if (combinedElements.has(propertyValue)) {
          combinedElements.get(propertyValue).push(element.transaction_count);
        } else {
          combinedElements.set(propertyValue, [element.transaction_count]);
        }
      });
      setData(
        Array.from(combinedElements).map((i) => {
          return {
            name: i[0],
            data: i[1],
            borderWidth: 0,
          };
        })
      );
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

  // const data = [
  //   {
  //     name: 'Series 1',
  //     data: [2, 8, 4],
  //     borderWidth: 0,
  //     color: '#FA4D56', // Red
  //   },
  //   {
  //     name: 'Series 2',
  //     data: [1, 8, 3],
  //     borderWidth: 0,

  //     color: '#1B452B', // Green
  //   },
  //   {
  //     name: 'Series 3',
  //     data: [2, 9, 4],
  //     borderWidth: 0,

  //     color: '#02CD58', // Blue
  //   },
  // ];

  // Highcharts configuration options
  const options: Highcharts.Options = {
    ...HIGHCHARTS_CONFIG,
    chart: {
      ...HIGHCHARTS_CONFIG.chart,
      type: 'column',
      marginBottom: !showAxis ? 0 : 50,
      height: height,
    },
    xAxis: {
      ...HIGHCHARTS_CONFIG.xAxis,
      visible: showAxis,
    },
    yAxis: {
      ...HIGHCHARTS_CONFIG.yAxis,
      visible: showAxis,
    },
    plotOptions: {
      column: {
        ...HIGHCHARTS_CONFIG.plotOptions?.column,
        stacking: 'normal',
        pointWidth: pointWidth, // Adjust the width of the columns here
      },
    },
    series: _data,
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default StackedBarChart;
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-nocheck
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';
// import { ImSpinner2 } from 'react-icons/im';

// import clsxm from '@/lib/clsxm';

// const StackedBarChart = ({
//   height,
//   showAxis,
//   pointWidth,
// }: {
//   height: number;
//   pointWidth: number;
//   showAxis: boolean;
// }) => {
//   // Sample data for the chart
//   const [_data, setData] = useState<[[number, number]] | []>([]);
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     try {
//       setIsloading(true);
//       const req = await fetch(
//         `https://api.dune.com/api/v1/query/2472670/results?api_key=axUib0wYIt3S3tvQWzO5MOFUNo1FlOAL`,
//         { mode: 'cors' }
//       );
//       const res = await req.json();
//       const combinedElements = new Map();
//       res.result.rows.reverse().forEach((element) => {
//         const propertyValue = element['address'];

//         if (combinedElements.has(propertyValue)) {
//           combinedElements.get(propertyValue).push(element.total);
//         } else {
//           combinedElements.set(propertyValue, [element.total]);
//         }
//       });
//       setData(
//         Array.from(combinedElements).map((i) => {
//           return {
//             name: i[0],
//             data: i[1],
//             borderWidth: 0,
//           };
//         })
//       );
//       setIsloading(false);
//     } catch (error) {
//       setIsloading(false);
//       setError('Cannot get data for ');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (isLoading) {
//     return (
//       <div
//         className={clsxm(
//           'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
//         )}
//       >
//         <ImSpinner2 className='animate-spin' size={20} />
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div
//         className={clsxm(
//           'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
//         )}
//       >
//         Cannot get data for
//       </div>
//     );
//   }

//   const data = [
//     {
//       name: 'Series 1',
//       data: [2, 8, 4],
//       borderWidth: 0,
//       color: '#FA4D56', // Red
//     },
//     {
//       name: 'Series 2',
//       data: [1, 8, 3],
//       borderWidth: 0,

//       color: '#1B452B', // Green
//     },
//     {
//       name: 'Series 3',
//       data: [2, 9, 4],
//       borderWidth: 0,

//       color: '#02CD58', // Blue
//     },
//   ];

//   // Highcharts configuration options
//   const options: Highcharts.Options = {
//     credits: {
//       enabled: false,
//     },
//     chart: {
//       type: 'column',
//       backgroundColor: '#121619',
//       marginBottom: !showAxis ? 0 : 50,
//       height: height,
//     },
//     title: {
//       text: '',
//     },

//     xAxis: {
//       visible: showAxis,
//       lineWidth: 0,
//       tickColor: '#242A2E',
//       tickWidth: 1,
//       labels: {
//         style: {
//           color: '#242A2E',
//         },
//       },
//       title: {
//         text: '',
//       },
//     },
//     exporting: {
//       enabled: false,
//     },
//     yAxis: {
//       visible: showAxis,
//       gridLineColor: '#242A2E',
//       tickColor: '#242A2E',
//       tickWidth: 1,
//       labels: {
//         style: {
//           color: '#242A2E',
//         },
//       },
//       title: {
//         text: '',
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       column: {
//         borderRadius: 0,
//         stacking: 'normal',
//       },
//     },
//     series: _data,
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default StackedBarChart;
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-nocheck
// import Highcharts from 'highcharts';
// import HighchartsReact from 'highcharts-react-official';
// import React, { useEffect, useState } from 'react';
// import { ImSpinner2 } from 'react-icons/im';

// import clsxm from '@/lib/clsxm';

// const StackedBarChart = ({
//   height,
//   showAxis,
//   pointWidth,
// }: {
//   height: number;
//   pointWidth: number;
//   showAxis: boolean;
// }) => {
//   // Sample data for the chart
//   const [_data, setData] = useState<[[number, number]] | []>([]);
//   const [isLoading, setIsloading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchData = async () => {
//     try {
//       setIsloading(true);
//       const req = await fetch(
//         `https://api.dune.com/api/v1/query/2453906/results?api_key=axUib0wYIt3S3tvQWzO5MOFUNo1FlOAL`,
//         { mode: 'cors' }
//       );
//       const res = await req.json();
//       const combinedElements = new Map();
//       res.result.rows.reverse().forEach((element) => {
//         const propertyValue = element['type'];

//         if (combinedElements.has(propertyValue)) {
//           combinedElements.get(propertyValue).push(element.usd_value);
//         } else {
//           combinedElements.set(propertyValue, [element.usd_value]);
//         }
//       });
//       setData(
//         Array.from(combinedElements).map((i) => {
//           return {
//             name: i[0],
//             data: i[1],
//             borderWidth: 0,
//           };
//         })
//       );
//       setIsloading(false);
//     } catch (error) {
//       setIsloading(false);
//       setError('Cannot get data for ');
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   console.log('====================================');
//   console.log(_data);
//   console.log('====================================');
//   if (isLoading) {
//     return (
//       <div
//         className={clsxm(
//           'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
//         )}
//       >
//         <ImSpinner2 className='animate-spin' size={20} />
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <div
//         className={clsxm(
//           'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
//         )}
//       >
//         Cannot get data for
//       </div>
//     );
//   }

//   const data = [
//     {
//       name: 'Series 1',
//       data: [2, 8, 4],
//       borderWidth: 0,
//       color: '#FA4D56', // Red
//     },
//     {
//       name: 'Series 2',
//       data: [1, 8, 3],
//       borderWidth: 0,

//       color: '#1B452B', // Green
//     },
//     {
//       name: 'Series 3',
//       data: [2, 9, 4],
//       borderWidth: 0,

//       color: '#02CD58', // Blue
//     },
//   ];

//   // Highcharts configuration options
//   const options: Highcharts.Options = {
//     credits: {
//       enabled: false,
//     },
//     chart: {
//       type: 'column',
//       backgroundColor: '#121619',
//       marginBottom: !showAxis ? 0 : 50,
//       height: height,
//     },
//     title: {
//       text: '',
//     },

//     xAxis: {
//       visible: showAxis,
//       lineWidth: 0,
//       tickColor: '#242A2E',
//       tickWidth: 1,
//       labels: {
//         style: {
//           color: '#242A2E',
//         },
//       },
//       title: {
//         text: '',
//       },
//     },
//     exporting: {
//       enabled: false,
//     },
//     yAxis: {
//       visible: showAxis,
//       gridLineColor: '#242A2E',
//       tickColor: '#242A2E',
//       tickWidth: 1,
//       labels: {
//         style: {
//           color: '#242A2E',
//         },
//       },
//       title: {
//         text: '',
//       },
//     },
//     legend: {
//       enabled: false,
//     },
//     plotOptions: {
//       column: {
//         borderRadius: 0,
//         stacking: 'normal',
//       },
//     },
//     series: _data,
//   };

//   return (
//     <div>
//       <HighchartsReact highcharts={Highcharts} options={options} />
//     </div>
//   );
// };

// export default StackedBarChart;
