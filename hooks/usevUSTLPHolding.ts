import useContracts from "hooks/useContracts";
import { usePool } from "modules/pool";

export const usevUSTLPHolding = () => {
  const { whaleUstPair, whaleUstLpToken } = useContracts();
  const pool = usePool({
    pairContract: whaleUstPair,
    lpTokenContract: whaleUstLpToken,
    // stakingContract: whaleUstStaking,
  });

  return pool?.mine?.shareInUst;
};

export default usevUSTLPHolding;
