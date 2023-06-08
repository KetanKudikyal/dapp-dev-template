import React, { useState } from 'react';

import clsxm from '@/lib/clsxm';

import Graph from '@/components/graph';
import BarChart from '@/components/graph/Barchart';
import ScatterChart from '@/components/graph/Scatter';
import StackedBarChart from '@/components/graph/StackedBarChart';
import Layout from '@/components/layout/Layout';
import Row from '@/components/rows/Row';
import Seo from '@/components/Seo';

const Graphs = () => {
  const [selectedGraph, setSelectedGraph] = useState<{
    title: string;
    enabled: boolean;
    component: JSX.Element | null;
  }>({
    title: '',
    enabled: false,
    component: null,
  });

  return (
    <Layout>
      <Seo />
      {/* <div className='mx-auto flex w-full flex-col  items-center justify-between space-x-2 space-y-8'>
        <div className='w-[100%] '>
          <Graph
            address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
            symbol='USD'
          />
        </div>
        <div className='w-[100%] '>
          <LineSeriesGraph />
        </div>
        <div className='w-[100%] '>
          <BarChart />
        </div>
        <div className='w-[100%] '>
          <ScatterChart />
        </div>
      </div> */}
      <Row
        className={clsxm(
          'relative mx-auto mb-10 h-[610px] w-full max-w-[1000px]',
          selectedGraph.enabled ? 'space-x-0' : 'space-x-2'
        )}
      >
        {selectedGraph.enabled && (
          <div className='absolute left-0 right-0  top-0 z-20 h-full w-full rounded-lg border border-[#2A3136] bg-[#121619] p-4'>
            <Row isBetween>
              <p className='mb-2 text-[20px]  font-bold text-[#c7c7cc]'>
                {selectedGraph.title}
              </p>
              <div
                onClick={() => {
                  setSelectedGraph({
                    title: '',
                    enabled: false,
                    component: null,
                  });
                }}
              >
                X
              </div>
            </Row>

            <div
              className='mt-10 h-[500px]
            '
            >
              {selectedGraph.component}
            </div>
          </div>
        )}

        <div className='flex  h-full w-[70%] grow flex-col space-y-2 '>
          <div
            onClick={() => {
              setSelectedGraph({
                title: 'Floor price',
                enabled: true,
                component: (
                  <Graph
                    address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                    symbol='ETH'
                    showAxis={true}
                  />
                ),
              });
            }}
            className='h-[60%] rounded-xl border border-[#2A3136] bg-[#121619] p-4'
          >
            <p className='mb-2 text-[18px]  font-bold text-[#c7c7cc]'>
              Floor price
            </p>
            <div
              className='h-[300px]
            '
            >
              <Graph
                address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                symbol='ETH'
                showAxis={true}
              />
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedGraph({
                title: 'Sales',
                enabled: true,
                component: <ScatterChart height={500} />,
              });
            }}
            className='relative mt-4 h-[40%] rounded-xl border border-[#2A3136] bg-[#121619] p-4'
          >
            <p className='mb-2 text-[18px] font-bold text-[#c7c7cc]'>Sales</p>
            <div className='h-[100px] '>
              <ScatterChart height={180} />
            </div>
          </div>
        </div>
        <div className=' flex  h-full w-[30%] flex-col space-y-2 '>
          <div className='flex items-center   rounded-lg border border-[#2A3136] bg-[#121619] '>
            <div className='border-r-1 w-fit border border-y-0 border-l-0 border-[#2A3136] px-[18px] py-1.5 text-[14px] font-bold text-white text-opacity-40'>
              12h
            </div>
            <div className='border-r-1 w-fit border border-y-0 border-l-0 border-[#2A3136] px-[18px] py-1.5 text-[14px] font-bold text-white text-opacity-40'>
              24h
            </div>
            <div className='border-r-1 w-fit border border-y-0 border-l-0 border-[#2A3136] px-[18px] py-1.5 text-[14px] font-bold text-white text-opacity-40'>
              3d
            </div>
            <div className='border-r-1 w-fit border border-y-0 border-l-0 border-[#2A3136] px-[18px] py-1.5 text-[14px] font-bold text-white text-opacity-40'>
              7d
            </div>
            <div className='w-fit border border-y-0 border-l-0 border-r-0 border-[#2A3136] px-[18px] py-1.5 text-[14px] font-bold text-white text-opacity-40'>
              30d
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedGraph({
                title: 'Unique owners',
                enabled: true,
                component: (
                  <Graph
                    address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                    symbol='USD'
                    showAxis={true}
                  />
                ),
              });
            }}
            className='h-[25%] w-full rounded-xl border border-[#2A3136] bg-[#121619] p-2'
          >
            <div className='text-[14px] font-normal text-[#c7c7cc]'>
              Unique owners
            </div>
            <div className='text-[12px]'>
              5,637 <span className='text-[#c7c7cc]'>(56.37% unique)</span>
            </div>
            <div className='h-[70px] overflow-hidden'>
              <Graph
                address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                symbol='USD'
              />
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedGraph({
                title: 'Sentiment',
                enabled: true,
                component: (
                  <StackedBarChart
                    height={500}
                    showAxis={true}
                    pointWidth={190}
                  />
                ),
              });
            }}
            className='h-[25%] w-full rounded-xl border border-[#2A3136] bg-[#121619] p-2'
          >
            <p className='text-[14px] font-normal text-[#c7c7cc]'>Sentiment</p>
            <StackedBarChart height={80} pointWidth={70} showAxis={false} />
          </div>
          <div
            onClick={() => {
              setSelectedGraph({
                title: ' Listed tokens',
                enabled: true,
                component: (
                  <Graph
                    address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                    symbol='USD'
                    showAxis={true}
                  />
                ),
              });
            }}
            className='h-[25%] w-full rounded-xl border border-[#2A3136] bg-[#121619] p-2'
          >
            <div className='text-[14px] font-normal text-[#c7c7cc]'>
              Listed tokens
            </div>
            <div className='text-[12px]'>
              338
              <span className='text-[#c7c7cc]'>/10,000 (3.38%)</span>
            </div>
            <div className='h-[70px] overflow-hidden'>
              <Graph
                address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
                symbol='USD'
              />
            </div>
          </div>
          <div
            onClick={() => {
              setSelectedGraph({
                title: 'Listing Depth',
                enabled: true,
                component: <BarChart height={500} showAxis={true} />,
              });
            }}
            className='h-[25%] w-full rounded-xl border border-[#2A3136] bg-[#121619] p-2'
          >
            <p className='mb-2 text-[14px] font-normal text-[#c7c7cc]'>
              Listing Depth
            </p>
            <BarChart height={70} showAxis={false} />
          </div>
        </div>
      </Row>
    </Layout>
  );
};

export default Graphs;
