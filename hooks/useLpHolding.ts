import useContracts from "hooks/useContracts";
import { usePool } from "modules/pool";

export const useLpHolding = () => {
  const { whaleUstPair, whaleUstLpToken, whaleUstStaking } = useContracts();
  const pool = usePool({
    pairContract: whaleUstPair,
    lpTokenContract: whaleUstLpToken,
    stakingContract: whaleUstStaking,
  });

  return pool.myShareInUST;
};

export default useLpHolding;
