import React from 'react';

import GraphMoodBoard from '@/components/GraphMoodBoard';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

const Home = () => {
  return (
    <Layout>
      <Seo />
      <GraphMoodBoard />
    </Layout>
  );
};

export default Home;
