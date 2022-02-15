import { gql } from "graphql-request";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { num, useTerraWebapp} from "@arthuryeti/terra";
import { useHive } from "hooks/useHive";
import useContracts from "hooks/useContracts";

const createQuery = (contract, assets, aUstToken, moneyMarketContract) => {
  if (assets.length === 0) {
    return;
  }

  return gql`
    {
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
        `;
      })}
    }
`;
};

export const useTreasury = () => {
  const { client } = useTerraWebapp();
  const { treasury, whaleUstLpToken, ustVaultLpToken, whaleToken, aUstToken, moneyMarket } =
    useContracts();

  const assets = ["uusd", "uluna", whaleToken, whaleUstLpToken];

  const query = createQuery(treasury, assets, aUstToken, moneyMarket);

  const result = useHive({
    name: ["terraswap-pools", treasury],
    query,
    options: {
      enabled: !!query,
    },
  });

  console.log(ustVaultLpToken)

  const { data: vustValue } = useQuery("vUSTValue",
    () => {
      return client.wasm.contractQuery<string>(ustVaultLpToken, {
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
    if (result == null) {
      return {
        totalValue,
        assets: [],
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
        color: "#298F46",
      },
      {
        asset: "aUST",
        value: aUstValue,
        color: "#194325",
      },
      {
        asset: "UST",
        value: result.uusd.contractQuery,
        color: "#2EB0E9",
      },
      {
        asset: "LUNA",
        value: result.uluna.contractQuery,
        color: "#FFDD4D",
      },
      {
        asset: "VUST",
        value: (vustValue as any).balance,
        color: "#3CCD64",
      },
    ];

    return {
      totalValue: num(totalValue).plus(aUstValue).toNumber(),
      assets,
    };
  }, [totalValue, result, whaleToken, whaleUstLpToken]);
};

export default useTreasury;
