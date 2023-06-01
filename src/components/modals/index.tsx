import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

import Card from '@/components/cards';
import { TokenRow } from '@/components/liquidity/AddLiquidity';

const tokens = [
  { name: 'USDC', image: require('../../../public/images/usdc.png') },
  { name: 'USDT', image: require('../../../public/images/usdt.png') },
];

export default function TokenSelect() {
  const [selected, setSelected] = useState(tokens[0]);

  return (
    <div className='h-full w-full'>
      <Listbox value={selected} onChange={setSelected}>
        <div className='relative h-full'>
          <Listbox.Button className='  relative h-full w-full  cursor-default focus:outline-none  sm:text-sm'>
            <TokenRow tokenName={selected.name} imageurl={selected.image} />
            <div className='absolute right-2 right-2 top-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 8.25l-7.5 7.5-7.5-7.5'
                />
              </svg>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto py-1 text-base  focus:outline-none sm:text-sm'>
              <Card>
                {tokens.map((token, tokenIdx) => (
                  <Listbox.Option
                    key={tokenIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none px-4  py-2 ${
                        active ? 'bg-white bg-opacity-10' : 'text-white'
                      }`
                    }
                    value={token}
                  >
                    {() => (
                      <>
                        <div className='flex items-center rounded-2xl text-xl'>
                          <Image
                            src={token.image}
                            className='mr-2 h-6 w-6'
                            alt='ETH'
                          />
                          {token.name}
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Card>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
