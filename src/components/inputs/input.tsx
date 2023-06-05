import clsx from 'clsx';
import React from 'react';
import { useAccount } from 'wagmi';

import clsxm from '@/lib/clsxm';
import useGetTokenBalances from '@/hooks/useGetTokenBalances';

import { TokenRow } from '@/components/liquidity/AddLiquidity';
import Row from '@/components/rows/Row';

import { Token } from '@/config/tokens';

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & {
    token?: Token;
  }
>(({ token, disabled, value, className, placeholder, ...inputprops }, ref) => {
  return (
    <Row
      isBetween
      className={clsx(
        ' w-full   rounded-2xl px-3 py-3',
        disabled && 'cursor-not-allowed'
      )}
    >
      <div className='w-fit'>
        <input
          ref={ref}
          value={value === 0 ? '' : value}
          disabled={disabled}
          type='number'
          className={clsxm(
            'h-10 w-full rounded-xl border border-none border-white bg-transparent px-2 py-2 text-3xl placeholder:text-white placeholder:text-opacity-10  focus:outline-none focus:ring-0 disabled:cursor-not-allowed',
            className
          )}
          placeholder={placeholder || '0'}
          {...inputprops}
        />
        {token && (
          <p className='ml-2 mt-2 text-sm text-white text-opacity-40'>-</p>
        )}
      </div>
      {token && <TokenDetails token={token} />}
    </Row>
  );
});

export default Input;

const TokenDetails = ({ token }: { token: Token }) => {
  const { address } = useAccount();

  const { data } = useGetTokenBalances({
    address: address,
    decimals: token.decimals,
    tokenContractAddress: token.address,
  });
  return (
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
  );
};
