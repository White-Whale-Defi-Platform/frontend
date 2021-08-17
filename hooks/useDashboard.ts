import { useCallback, useState, useEffect, useMemo } from "react";
import { useTerra } from "@arthuryeti/terra";
import numeral from "numeral";

import contracts from "constants/contracts.json";
import { useTokenPrice } from "modules/swap";

export const useDashboard = () => {
  const {
    client,
    networkInfo: { name },
  } = useTerra();
  const [balance, setBalance] = useState("0.00");
  const [tokenInfo, setTokenInfo] = useState({
    total_supply: "0.00",
  });
  const whaleToken = contracts[name].whaleToken;
  const ustVault = contracts[name].ustVault;
  const ustVaultLpToken = contracts[name].ustVaultLpToken;
  const price = useTokenPrice(whaleToken);

  const getBalance = useCallback(async () => {
    if (ustVaultLpToken == null || ustVault == null) {
      return;
    }

    try {
      const res: any = await client.wasm.contractQuery(ustVaultLpToken, {
        balance: {
          address: ustVault,
        },
      });

      setBalance(res.balance);
    } catch (e) {
      console.log(e);
    }
  }, [client, ustVaultLpToken, ustVault]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  const getTokenInfo = useCallback(async () => {
    if (whaleToken == null) {
      return;
    }

    try {
      const res: any = await client.wasm.contractQuery(whaleToken, {
        token_info: {},
      });

      setTokenInfo(res);
    } catch (e) {
      console.log(e);
    }
  }, [client, whaleToken]);

  useEffect(() => {
    getTokenInfo();
  }, [getTokenInfo]);

  const marketCap = useMemo(() => {
    return numeral(price).multiply(tokenInfo.total_supply).value().toString();
  }, [price, tokenInfo]);

  const circulatingSupply = useMemo(() => {
    return numeral(tokenInfo.total_supply).subtract(balance).value().toString();
  }, [tokenInfo, balance]);

  return {
    price,
    marketCap,
    circulatingSupply,
    totalSupply: tokenInfo.total_supply,
  };
};

export default useDashboard;
