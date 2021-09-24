import { useQuery } from "react-query";
import { useAddress, useTerra } from "@arthuryeti/terra";

import { getIsTokenNative } from "libs/parse";

export const useBalance = (token: string) => {
  const { client } = useTerra();
  const address = useAddress();

  const { data, isLoading } = useQuery<any>(`balance-${token}`, () => {
    if (getIsTokenNative(token)) {
      return client.bank.balance(address);
    }

    return client.wasm.contractQuery(token, {
      balance: {
        address,
      },
    });
  });

  if (isLoading || !data) {
    return "0";
  }

  if (data.balance) {
    return data.balance;
  }

  return data?.get(token).amount.toString();
};

export default useBalance;
