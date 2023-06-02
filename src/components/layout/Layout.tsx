import * as React from 'react';

import Header from '@/components/layout/Header';
import Row from '@/components/rows/Row';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='h-full w-full bg-[#060606] text-white  md:h-[100vh]  md:min-h-screen'>
      <div className='layout'>
        <Header />
        <Row className=' md:h-[85vh]'>{children}</Row>
      </div>
    </div>
  );
}
