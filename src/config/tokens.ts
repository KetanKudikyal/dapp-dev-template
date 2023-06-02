import { Address } from 'viem';
import { goerli, polygonMumbai } from 'wagmi/chains';
export type Token = {
  id: string;
  symbol: string;
  name: string;
  address: Address;
  decimals: number;
  image: string;
};

export const tokens: Record<number, Token[]> = {
  [polygonMumbai.id]: [
    {
      id: 'tether',
      symbol: 'USA',
      name: 'USA Coin',
      decimals: 2,
      address: '0x04517a727E4d503a9aCE8Ec8B17c08990e2561b9',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    },
    {
      id: 'usd-coin',
      symbol: 'USF',
      decimals: 2,
      name: 'USF Coin',
      address: '0x97B83cD86D699A1fC92d5c7edfbdA2f1f9768f1f',
      image:
        'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
    },
  ],
  [goerli.id]: [
    {
      id: 'tether',
      symbol: 'USDT',
      decimals: 2,
      name: 'Tether',
      address: '0xC57DF9849Ca6709a421551De4578b928518E3EDc',
      image:
        'https://assets.coingecko.com/coins/images/325/large/Tether.png?1668148663',
    },
    {
      id: 'usd-coin',
      decimals: 2,
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x5E5a4309D4F3f170766Ee4635dAbB743A594D399',
      image:
        'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042389',
    },
  ],
};
