import useContracts from "hooks/useContracts";
import { getToken, getTrdes, getTxs } from "libs/arbTrades";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { ArbTrades, Token } from "libs/arbTrades";


export const useReel = (): ArbTrades[] => {
  const { arbProfitTracker } = useContracts();
  const { data: tokens } = useQuery("tokens", () => getToken(), {refetchOnWindowFocus : false});
  const { data: { txs = [] } = {} } = useQuery("txs", () => getTxs(arbProfitTracker), {
    // Refetch the data every second
    refetchInterval: 30000,
  });

  return useMemo(() => getTrdes(txs, tokens), [txs, tokens]);
};

export default useReel;
