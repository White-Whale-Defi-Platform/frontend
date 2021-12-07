import { useMemo } from "react";
import { toTerraAmount, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";
import useContracts from "hooks/useContracts";

type Params = {
  amount: string;
};

export const useEstWithdrawFee = ({ amount }: Params) => {
  const { client } = useTerraWebapp();
  const { ustVault } = useContracts();

  const { data } = useQuery(
    ["estWithdrawFee", amount],
    () => {
      return client.wasm.contractQuery<{
        fee: { denom: string; amount: string }[];
      }>(ustVault, {
        estimate_withdraw_fee: {
          amount: toTerraAmount(amount),
        },
      });
    },
    {
      enabled: amount != null,
    }
  );

  return useMemo(() => {
    if (data == null || data.fee.length == 0) {
      return "0";
    }

    return data.fee[0].amount;
  }, [data]);
};
export default useEstWithdrawFee;
