import {
//   AddressProvider,
  COLLATERAL_DENOMS,
  MARKET_DENOMS,
} from "@anchor-protocol/anchor.js";
import { AddressProvider } from "../address-provider/provider"
import {
  CW20Addr,
  HumanAddr,
  CollateralInfo,
  CollateralType,
} from "@anchor-protocol/types";

export interface AddressMap {
  bLunaHub: string;
  bLunaToken: string;
  bLunaReward: string;
  bLunaAirdrop: string;
  bEthReward: string;
  bEthToken: string;
  mmInterestModel: string;
  mmOracle: string;
  mmMarket: string;
  mmOverseer: string;
  mmCustody: string;
  mmCustodyBEth: string;
  mmLiquidation: string;
  mmDistributionModel: string;
  aTerra: string;
  terraswapblunaLunaPair: string;
  terraswapblunaLunaLPToken: string;
  terraswapAncUstPair: string;
  terraswapAncUstLPToken: string;
  gov: string;
  distributor: string;
  collector: string;
  community: string;
  staking: string;
  ANC: string;
  airdrop: string;
  investor_vesting: string;
  team_vesting: string;
  wwUSTVault?: string;
  wwUSTLpToken?: string;
}
export interface ContractAddress {
  bluna: {
    /** addressProvider.bLunaReward() */
    reward: HumanAddr;
    /** addressProvider.bLunaHub() */
    hub: HumanAddr;
    /** addressProvider.airdrop() */
    airdropRegistry: HumanAddr;
  };
  moneyMarket: {
    /** addressProvider.market() */
    market: HumanAddr;
    /** addressProvider.overseer() */
    overseer: HumanAddr;
    /** addressProvider.oracle() */
    oracle: HumanAddr;
    /** addressProvider.interest() */
    interestModel: HumanAddr;
    distributionModel: HumanAddr;
  };
  liquidation: {
    /** addressProvider.liquidation() */
    liquidationContract: HumanAddr;
  };
  anchorToken: {
    /** addressProvider.gov() */
    gov: HumanAddr;
    /** addressProvider.staking() */
    staking: HumanAddr;
    /** addressProvider.community() */
    community: HumanAddr;
    /** addressProvider.distributor() */
    distributor: HumanAddr;
    /** addressProvider.investorLock() */
    investorLock: HumanAddr;
    /** addressProvider.teamLock() */
    teamLock: HumanAddr;
    /** addressProvider.collector() */
    collector: HumanAddr;
  };
  terraswap: {
    /** addressProvider.terraswapblunaLunaPair() */
    blunaLunaPair: HumanAddr;
    /** addressProvider.terraswapbAncUstPair() */
    ancUstPair: HumanAddr;
  };
  cw20: {
    /** addressProvider.bLunaToken() */
    bLuna: CW20Addr;
    /** addressProvider.bEthToken() */
    bEth: CW20Addr;
    /** addressProvider.aTerra() */
    aUST: CW20Addr;
    /** addressProvider.ANC() */
    ANC: CW20Addr;
    /** addressProvider.terraswapbAncUstLPToken() */
    AncUstLP: CW20Addr;
    /** addressProvider.terraswapblunaLunaLPToken() */
    bLunaLunaLP: CW20Addr;
  };
  whitewhale:{
      wwUSTVault: CW20Addr;
      wwLPToken: CW20Addr
  }
}
// TODO: Consider moving into its own file as an env helper.
export function createAnchorContractAddress(
  addressProvider: AddressProvider,
  addressMap: AddressMap
): ContractAddress {
  return {
    bluna: {
      reward: addressProvider.bLunaReward() as HumanAddr,
      hub: addressProvider.bLunaHub() as HumanAddr,
      airdropRegistry: addressProvider.airdrop() as HumanAddr,
    },
    moneyMarket: {
      market: addressProvider.market(MARKET_DENOMS.UUSD) as HumanAddr,
      overseer: addressProvider.overseer(MARKET_DENOMS.UUSD) as HumanAddr,
      oracle: addressProvider.oracle() as HumanAddr,
      interestModel: addressProvider.interest() as HumanAddr,
      distributionModel: addressMap.mmDistributionModel as HumanAddr,
    },
    liquidation: {
      liquidationContract: addressProvider.liquidation() as HumanAddr,
    },
    anchorToken: {
      gov: addressProvider.gov() as HumanAddr,
      staking: addressProvider.staking() as HumanAddr,
      community: addressProvider.community() as HumanAddr,
      distributor: addressProvider.distributor() as HumanAddr,
      investorLock: addressProvider.investorLock() as HumanAddr,
      teamLock: addressProvider.teamLock() as HumanAddr,
      collector: addressProvider.collector() as HumanAddr,
    },
    terraswap: {
      blunaLunaPair: addressProvider.terraswapblunaLunaPair() as HumanAddr,
      ancUstPair: addressProvider.terraswapAncUstPair() as HumanAddr,
    },
    cw20: {
      bLuna: addressProvider.bLunaToken() as CW20Addr,
      bEth: addressProvider.bEthToken() as CW20Addr,
      aUST: addressProvider.aTerra(MARKET_DENOMS.UUSD) as CW20Addr,
      ANC: addressProvider.ANC() as CW20Addr,
      AncUstLP: addressProvider.terraswapAncUstLPToken() as CW20Addr,
      bLunaLunaLP: addressProvider.terraswapblunaLunaLPToken() as CW20Addr,
    },
    whitewhale: {
        wwUSTVault: addressMap.wwUSTVault as CW20Addr,
        wwLPToken: addressMap.wwUSTLpToken as CW20Addr,
    }
  };
}

