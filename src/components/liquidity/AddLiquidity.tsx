import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Address, useAccount, useChainId } from 'wagmi';

import clsxm from '@/lib/clsxm';
import useGetTokenBalances from '@/hooks/useGetTokenBalances';
import useTokenContractInstance from '@/hooks/useTokenContractInstance';

import Button from '@/components/buttons/Button';
import Card from '@/components/cards';
import CreatePool from '@/components/CreatePool';
import Input from '@/components/inputs/input';
import Row from '@/components/rows/Row';

import { Token, tokens } from '@/config/tokens';

type tokenRowProps = {
  imageurl: string;
  tokenName: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
} & React.ComponentPropsWithRef<'div'>;

const AddLiquidity = () => {
  const { address } = useAccount();
  const [tokenContractAddress, setTokenContractAddress] = useState<
    Address | string
  >('0x04517a727E4d503a9aCE8Ec8B17c08990e2561b9');
  const chainId = useChainId();
  const [totalsupply, setTotalSupply] = useState('0');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [swapDetails, setSwapDetails] = useState({
    token: tokens[chainId][0],
    amount: 0,
    transfer: {
      address: '',
      value: 0,
    },
    transferFrom: {
      to_address: '',
      from_address: '',
      value: 0,
    },
  });
  const tokenContractInstance = useTokenContractInstance({
    tokenAddress: tokenContractAddress as Address,
  });

  const tokenBalance = useGetTokenBalances({
    tokenContractAddress: tokenContractAddress as Address,
  });

  const getTotalSupply = async () => {
    const supply = await tokenContractInstance?.totalSupply();
    if (!supply) {
      return;
    }
    setTotalSupply(supply.toString());
  };
  const getTokenSymbol = async () => {
    const symbol = await tokenContractInstance?.symbol();
    if (symbol) {
      setTokenSymbol(symbol);
    }
  };
  React.useEffect(() => {
    if (tokenContractAddress) {
      getTotalSupply();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContractAddress, tokenContractInstance]);
  React.useEffect(() => {
    if (tokenContractAddress) {
      getTokenSymbol();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContractAddress, tokenContractInstance]);

  return (
    <Row
      isBetween
      isResponsive
      className='items-start space-y-4 pb-20 md:space-y-0 md:pb-0'
    >
      <div className='shadow-bid mx-auto h-full  rounded-2xl border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-6 py-6 backdrop-blur-xl md:w-[48%]'>
        <CreatePool />
      </div>
      <div className='shadow-bid mx-auto h-full  rounded-2xl border-2 border-white border-opacity-10 bg-white bg-opacity-5 px-6 py-6 backdrop-blur-xl md:w-[48%]'>
        <p className='font-normal text-white text-opacity-40'>Select a token</p>
        <Row isBetween className='mt-2  w-full space-x-2'>
          {/* <TokenRow
            tokenName={swapDetails.tokenA.symbol}
            className='w-[50%] bg-transparent pl-0 shadow-none'
            disabled={true}
            imageurl={swapDetails.tokenA.image}
          /> */}
          <div className=' h-full w-full'>
            <Card className='w-full'>
              <Input
                value={tokenContractAddress}
                type='text'
                placeholder='Enter token address'
                className='w-full'
                onChange={(e) => {
                  setTokenContractAddress(e.target.value);
                }}
              />
            </Card>
          </div>
        </Row>

        <Row className='space-x-3'>
          <div>
            <p className='mt-4 font-normal text-white text-opacity-40'>
              Token Symbol
            </p>
            <Card className='mt-2'>
              <Input
                value={tokenSymbol}
                type='text'
                placeholder='Token symbol'
                disabled={true}
              />
            </Card>
          </div>
          <div>
            <p className='mt-4 font-normal text-white text-opacity-40'>
              Balance
            </p>
            <Card className='mt-2'>
              <Input
                value={tokenBalance.data?.toString()}
                type='text'
                placeholder='Token symbol'
                disabled={true}
              />
            </Card>
          </div>
        </Row>

        <p className='mt-4 font-normal text-white text-opacity-40'>
          Approve amount - approve()
        </p>
        <Card className='mt-2'>
          <Input
            value={swapDetails.amount}
            placeholder='eg: $1000'
            onChange={(e) => {
              setSwapDetails({
                ...swapDetails,
                amount: Number(e.target.value),
              });
            }}
          />
        </Card>

        <Button
          disabled={swapDetails.amount === 0 || tokenContractAddress === ''}
          onClick={async () => {
            await tokenContractInstance?.approve(
              swapDetails.token.address,
              swapDetails.amount
            );
          }}
          className='mt-6  h-16  w-full rounded-2xl text-center'
        >
          Approve
        </Button>

        <p className='mt-4 font-normal text-white text-opacity-40'>
          Transfer amount - transfer()
        </p>
        <Row className='space-x-2'>
          <Card className='mt-2 w-[70%]'>
            <Input
              value={swapDetails.transfer.address}
              placeholder='Enter address...'
              type='text'
              onChange={(e) => {
                setSwapDetails({
                  ...swapDetails,
                  transfer: {
                    ...swapDetails.transfer,
                    address: e.target.value,
                  },
                });
              }}
            />
          </Card>
          <Card className='mt-2 w-[30%]'>
            <Input
              value={swapDetails.transfer.value}
              placeholder='Enter amount'
              onChange={(e) => {
                setSwapDetails({
                  ...swapDetails,
                  transfer: {
                    ...swapDetails.transfer,
                    value: Number(e.target.value),
                  },
                });
              }}
            />
          </Card>
        </Row>

        <Button
          disabled={
            swapDetails.transfer.value === 0 ||
            swapDetails.transfer.address === '' ||
            !address
          }
          onClick={async () => {
            await tokenContractInstance?.transfer(
              swapDetails.transfer.address,
              swapDetails.transfer.value *
                Math.pow(10, swapDetails.token.decimals)
            );
          }}
          className='mt-6  h-16  w-full rounded-2xl text-center'
        >
          Transfer
        </Button>
        <p className='mt-4 font-normal text-white text-opacity-40'>
          Transfer amount - transferFrom()
        </p>
        <Row className='space-x-2'>
          <Card className='mt-2 w-[70%]'>
            <Input
              value={swapDetails.transferFrom.from_address}
              placeholder='Enter from address...'
              type='text'
              onChange={(e) => {
                setSwapDetails({
                  ...swapDetails,
                  transferFrom: {
                    ...swapDetails.transferFrom,
                    from_address: e.target.value,
                  },
                });
              }}
            />
          </Card>
          <Card className='mt-2 w-[30%]'>
            <Input
              value={swapDetails.transferFrom.value}
              placeholder='Amount'
              onChange={(e) => {
                setSwapDetails({
                  ...swapDetails,
                  transferFrom: {
                    ...swapDetails.transferFrom,
                    value: Number(e.target.value),
                  },
                });
              }}
            />
          </Card>
        </Row>
        <Row className='space-x-2'>
          <Card className='mt-2 w-[70%]'>
            <Input
              value={swapDetails.transferFrom.to_address}
              placeholder='Enter to address...'
              type='text'
              onChange={(e) => {
                setSwapDetails({
                  ...swapDetails,
                  transferFrom: {
                    ...swapDetails.transferFrom,
                    to_address: e.target.value,
                  },
                });
              }}
            />
          </Card>
        </Row>

        <Button
          disabled={
            swapDetails.transferFrom.to_address === '' ||
            swapDetails.transferFrom.from_address === '' ||
            swapDetails.transferFrom.value === 0 ||
            !address
          }
          onClick={async () => {
            await tokenContractInstance?.transferFrom(
              swapDetails.transferFrom.from_address,
              swapDetails.transferFrom.to_address,
              swapDetails.transferFrom.value *
                Math.pow(10, swapDetails.token.decimals)
            );
          }}
          className='mt-6  h-16  w-full rounded-2xl text-center'
        >
          Transfer from
        </Button>
        <p className='mt-4 font-normal text-white text-opacity-40'>
          Total supply - totalSupply()
        </p>
        <Card className='mt-2'>
          <Input
            value={totalsupply}
            type='text'
            disabled={true}
            placeholder='eg: $1000'
          />
        </Card>
        <p className='mt-4 font-normal text-white text-opacity-40'>
          Allowance amount - allowance()
        </p>
        <Button
          onClick={async () => {
            await tokenContractInstance?.allowance(
              '0xf2eFb7F23EC666272A194Ac979a06e9075250354',
              swapDetails.token.address
            );
          }}
          className='mt-6  h-16  w-full rounded-2xl text-center'
        >
          Allowance
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
  tokenA,
  tokenB,
}: {
  type: 'min' | 'max';
  defaultPrice: number;
  tokenA: Token;
  tokenB: Token;
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
            placeholder='eg: 10'
            type='number'
            title={'Enter' + type + 'price'}
            className='w-[90%] border-none bg-transparent px-0 text-[18px] placeholder:text-white placeholder:text-opacity-20 focus:outline-none focus:ring-0'
            onChange={(e) => {
              setValue(Number(e.target.value));
            }}
          />
          <p className='mb-1 break-keep text-[10px] text-white text-opacity-40'>
            {tokenA.symbol} per {tokenB.symbol}
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
