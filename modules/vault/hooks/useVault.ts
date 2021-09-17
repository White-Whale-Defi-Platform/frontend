import { useMemo, useState, useEffect } from "react";
import numeral from "numeral";

import { useAddress, useTerra } from "@arthuryeti/terra";
import { useQuery } from "react-query";

type Params = {
  contract: string;
};

export const useVault = ({ contract }: Params) => {
  const { client } = useTerra();
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
        total_deposits_in_ust: string;
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
    ["balance", vault?.liquidity_token],
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
      enabled: vault != null && contract != null,
    }
  );

  const balance = useMemo(() => {
    if (balData == null || pool == null) {
      return "0";
    }

    return numeral(balData.balance)
      .multiply(pool.total_deposits_in_ust)
      .divide(pool.total_share)
      .value()
      .toString();
  }, [balData, pool]);

  const totalBalance = useMemo(() => {
    if (pool == null) {
      return "0";
    }

    return pool.total_deposits_in_ust;
  }, [pool]);

  return {
    vault,
    balance,
    totalBalance,
  };
};

export default useVault;
