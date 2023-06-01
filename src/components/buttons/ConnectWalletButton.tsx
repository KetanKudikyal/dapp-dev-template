import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';

import Button from './Button';

const ConnectWalletBtn = () => {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;
  }, [address]);

  const [formattedData, setFormattedData] = useState('0.000');

  const { data } = useBalance({
    address: address,
    chainId: 11155111,
  });

  const dataChunks = data?.formatted.split('.');

  useEffect(() => {
    if (dataChunks) {
      setFormattedData(`${dataChunks[0]}.${dataChunks[1]?.substring(0, 5)}`);
    }
  }, [dataChunks]);

  return (
    <>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} className='py-3'>
                      Connect wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <div
                      className='flex cursor-pointer items-center justify-between'
                      onClick={openChainModal}
                    >
                      <div className='flex w-full items-center justify-between rounded-[10px] border border-white border-opacity-5 bg-[#EF4444] p-2'>
                        <p className='font-primary mr-2 text-[15px] font-bold text-white'>
                          Wrong network
                        </p>
                      </div>
                    </div>
                  );
                }

                return (
                  <div className='flex w-full items-center justify-center space-x-4'>
                    <motion.div
                      // whileHover={{
                      //   y: -3,
                      // }}
                      whileTap={{ y: 0 }}
                      onClick={() => openAccountModal()}
                      className=' hidden cursor-pointer items-center rounded-[7px] bg-white bg-opacity-[0.05] px-4 py-2 lg:flex'
                    >
                      <div className='w-full'>{account.displayName}</div>
                      <div>
                        <svg
                          width='24'
                          height='25'
                          viewBox='0 0 24 25'
                          fill='none'
                          className='ml-8 hidden md:block'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M6.39282 9.57141L12.25 15.4286L18.1071 9.57141'
                            stroke='white'
                            strokeWidth='2.19643'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </div>
                    </motion.div>

                    <motion.div
                      // whileHover={{
                      //   y: -3,
                      // }}
                      whileTap={{ y: 0 }}
                      className='hidden cursor-pointer items-center rounded-[7px] py-2 opacity-70 lg:flex'
                    >
                      <div>
                        <svg
                          width='24px'
                          height='24px'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                          color='#fff'
                          className='mr-2'
                        >
                          <path
                            d='M7 12l5 7 5-7M7 12l5-7m-5 7l5 1m0-8l5 7m-5-7v8m5-1l-5 1'
                            stroke='#fff'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          ></path>
                          <path
                            d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z'
                            stroke='#fff'
                            stroke-width='1.5'
                            stroke-linecap='round'
                            stroke-linejoin='round'
                          ></path>
                        </svg>
                      </div>
                      <div className='w-full'>{formattedData}</div>
                    </motion.div>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
};

export default ConnectWalletBtn;
