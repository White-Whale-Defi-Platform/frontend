import { useQuery } from "react-query";

export const useUstPrice = () => {
  const { data, isLoading } = useQuery<any>("ustPrice", async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=terrausd&vs_currencies=usd",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return response.json();
  });

  if (isLoading || data == null) {
    return 0;
  }

  return data.terrausd.usd;
};

export default useUstPrice;
