import React from 'react';

import Graph from '@/components/graph';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Graphs = () => {
  return (
    <Layout>
      <Seo />
      <Graph
        address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
        symbol='USD'
      />
    </Layout>
  );
};

export default Graphs;
