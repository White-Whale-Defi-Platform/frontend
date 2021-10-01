import { useConnectedWallet } from "@terra-money/wallet-provider";
import { JSDateTime } from "@anchor-protocol/types";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const DEFAULT_API_ENDPOINT = process.env.DEFAULT_API_ENDPOINT || 'https://tequila-api.anchorprotocol.com/api/v1';

export interface MypageTxHistory {
  tx_type: string;
  /** html string */
  descriptions: string[];
  address: string;
  tx_hash: string;
  timestamp: JSDateTime;
}

export interface MypageTxHistoryData {
  next: string | null;
  history: MypageTxHistory[];
}

export interface MypageTxHistoryQueryParams {
  endpoint: string;
  walletAddress: string;
  offset: string | null;
}

export async function makeTxHistoryQuery({
  endpoint,
  walletAddress,
  offset,
}: MypageTxHistoryQueryParams): Promise<MypageTxHistoryData> {
  const offsetQuery = offset ? "?offset=" + offset : "";
  const data: MypageTxHistoryData = await fetch(
    `${endpoint}/history/${walletAddress}${offsetQuery}`
  ).then((res) => res.json());

  return data;
}

export const useTxHistoryQuery = () => {
  const connectedWallet = useConnectedWallet();
  const [history, setHistory] = useState<MypageTxHistory[]>([]);
  const endpoint = DEFAULT_API_ENDPOINT;

  const [next, setNext] = useState<string | null>(null);

  const [inProgress, setInProgress] = useState<boolean>(true);

  const {data: txHistoryData} = useQuery([connectedWallet], () => {
    // initialize data
    setHistory([]);
    setNext(null);

    if (!connectedWallet) {
      setInProgress(false);
      return;
    }

    setInProgress(true);

    makeTxHistoryQuery({
      endpoint,
      walletAddress: connectedWallet.walletAddress,
      offset: null,
    })
      .then(({ history, next }) => {
        setInProgress(false);
        setHistory(history);
        setNext(next);
      })
      .catch((error) => {
        console.error(error);
        setHistory([]);
        setNext(null);
        setInProgress(false);
      });
  });

  return {
    history,
    isLast: !next,
    reload: txHistoryData,
    inProgress,
  };
};
