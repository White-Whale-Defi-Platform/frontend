import { useEffect, useState } from "react";
import { NextPage } from "next";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday)


import { useMarketCap } from "hooks/useMarketCap";
import { fromTerraAmount } from "libs/terra";

import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useWhalePrice } from "hooks/useWhalePrice";

import { useWhalePriceTimes } from "hooks/useWhalePriceTimes";

import LineGraphCard from "components/myPage/LineGraphCard";
import USTIcon from "./icons/USTIcon";

interface GraphData {
  label: string,
  value: number
}

const Dashboard: NextPage = () => {
  const price = useWhalePrice();

  const marketCap = useMarketCap();
  const circSupply = useCirculatingSupply();
  const data = useWhalePriceTimes();
  const [graphData, setGraphData] = useState<GraphData[]>([]);

  useEffect(() => {
    const sortByDate = data.map((item) => {
      if (dayjs(item.createdAt)?.isToday()) return
      return {
        label: dayjs(item.createdAt).format("MMM D"),
        value: item.token1,
      };
    }).filter(item => item)

    if (data.length) {
      sortByDate.push({
        label: "Now",
        value: fromTerraAmount(price, "0.0000"),
      });
      setGraphData(sortByDate)
    }
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
          value: circSupply?.toLocaleString("en-US"),
          asset: "",
        },
      ]}
      data={graphData}
    />
  );
};

export default Dashboard;