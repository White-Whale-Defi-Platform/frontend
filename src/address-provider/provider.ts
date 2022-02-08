
/**
 * AddressProvider interface exposes the available operations 
 * for a smart contract and their types. Think of this like
 * a stub for an API call.
 * Eventually this will be filled with things we need addresses for related to this project
 */
 export interface AddressProvider {
  bLunaReward(): string;
  bLunaHub(): string;
  bLunaToken(): string;
  bEthReward(): string;
  bEthToken(): string;
  market(denom: MARKET_DENOMS): string;
  custody(denom: MARKET_DENOMS, collateral: COLLATERAL_DENOMS): string;
  overseer(denom: MARKET_DENOMS): string;
  aTerra(denom: MARKET_DENOMS): string;
  oracle(): string;
  interest(): string;
  liquidation(): string;
  terraswapblunaLunaPair(): string;
  terraswapblunaLunaLPToken(): string;
  gov(): string;
  terraswapAncUstPair(): string;
  terraswapAncUstLPToken(): string;
  ANC(): string;
  collector(): string;
  staking(): string;
  community(): string;
  distributor(): string;
  airdrop(): string;
  investorLock(): string;
  teamLock(): string;
  wwUSTVault?(): string;
  wwLPToken?(): string;
}



export enum MARKET_DENOMS {
  UUSD = 'uusd',
  UKRW = 'ukrw'
}

export enum COLLATERAL_DENOMS {
  UBLUNA = 'ubluna',
}

