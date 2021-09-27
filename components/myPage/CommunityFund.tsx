import { formatAmount, useTerra } from "@arthuryeti/terra";
import { NextPage } from "next";

import { useTokenPrice } from "modules/swap";
import contracts from "constants/contracts.json";

import LineGraphCard from "components/myPage/LineGraphCard";

const dataChart = [
  {
    name: "Apr",
    value: 1.32,
  },
  {
    name: "May",
    value: 4.12,
  },
  {
    name: "Jun",
    value: 2.22,
  },
  {
    name: "Jul",
    value: 3.22,
  },
  {
    name: "Aug",
    value: 1.22,
  },
  {
    name: "Sep",
    value: 7.22,
  },
  {
    name: "Sep",
    value: 7.255,
  },
];

const MyPage: NextPage = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  const price = useTokenPrice(contracts[name].whaleToken);

  return (
    <LineGraphCard
      cells={[
        { label: "Community Fund", value: "-- UST" },
        { label: "Total UST", value: "--" },
        { label: "Total WHALE", value: "--" },
      ]}
      data={dataChart}
    />
  );
};

export default MyPage;
