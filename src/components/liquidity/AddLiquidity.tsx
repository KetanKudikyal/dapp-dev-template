import Image from 'next/image';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Card from '@/components/cards';
import TokenSelect from '@/components/modals';
import Row from '@/components/rows/Row';

type tokenRowProps = {
  imageurl: string;
  tokenName: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
} & React.ComponentPropsWithRef<'div'>;

const AddLiquidity = () => {
  return (
    <Row isCentered>
      <div className='shadow-bid mx-auto  rounded-2xl border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-6 py-6 backdrop-blur-xl md:w-[48%]'>
        <h3 className='w-full text-center'>
          Secure your stables with UniV2 stability
        </h3>
        <p className='mt-6 font-normal text-white text-opacity-40'>
          Select a pair
        </p>
        <Row isBetween className='mt-2  w-full space-x-2'>
          <TokenRow
            tokenName='ETH'
            className='w-[50%]'
            disabled={true}
            imageurl={require('../../../public/images/eth.png')}
          />
          <div className=' h-full w-[50%]'>
            <TokenSelect />
          </div>
        </Row>
        <Row isBetween className='my-4  w-full space-x-2 '>
          <PriceRange />
          <PriceRange />
        </Row>
        <p className='font-normal text-white text-opacity-40'>Deposit Amount</p>
        <Card>
          <Row isBetween className=' mb-4 mt-2  w-full rounded-2xl  px-3 py-3'>
            <div className='w-fit'>
              <input
                placeholder='0'
                className=' h-10 w-full rounded-xl border border-none border-white bg-transparent px-2 py-2 text-3xl  placeholder:text-white placeholder:text-opacity-10 focus:outline-none'
              />
              <p className='ml-2 mt-2 text-sm text-white text-opacity-40'>
                $41,004.60
              </p>
            </div>
            <div className='w-fit'>
              <TokenRow
                size='sm'
                tokenName='USDC'
                className='border border-white border-opacity-10 bg-white bg-opacity-5  '
                imageurl={require('../../../public/images/usdc.png')}
              />
              <p className='mt-2 text-sm text-white text-opacity-40'>
                Balance - 0
              </p>
            </div>
          </Row>
        </Card>

        <Button disabled className='mt-6  h-16  w-full rounded-2xl text-center'>
          Connect wallet
        </Button>
      </div>
    </Row>
  );
};

export default AddLiquidity;

export const PriceRange = () => {
  return (
    <Card className=' h-24  w-[50%]  overflow-hidden'>
      <Row isBetween>
        <Row isCentered className=' h-full w-[30%] '>
          <Row
            isCentered
            className=' h-[35px] w-[35px] cursor-pointer rounded-lg border-2 border-white border-opacity-10 bg-white  bg-opacity-5 text-2xl font-normal'
          >
            -
          </Row>
        </Row>
        <Row direction='col' isBetween className=' h-full w-[40%]'>
          <p className='mt-1 text-[12px] text-white text-opacity-40'>
            Min price
          </p>
          <p className='text-[18px]'>0.00053</p>
          <p className='mb-1 break-keep text-[10px] text-white text-opacity-40'>
            WETH per USDC
          </p>
        </Row>
        <Row isCentered className=' h-full w-[30%] '>
          <Row
            isCentered
            className=' h-[35px] w-[35px] cursor-pointer rounded-lg border-2 border-white border-opacity-10 bg-white  bg-opacity-5 text-2xl font-normal'
          >
            +
          </Row>
        </Row>
      </Row>
    </Card>
  );
};

export const TokenRow = React.forwardRef<HTMLDivElement, tokenRowProps>(
  ({ imageurl, tokenName, size = 'md', disabled, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={clsxm(
          [disabled && 'cursor-not-allowed'],
          [size === 'sm' && 'px-2 py-2 text-xl'],
          [size === 'md' && 'px-3 py-3 text-2xl'],
          className
        )}
      >
        <Row>
          <Image
            src={imageurl}
            className={clsxm(
              'mr-2',
              [size === 'sm' && 'h-6 w-6'],
              [size === 'md' && 'h-8 w-8']
            )}
            alt='ETH'
          />
          {tokenName.toUpperCase()}
        </Row>
      </Card>
    );
  }
);
