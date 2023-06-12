import React, { ComponentPropsWithRef, useState } from 'react';

import clsxm from '@/lib/clsxm';

import Graph from '@/components/graph';
import BarChart from '@/components/graph/Barchart';
import ScatterChart from '@/components/graph/Scatter';
import StackedBarChart from '@/components/graph/StackedBarChart';
import Row from '@/components/rows/Row';

const GraphMoodBoard = () => {
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
    <Row
      className={clsxm(
        'relative mx-auto mb-10 h-[610px] w-full max-w-[1000px]',
        selectedGraph.enabled ? 'space-x-0' : 'space-x-2'
      )}
    >
      {selectedGraph.enabled && (
        <Card
          title={selectedGraph.title}
          className='absolute left-0 right-0  top-0 z-20 h-full w-full '
          rightIcon={() => (
            <div
              className='absolute right-6 top-6 cursor-pointer'
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
          )}
        >
          <div className='mt-10 h-[500px]'>{selectedGraph.component}</div>
        </Card>
      )}

      <Row direction='col' className='h-full w-[70%] grow space-y-2 '>
        <Card
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
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          title='Floor price'
          className='h-[60%] '
        >
          <div className='h-[300px]'>
            <Graph
              address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
              symbol='ETH'
              showAxis={true}
            />
          </div>
        </Card>
        <Card
          onClick={() => {
            setSelectedGraph({
              title: 'Sales',
              enabled: true,
              component: <ScatterChart height={500} />,
            });
          }}
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          title='Sales'
          className='relative mt-4 h-[40%]'
        >
          <div className='h-[100px] '>
            <ScatterChart height={180} />
          </div>
        </Card>
      </Row>
      <Row direction='col' className='   h-full w-[30%] space-y-2 '>
        <Card
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
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          title='Unique owners'
          size='sm'
          className='h-[25%] w-full '
        >
          <div className='h-[90px] w-full overflow-hidden'>
            <Graph
              address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
              symbol='USD'
            />
          </div>
        </Card>
        <Card
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
          title='Sentiment'
          size='sm'
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          className='relative h-[25%] w-full'
        >
          <div className='h-[90px] w-full overflow-hidden'>
            <StackedBarChart height={80} pointWidth={70} showAxis={false} />
          </div>
        </Card>
        <Card
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
          title='Listed tokens'
          size='sm'
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          className='relative h-[25%] w-full'
        >
          <div className='h-[90px] overflow-hidden'>
            <Graph
              address='0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
              symbol='USD'
            />
          </div>
        </Card>
        <Card
          onClick={() => {
            setSelectedGraph({
              title: 'Listing Depth',
              enabled: true,
              component: <BarChart height={500} showAxis={true} />,
            });
          }}
          title='Listing Depth'
          size='sm'
          rightIcon={() => <ExpandIcon className='absolute right-4 top-4 ' />}
          className='relative h-[25%] w-full'
        >
          <div className=' overflow-hidden'>
            <BarChart height={90} showAxis={false} />
          </div>
        </Card>
      </Row>
    </Row>
  );
};

export default GraphMoodBoard;

const Card: React.FC<
  ComponentPropsWithRef<'div'> & {
    size?: 'sm' | 'md';
    title?: string | JSX.Element;
    rightIcon?: () => React.JSX.Element;
  }
> = ({ className, rightIcon, size = 'md', title, children, ...rest }) => {
  return (
    <div
      className={clsxm(
        'relative rounded-xl border border-[#2A3136] bg-[#121619]',
        [size === 'sm' && 'p-2'],
        [size === 'md' && 'p-4'],
        className
      )}
      {...rest}
    >
      {title && (
        <p
          className={clsxm('mb-2    text-[#c7c7cc]', [
            size === 'md' && 'text-[18px] font-bold',
            size === 'sm' && 'text-[14px] font-normal',
          ])}
        >
          {title}
        </p>
      )}

      {children}
      {rightIcon && rightIcon()}
    </div>
  );
};

const ExpandIcon: React.FC<ComponentPropsWithRef<'svg'>> = ({
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      role='button'
      strokeWidth={1.5}
      stroke='currentColor'
      className={clsxm('h-5  w-5', className)}
      {...rest}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
      />
    </svg>
  );
};
