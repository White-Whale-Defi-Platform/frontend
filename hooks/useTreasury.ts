import { gql } from "graphql-request";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useTerraWebapp } from "@arthuryeti/terra";

import { useHive } from "hooks/useHive";
import useContracts from "hooks/useContracts";

const createQuery = (contract, assets) => {
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
        `;
      })}
    }
`;
};

export const useTreasury = () => {
  const { client } = useTerraWebapp();
  const { treasury, whaleUstLpToken, whaleToken } = useContracts();

  const assets = ["uusd", "uluna", whaleToken, whaleUstLpToken];

  const query = createQuery(treasury, assets);

  const result = useHive({
    name: ["terraswap-pools", treasury],
    query,
    options: {
      enabled: !!query,
    },
  });

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
        asset: "UST",
        value: result.uusd.contractQuery,
        color: "#2EB0E9",
      },
      {
        asset: "LUNA",
        value: result.uluna.contractQuery,
        color: "#FFDD4D",
      },
    ];

    return {
      totalValue,
      assets,
    };
  }, [totalValue, result]);
};

export default useTreasury;
