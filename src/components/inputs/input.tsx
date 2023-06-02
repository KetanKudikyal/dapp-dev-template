import { Network } from 'alchemy-sdk';
import React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import clsxm from '@/lib/clsxm';
import useGetTokenBalances from '@/hooks/useGetTokenBalances';

import { TokenRow } from '@/components/liquidity/AddLiquidity';
import Row from '@/components/rows/Row';

import { Token } from '@/config/tokens';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    token: Token;
  }
>(({ token, value, className, placeholder, ...inputprops }, ref) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data } = useGetTokenBalances({
    address: address,
    network:
      chain?.id === polygonMumbai.id
        ? Network.MATIC_MUMBAI
        : Network.ETH_GOERLI,
    decimals: token.decimals,
    tokenContractAddress: token.address,
  });
  return (
    <Row isBetween className=' mb-4 mt-2  w-full rounded-2xl  px-3 py-3'>
      <div className='w-fit'>
        <input
          ref={ref}
          value={value === 0 ? '' : value}
          type='number'
          className={clsxm(
            'h-10 w-full rounded-xl border border-none border-white bg-transparent px-2 py-2 text-3xl placeholder:text-white  placeholder:text-opacity-10 focus:outline-none focus:ring-0',
            className
          )}
          placeholder={placeholder || '0'}
          {...inputprops}
        />
        <p className='ml-2 mt-2 text-sm text-white text-opacity-40'>-</p>
      </div>
      <div className='w-fit'>
        <TokenRow
          size='sm'
          tokenName={token.symbol}
          className='border border-white border-opacity-10 bg-white bg-opacity-5  '
          imageurl={token.image}
        />
        <p className='mt-2 text-sm text-white text-opacity-40'>
          Balance - {data?.toString()}
        </p>
      </div>
    </Row>
  );
});

export default Input;
