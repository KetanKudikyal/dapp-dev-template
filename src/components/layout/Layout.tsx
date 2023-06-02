import * as React from 'react';

import Header from '@/components/layout/Header';
import Row from '@/components/rows/Row';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='h-[100vh] min-h-screen w-full  bg-[#060606]  text-white'>
      <div className='layout'>
        <Header />
        <Row className=' h-[85vh]'>{children}</Row>
      </div>
    </div>
  );
}
