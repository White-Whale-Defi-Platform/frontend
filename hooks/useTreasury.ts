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
    if (result == null || isLoading || vUSTLPPool == null || vUSTLPBalance == null) {
      return {
        totalValue,
        assets: [],
        isLoading: true
      };
    }
    const value = calculateSharePrice(vUSTLPPool, (vUSTLPBalance as any).balance, whalePrice, vUSTPrice);
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
        value: num(value).times(2) || 0,
        color: "#0C5557",
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

    return {
      totalValue: num(totalValue).plus(aUstValue).plus(num((vUstBalance as any).balance).times(vUSTPrice)).plus(num(value).times(2)).toNumber(),
      assets,
      isLoading: isLoading
    };
  }, [totalValue, result, whaleToken, isLoading, whaleUstLpToken]);
};

export default useTreasury;
