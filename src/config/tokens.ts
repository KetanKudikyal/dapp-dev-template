import { goerli, polygonMumbai } from 'wagmi/chains';
export type Token = {
  id: string;
  symbol: string;
  name: string;
  address: string;
  image: string;
};

export const tokens: Record<number, Token[]> = {
  [polygonMumbai.id]: [
    {
      id: 'tether',
      symbol: 'USDT',
      name: 'Tether',
      address: '0xafcc98d5107e8b22800c99bBe83e98a58a738Bf7',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    },
    {
      id: 'usd-coin',
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0xA020e38DA71E2B2e60A1389aF435E42570F4EA1F',
      image:
        'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
    },
    {
      id: 'matic-network',
      symbol: 'MATIC',
      name: 'Matic',
      address: '0x29d618e94d296335Ba3902c181dbE59C7010d4A9',
      image:
        'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    },
  ],
  [goerli.id]: [
    {
      id: 'tether',
      symbol: 'USDT',
      name: 'Tether',
      address: '0xC57DF9849Ca6709a421551De4578b928518E3EDc',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    },
    {
      id: 'usd-coin',
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x5E5a4309D4F3f170766Ee4635dAbB743A594D399',
      image:
        'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
    },
    {
      id: 'matic-network',
      symbol: 'MATIC',
      name: 'Matic',
      address: '0x9b33A3E641b66cBb5d9407AD3b332E44Be708512',
      image:
        'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912',
    },
  ],
};
