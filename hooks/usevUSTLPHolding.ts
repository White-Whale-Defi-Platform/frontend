import useContracts from "hooks/useContracts";
import { usePool } from "modules/pool";

export const usevUSTLPHolding = () => {
  const { whalevUSTPair, whalevUSTLpToken } = useContracts();
  const pool = usePool({
    pairContract: whalevUSTPair,
    lpTokenContract: whalevUSTLpToken,
    // stakingContract: whaleUstStaking,
  });
  return pool?.mine?.shareInUst;
};

export default usevUSTLPHolding;
