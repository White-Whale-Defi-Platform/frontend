import { useQuery } from "react-query";
import { useAddress } from "@arthuryeti/terra";

const DEFAULT_API_ENDPOINT =
  process.env.DEFAULT_API_ENDPOINT ||
  "https://tequila-api.anchorprotocol.com/api/v1";

export interface TxHistory {
  tx_type: string;
  /** html string */
  descriptions: string[];
  address: string;
  tx_hash: string;
  timestamp: Date;
}

export interface FetchTxHistoryResponse {
  next: string | null;
  history: TxHistory[];
}

export interface FetchTxHistoryParams {
  endpoint: string;
  walletAddress: string;
  offset: string | null;
}

export async function fetchTxHistory({
  endpoint,
  walletAddress,
  offset,
}: FetchTxHistoryParams): Promise<FetchTxHistoryResponse> {
  const offsetQuery = offset ? "?offset=" + offset : "";
  const res = await fetch(`${endpoint}/history/${walletAddress}${offsetQuery}`);
  return res.json();
}

export const useTxHistoryQuery = () => {
  const address = useAddress();
  const endpoint = DEFAULT_API_ENDPOINT;

  return useQuery("txHistory", () => {
    return fetchTxHistory({
      endpoint,
      walletAddress: address,
      offset: null,
    });
  });
};
