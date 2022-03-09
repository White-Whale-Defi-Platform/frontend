import { gql } from "graphql-request";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp} from "@arthuryeti/terra";
import { useHive } from "hooks/useHive";
import useContracts from "hooks/useContracts";
import usevUSTLPHolding from "./usevUSTLPHolding";

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
  const lp = usevUSTLPHolding();
  const { treasury, whaleUstLpToken, ustVaultLpToken, whalevUSTLpToken, whaleToken, aUstToken, moneyMarket } =
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

  const { data: vustValue } = useQuery("vUSTValue",
    () => {
      return client.wasm.contractQuery<string>(ustVaultLpToken, {
        balance: { address: treasury },
      });
    }
  );
  
  const { data: vUSTLPValue } = useQuery("vUSTLPValue",
    () => {
      return client.wasm.contractQuery<string>(whalevUSTLpToken, {
        balance: { address: treasury },
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
    if (result == null || isLoading) {
      return {
        totalValue,
        assets: [],
        isLoading: true
      };
    }

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
        value: (vUSTLPValue as any).balance || 0,
        color: "#0C5557",
      },
      {
        asset: "vUST",
        value: (vustValue as any).balance || 0,
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
      totalValue: num(totalValue).plus(aUstValue).toNumber(),
      assets,
      isLoading: isLoading
    };
  }, [totalValue, result, whaleToken, isLoading, whaleUstLpToken]);
};

export default useTreasury;
