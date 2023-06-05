import { useQuery } from 'react-query';
import useGlobalStore from 'store';
import { ERC20__factory } from 'types/ethers-contracts';
import { Address } from 'viem';

const useGetTokenBalances = ({
  address,
  decimals,
  tokenContractAddress,
}: {
  address: Address | undefined;
  tokenContractAddress: Address;
  decimals: number;
}) => {
  const { signer } = useGlobalStore();
  return useQuery([tokenContractAddress + '-user-balance'], async () => {
    if (!address || !signer) {
      return 0;
    }
    const token = ERC20__factory.connect(tokenContractAddress, signer);
    const balanceof = await token.balanceOf(address);
    const hexValue = balanceof._hex;
    const decimalValue = BigInt(hexValue as string);
    const ethValue = decimalValue / BigInt(10 ** decimals);
    return ethValue;
  });
};

export default useGetTokenBalances;
