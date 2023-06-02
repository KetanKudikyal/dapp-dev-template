import { Alchemy, Network } from 'alchemy-sdk';
import { useQuery } from 'react-query';
import { Address } from 'viem';

const useGetTokenBalances = ({
  address,
  decimals,
  tokenContractAddress,
  network = Network.ETH_MAINNET,
}: {
  address: Address | undefined;
  tokenContractAddress: Address;
  decimals: number;
  network: Network;
}) => {
  if (!process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
    throw new Error('NEXT_ALCHEMY_API_KEY is missing');
  }
  const settings = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    network: network,
  };

  const alchemy = new Alchemy(settings);
  return useQuery(['useGetTokenBalances'], async () => {
    if (!address) {
      return 0;
    }
    const tokenBalanceData = await alchemy.core.getTokenBalances(address, [
      tokenContractAddress,
    ]);
    const hexValue = tokenBalanceData.tokenBalances[0].tokenBalance;
    const decimalValue = BigInt(hexValue as string);
    const ethValue = decimalValue / BigInt(10 ** decimals);
    return ethValue;
  });
};

export default useGetTokenBalances;
