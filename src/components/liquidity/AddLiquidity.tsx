import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useChainId } from 'wagmi';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Card from '@/components/cards';
import Input from '@/components/inputs/input';
import TokenSelect from '@/components/modals';
import Row from '@/components/rows/Row';

import { Token, tokens } from '@/config/tokens';

type tokenRowProps = {
  imageurl: string;
  tokenName: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
} & React.ComponentPropsWithRef<'div'>;

const AddLiquidity = () => {
  const chainId = useChainId();
  const [swapDetails, setSwapDetails] = useState({
    tokenA: tokens[chainId][0],
    tokenB: tokens[chainId][1],
    minPrice: 0,
    maxPrice: 0,
    amount: 0,
  });

  const setAmount = (amount: number) => {
    setSwapDetails({
      ...swapDetails,
      amount: amount,
    });
  };
  const setMinPrice = (minPrice: number) => {
    setSwapDetails({
      ...swapDetails,
      minPrice: minPrice,
    });
  };
  const setMaxPrice = (maxPrice: number) => {
    setSwapDetails({
      ...swapDetails,
      maxPrice: maxPrice,
    });
  };
  return (
    <Row
      isBetween
      isResponsive
      className='space-y-4 pb-20 md:h-[500px] md:space-y-0 md:pb-0'
    >
      <div className='shadow-bid mx-auto h-full items-stretch  rounded-2xl border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-6 py-6 backdrop-blur-xl md:w-[48%]'>
        <h3 className='w-full text-center'>
          Secure your stables with UniV2 security
        </h3>
      </div>
      <div className='shadow-bid mx-auto h-full  rounded-2xl border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-6 py-6 backdrop-blur-xl md:w-[48%]'>
        <p className='font-normal text-white text-opacity-40'>Select a pair</p>
        <Row isBetween className='mt-2  w-full space-x-2'>
          <TokenRow
            tokenName={swapDetails.tokenA.symbol}
            className='w-[50%] bg-transparent pl-0 shadow-none'
            disabled={true}
            imageurl={swapDetails.tokenA.image}
          />
          <div className=' h-full w-[50%]'>
            <TokenSelect
              selected={swapDetails.tokenB}
              removeToken={swapDetails.tokenA}
              setSelected={(token) => {
                setSwapDetails({
                  ...swapDetails,
                  tokenB: token,
                });
              }}
            />
          </div>
        </Row>
        <Row isBetween isResponsive className='my-4  w-full space-x-2 '>
          <PriceRange
            type='min'
            setPrice={setMinPrice}
            defaultPrice={0}
            token={swapDetails.tokenB}
          />
          <PriceRange
            type='max'
            setPrice={setMaxPrice}
            defaultPrice={0}
            token={swapDetails.tokenB}
          />
        </Row>
        <p className='font-normal text-white text-opacity-40'>Deposit Amount</p>
        <Card>
          <Input
            value={swapDetails.amount}
            token={swapDetails.tokenB}
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
        </Card>

        <Button
          disabled={swapDetails.amount === 0}
          onClick={() => {
            // alert(JSON.stringify(swapDetails));
          }}
          className='mt-6  h-16  w-full rounded-2xl text-center'
        >
          Connect wallet
        </Button>
      </div>
    </Row>
  );
};

export default AddLiquidity;

export const PriceRange = ({
  type,
  defaultPrice,
  setPrice,
  token,
}: {
  type: 'min' | 'max';
  defaultPrice: number;
  token: Token;
  setPrice: (price: number) => void;
}) => {
  const [value, setValue] = useState(defaultPrice);

  useEffect(() => {
    setValue(defaultPrice);
  }, [defaultPrice]);

  useEffect(() => {
    setPrice(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <Card className=' h-24  w-[50%]  overflow-hidden'>
      <Row className='h-full w-full'>
        <Row
          direction='col'
          isBetween
          className='h-full w-[100%] items-start pl-4'
        >
          <p className='mt-1 text-start text-[12px] text-white text-opacity-40'>
            {type === 'max' ? 'Max price' : 'Min Price'}
          </p>
          <input
            value={value === 0 ? '' : value}
            placeholder='10'
            type='number'
            title={'Enter' + type + 'price'}
            className='w-[90%] border-none bg-transparent px-0 text-[18px] placeholder:text-white placeholder:text-opacity-20 focus:outline-none focus:ring-0'
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
          />
          <p className='mb-1 break-keep text-[10px] text-white text-opacity-40'>
            ETH per {token.symbol}
          </p>
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
          [size === 'sm' && 'px-2 py-2 text-lg'],
          [size === 'md' && 'px-3 py-3 text-xl'],
          className
        )}
      >
        <Row>
          <div
            className={clsxm(
              'relative mr-2',
              [size === 'sm' && 'h-6 w-6'],
              [size === 'md' && 'h-8 w-8']
            )}
          >
            <Image src={imageurl} fill alt={tokenName} />
          </div>

          {tokenName.toUpperCase()}
        </Row>
      </Card>
    );
  }
);
