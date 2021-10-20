import { useMemo } from "react";
import { num, useAddress, useTerraWebapp } from "@arthuryeti/terra";
import { useQuery } from "react-query";

type Params = {
  contract: string;
};

export const useVault = ({ contract }: Params) => {
  const { client } = useTerraWebapp();
  const address = useAddress();

  const { data: vault } = useQuery(
    ["config", contract],
    () => {
      return client.wasm.contractQuery<{ liquidity_token: string }>(contract, {
        config: {},
      });
    },
    {
      enabled: contract != null,
    }
  );

  const { data: pool } = useQuery(
    ["pool", contract],
    () => {
      return client.wasm.contractQuery<{
        total_value_in_ust: string;
        total_share: string;
      }>(contract, {
        pool: {},
      });
    },
    {
      enabled: contract != null,
    }
  );

  const { data: balData } = useQuery(
    ["balance", vault?.liquidity_token, address],
    () => {
      return client.wasm.contractQuery<{ balance: string }>(
        vault?.liquidity_token,
        {
          balance: {
            address,
          },
        }
      );
    },
    {
      enabled: vault != null,
    }
  );

  const balance = useMemo(() => {
    if (
      balData == null ||
      pool == null ||
      num(pool.total_share).eq("0") ||
      num(balData.balance).eq("0")
    ) {
      return "0";
    }

    return num(balData.balance)
      .times(pool.total_value_in_ust)
      .div(pool.total_share)
      .toFixed();
  }, [balData, pool]);

  const totalBalance = useMemo(() => {
    if (pool == null) {
      return "0";
    }

    return pool.total_value_in_ust;
  }, [pool]);

  return {
    vault,
    balance,
    totalBalance,
  };
};

export default useVault;
