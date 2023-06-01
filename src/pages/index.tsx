import React from 'react';

import Layout from '@/components/layout/Layout';
import AddLiquidity from '@/components/liquidity/AddLiquidity';
import Seo from '@/components/Seo';

const Home = () => {
  return (
    <Layout>
      <Seo />
      <AddLiquidity />
    </Layout>
  );
};

export default Home;
