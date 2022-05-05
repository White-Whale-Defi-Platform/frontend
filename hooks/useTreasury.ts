import { gql } from "graphql-request";
import { useMemo } from "react";
import { useQuery , useQueries} from "react-query";
import { num, useTerraWebapp } from "@arthuryeti/terra";
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
  const { astroToken, lunaBlunaPool, treasury, whaleUstLpToken, ustVaultLpToken, whalevUSTLpToken, whalevUSTPair, whaleToken, aUstToken, moneyMarket, astroGenerator, astroBlunaLunaPair, lunaUstPair, loopBlunaUstPair } = useContracts();
  const assets = ["uusd", "uluna", whaleToken, whaleUstLpToken];
  const query = createQuery(treasury, assets, aUstToken, moneyMarket);

  const { result, isLoading } = useHive({
    name: ["terraswap-pools", treasury],
    query,
    options: {
      enabled: !!query,
    },
  });

  const vUSTdashUSTPair = "terra16w76qmlwdevxvt9xnfafmczrjyar6rh5rtsyhw";
  const vUSTdashUSTLP = "terra122tkw2svjgx50027hlf52xqca94sq6s4mkk9d8";


  // Review this down the line, could be poopy
  const { data: vUSTdashUSTBalance } = useQuery("vUSTdashUSTBalance",
    () => {
      return client.wasm.contractQuery<string>(vUSTdashUSTLP, {
        balance: { address: treasury },
      });
    }
  );

  const { data: blunaLunaLP } = useQuery("blunaLunaLP",
    () => {
      return client.wasm.contractQuery<string>(astroGenerator, {

        "deposit": {
          "lp_token": lunaBlunaPool,
          "user": treasury
        }

      });
    }
  );

  const { data: blunaLunaLPShare } = useQuery("blunaLunaLPShare",
    () => {
      if (!blunaLunaLP) return

      return client.wasm.contractQuery<any[]>(astroBlunaLunaPair, {
        "share": {
          "amount": blunaLunaLP
        }
      });
    },
    {
      enabled: !!blunaLunaLP,
    }
  );

  const { data: lunaUstPool } = useQuery("lunaUstPool",
    () => {
      return client.wasm.contractQuery<Pool>(lunaUstPair, {
        "pool": {}
      });
    }
  );

  const { data: blunaUstPool } = useQuery("blunaUstPool",
    () => {
      return client.wasm.contractQuery<Pool>(loopBlunaUstPair, {
        "pool": {}
      });
    }
  );

  const poolToUst = (pool, share) => {
    const { uusd, other } = getAmountsInPool(pool);
    const price = num(uusd).div(other).toFixed();
    return num(share).times(price).toNumber()
  }



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

  const { data: astroBalance } = useQuery("astroBalance",
    () => {
      return client.wasm.contractQuery<any>(astroToken, {
        balance: { address: treasury }
      })
    }
  );
  const { data: xastroBalance } = useQuery("xastroBalance",
    () => {
      return client.wasm.contractQuery<any>("terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7", {
        balance: { address: treasury }
      })
    }
  );

  const { data: astroPrice } = useQuery("astroPrice",
    async () => {
      const response = await fetch("https://api.extraterrestrial.money/v1/api/prices?symbol=ASTRO")
      return await response.json()
    }, { select: (data) => data?.prices?.ASTRO?.price }
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


  const bLunaLunaLPnUST = useMemo(() => {
    if (!lunaUstPool || !blunaLunaLPShare || !blunaUstPool) return null;

    const [bluna, luna] = blunaLunaLPShare
    const lunaInUst = poolToUst(lunaUstPool, luna.amount)
    const blunaInUst = poolToUst(blunaUstPool, bluna.amount)

    return num(lunaInUst).plus(blunaInUst).toFixed();

  }, [lunaUstPool, blunaLunaLPShare, blunaUstPool])

  const astro = useMemo(() => {
    if (!astroBalance || !astroPrice) return

    return num(astroBalance?.balance).times(astroPrice).div(ONE_TOKEN).toNumber()

  }, [astroBalance, astroPrice])



  const [xAstroShare, xAstroDeposit] = useQueries([
     {
      queryKey: ['xAstro-totalShare'],
      queryFn: () => client.wasm.contractQuery<any>("terra1f68wt2ch3cx2g62dxtc8v68mkdh5wchdgdjwz7", {
        total_shares: {},
      })
    },
     {
      queryKey: ['xAstro-totalDeposit'],
      queryFn: () => client.wasm.contractQuery<any>("terra1f68wt2ch3cx2g62dxtc8v68mkdh5wchdgdjwz7", {
        total_deposit: {},
      })
    }
    
  ])

  const xastro = useMemo(() => {
    if (!xastroBalance || !xAstroShare || !xAstroDeposit || !astroPrice) return
    
    const xAstroPrice = num(xAstroDeposit?.data).div(xAstroShare?.data).toNumber()
    return num(xastroBalance.balance).times(astroPrice).times(xAstroPrice).div(ONE_TOKEN).toNumber()
  }, [xastroBalance, xAstroShare, xAstroDeposit, astroPrice])



  const treasuryAssets = useMemo(() => {
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
    const exchangeRate =
      result.moneyMarketEpochState.contractQuery.exchange_rate;
    const aUstValue = num(result.balance.contractQuery.balance)
      .times(exchangeRate)
      .toNumber();
    const retro = 335000
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
        asset: "LUNA",
        value: result.uluna.contractQuery,
        color: "#FFDD4D",
      },
      {
        asset: "bLUNA-LUNA LP",
        value: bLunaLunaLPnUST,
        color: "#FFBF00",
      },
      {
        asset: "vUST",
        value: num((vUstBalance as any).balance).times(vUSTPrice).toNumber(),
        color: "#279145",
      },
      {
        asset: "WHALE-vUST LP",
        value: num(whalevUSTValue).times(2).toNumber(),
        color: "#0C5557",
      },
      {
        asset: "aUST",
        value: aUstValue,
        color: "#135425",
      },
      {
        asset: "vUST-UST LP",
        value: num(vUSTdashUSTvalue).times(ONE_TOKEN).toNumber(),
        color: "#279145",
      },
      {
        asset: "ASTRO",
        value: num(astro).times(ONE_TOKEN).toNumber(),
        color: "#504DEF",
      },
      {
        asset: "xASTRO",
        value: num(xastro).times(ONE_TOKEN).toNumber(),
        color: "#221eeb",
      },
      {
        asset: "RETRO",
        value: num(retro).times(ONE_TOKEN).toNumber(),
        color: "#56549E",
        tooltip : "Vested"
      },
    ];
    // TODO: This is really poopy and needs refactoring 
    return {
      totalValue: num(totalValue)
        .plus(aUstValue)
        .plus(num((vUstBalance as any).balance)
        .times(vUSTPrice))
        .plus(num(whalevUSTValue).times(2))
        .plus(bLunaLunaLPnUST)
        .plus(num(vUSTdashUSTvalue)
        .plus(xastro)
        .plus(astro)
        .plus(retro)
        .times(ONE_TOKEN))
        .toNumber(),
      assets,
      isLoading: isLoading
    };
  }, [totalValue, result, whaleToken, isLoading, whaleUstLpToken, bLunaLunaLPnUST, astro]);

  return treasuryAssets
};

export default useTreasury;
