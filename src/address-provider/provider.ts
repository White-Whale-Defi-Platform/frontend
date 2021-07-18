
/**
 * AddressProvider interface exposes the available operations 
 * for a smart contract and their types. Think of this like
 * a stub for an API call.
 */
export interface AddressProvider {
  bLunaReward(): string;

  bLunaHub(): string;

  bLunaToken(): string;

  // This should be the white whale contract which can handle deposits and withdraws
  market(denom: MARKET_DENOMS): string;

  
}

export enum MARKET_DENOMS {
  UUSD = 'uusd',
  UKRW = 'ukrw'
}

export enum COLLATERAL_DENOMS {
  UBLUNA = 'ubluna',
}

