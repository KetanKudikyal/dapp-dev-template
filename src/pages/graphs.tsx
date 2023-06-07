import React from 'react';

import Graph from '@/components/graph';
import BarChart from '@/components/graph/Barchart';
import LineSeriesGraph from '@/components/graph/LineSeries';
import ScatterChart from '@/components/graph/Scatter';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Graphs = () => {
  return (
    <Layout>
      <Seo />
      <div className='mx-auto flex w-full flex-col  items-center justify-between space-x-2 space-y-8'>
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
      </div>
      {/* <Graph
        address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        symbol='USD'
      />
      <LineSeriesGraph /> */}
    </Layout>
  );
};

export default Graphs;
