import { gql } from "graphql-request";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp} from "@arthuryeti/terra";
import { useHive } from "hooks/useHive";
import useContracts from "hooks/useContracts";
import usevUSTLPHolding from "./usevUSTLPHolding";
import useLpHolding from "./useLpHolding";
import { Pool } from "types/common";
import { getAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";
import { calculateSharePrice } from "modules/pool/helpers";
import useWhalePrice from "./useWhalePrice";
import usevUSTPrice from "./usevUSTPrice";

const createQuery = (contract, assets, aUstToken, moneyMarketContract) => {
  if (assets.length === 0) {
    return;
  }

  return gql`
    {
      balance: wasm {
        contractQuery(
          contractAddress: "${aUstToken}"
          query: {
            balance: {
              address: "${contract}"
            }
          }
        )
      }

      moneyMarketEpochState: wasm {
        contractQuery(
          contractAddress: "${moneyMarketContract}"
          query: {
            epoch_state: {}
          }
        )
      }
      ${assets.map((asset) => {
        return `
          ${asset}: wasm {
            contractQuery(
              contractAddress: "${contract}"
              query: {
                holding_value: {
                  identifier: "${asset}"
                }
              }
            )
          }

          
        `;
      })}
    }
`;
};

export const useTreasury = () => {
  const { client, network } = useTerraWebapp();
  const whalePrice = useWhalePrice();
  const vUSTPrice = usevUSTPrice();
  const { treasury, whaleUstLpToken, ustVaultLpToken, whalevUSTLpToken, whalevUSTPair, whaleToken, aUstToken, moneyMarket } =
    useContracts();
  const assets = ["uusd", "uluna", whaleToken, whaleUstLpToken];
  const query = createQuery(treasury, assets, aUstToken, moneyMarket);

  const {result, isLoading} = useHive({
    name: ["terraswap-pools", treasury],
    query,
    options: {
      enabled: !!query,
    },
  });

  const vUSTdashUSTPair ="terra16w76qmlwdevxvt9xnfafmczrjyar6rh5rtsyhw";
  const vUSTdashUSTLP ="terra122tkw2svjgx50027hlf52xqca94sq6s4mkk9d8";


  // Review this down the line, could be poopy
  const { data: vUSTdashUSTBalance } = useQuery("vUSTdashUSTBalance",
    () => {
      return client.wasm.contractQuery<string>(vUSTdashUSTLP, {
        balance: { address: treasury },
      });
    }
  );

  const { data: vUSTdashUSTLPPool } = useQuery("vUSTdashUSTLPPool",
    () => {
      return client.wasm.contractQuery<Pool>(vUSTdashUSTPair, {
        pool: {},
      });
    }
  );

  const { data: vUstBalance } = useQuery("vUstBalance",
    () => {
      return client.wasm.contractQuery<string>(ustVaultLpToken, {
        balance: { address: treasury },
      });
    }
  );

  const { data: vUSTLPBalance } = useQuery("vUSTLPBalance",
    () => {
      return client.wasm.contractQuery<string>(whalevUSTLpToken, {
        balance: { address: treasury },
      });
    }
  );

  const { data: vUSTLPPool } = useQuery("vUSTLPPool",
    () => {
      return client.wasm.contractQuery<Pool>(whalevUSTPair, {
        pool: {},
      });
    }
  );

  const { data: vUSTLPTokenInfo } = useQuery("vUSTLPInfo",
    () => {
      return client.wasm.contractQuery<any>(whalevUSTLpToken, {
        token_info: {},
      });
    }
  );

  const { data: totalValue } = useQuery(
    ["treasury", "total-value", treasury],
    () => {
      return client.wasm.contractQuery<string>(treasury, {
        total_value: {},
      });
    }
  );

  return useMemo(() => {
    if (result == null || isLoading || vUSTLPPool == null || vUSTLPPool == undefined || vUSTLPBalance == undefined || vUstBalance == undefined) {
      return {
        totalValue,
        assets: [],
        isLoading: true
      };
    }
    // Most of this is poopy and needs fixed
    const whalevUSTValue = calculateSharePrice(vUSTLPPool, (vUSTLPBalance as any).balance, whalePrice, vUSTPrice);
    const vUSTdashUSTvalue = calculateSharePrice(vUSTdashUSTLPPool, (vUSTdashUSTBalance as any).balance, vUSTPrice, "1.000");
    console.log("Value is ")
    console.log(vUSTdashUSTvalue)
    const exchangeRate =
      result.moneyMarketEpochState.contractQuery.exchange_rate;
    const aUstValue = num(result.balance.contractQuery.balance)
      .times(exchangeRate)
      .toNumber();

    const assets = [
      {
        asset: "WHALE",
        value: result[whaleToken].contractQuery,
        color: "#3CCD64",
      },
      {
        asset: "WHALE-UST LP",
        value: result[whaleUstLpToken].contractQuery,
        color: "#33BABD",
      },
      {
        asset: "WHALE-vUST LP",
        value: num(whalevUSTValue).times(2) || 0,
        color: "#0C5557",
      },
      {
        asset: "vUST-UST LP",
        value: num(vUSTdashUSTvalue).times(ONE_TOKEN) || 0,
        color: "#279145",
      },
      {
        asset: "vUST",
        value: num((vUstBalance as any).balance).times(vUSTPrice) || 0,
        color: "#279145",
      },
      {
        asset: "aUST",
        value: aUstValue,
        color: "#135425",
      },
      {
        asset: "LUNA",
        value: result.uluna.contractQuery,
        color: "#FFDD4D",
      },
    ];
    // TODO: This is really poopy and needs refactoring 
    return {
      totalValue: num(totalValue).plus(aUstValue).plus(num((vUstBalance as any).balance).times(vUSTPrice)).plus(num(whalevUSTValue).times(2)).plus(num(vUSTdashUSTvalue).times(ONE_TOKEN)).toNumber(),
      assets,
      isLoading: isLoading
    };
  }, [totalValue, result, whaleToken, isLoading, whaleUstLpToken]);
};

export default useTreasury;
