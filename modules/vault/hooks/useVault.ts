import { useCallback, useState, useEffect } from "react";

import { useAddress, useTerra } from "@arthuryeti/terra";

type Params = {
  contract: string;
};

export const useVault = ({ contract }: Params) => {
  const { client } = useTerra();
  const address = useAddress();

  const [vault, setVault] = useState(null);
  const [balance, setBalance] = useState("0");
  const [totalBalance, setTotalBalance] = useState("0");

  const getVault = useCallback(async () => {
    try {
      const res: any = await client.wasm.contractQuery(contract, {
        config: {},
      });

      setVault(res);
    } catch (e) {
      console.log(e);
    }
  }, [client, contract]);

  const getTotalBalance = useCallback(async () => {
    if (vault == null || address == null) {
      return;
    }

    try {
      const res: any = await client.wasm.contractQuery(contract, {
        pool: {},
      });

      setTotalBalance(res.total_share);
    } catch (e) {
      console.log(e);
    }
  }, [client, contract, vault, address]);

  const getMyBalance = useCallback(async () => {
    if (vault == null || address == null) {
      return;
    }

    console.log(vault);

    try {
      const res: any = await client.wasm.contractQuery(vault.liquidity_token, {
        balance: {
          address,
        },
      });

      setBalance(res.balance);
    } catch (e) {
      console.log(e);
    }
  }, [client, vault, address]);

  useEffect(() => {
    getVault();
  }, [getVault]);

  useEffect(() => {
    getMyBalance();
  }, [getMyBalance]);

  useEffect(() => {
    getTotalBalance();
  }, [getTotalBalance]);

  return {
    vault,
    balance,
    totalBalance,
  };
};

export default useVault;
