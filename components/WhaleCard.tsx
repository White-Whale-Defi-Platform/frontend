import { useEffect , useState  } from "react";
import { NextPage } from "next";
import dayjs from "dayjs";

import { useMarketCap } from "hooks/useMarketCap";
import { fromTerraAmount } from "libs/terra";

import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useWhalePrice } from "hooks/useWhalePrice";
import { useWhalePriceTimes } from "hooks/useWhalePriceTimes";

import LineGraphCard from "components/myPage/LineGraphCard";

interface GraphData {
  label: string,
  value: number
}

const Dashboard: NextPage = () => {
  const price = useWhalePrice();
  const marketCap = useMarketCap();
  const circSupply = useCirculatingSupply();
  const data = useWhalePriceTimes();
  const [ graphData , setGraphData ] =  useState<GraphData[]>([]);

  useEffect(() => {
    setGraphData( data && data.map((item) => {
      return {
        label: dayjs(item.createdAt).format("MMM D"),
        value: item.token1,
      };
    }));
  }, [data])


  return (
    <LineGraphCard
      cells={[
        {
          label: "WHALE Price",
          value: fromTerraAmount(price, "0.0000"),
          asset: "UST",
        },
        {
          label: "Market Cap",
          value: fromTerraAmount(marketCap, "0,0a"),
          asset: "UST",
        },
        {
          label: "Circulating Supply",
          value: fromTerraAmount(circSupply, "0,0a"),
          asset: "WHALE",
        },
      ]}
      data={graphData}
    />
  );
};

export default Dashboard;