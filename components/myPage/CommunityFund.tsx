import { formatAmount, useTerra } from "@arthuryeti/terra";
import { NextPage } from "next";

import { useTokenPrice } from "modules/swap";
import contracts from "constants/contracts.json";

import LineGraphCard from "components/myPage/LineGraphCard";

const dataChart = [
  {
    label: "Apr",
    value: 1.32,
  },
  {
    label: "May",
    value: 4.12,
  },
  {
    label: "Jun",
    value: 2.22,
  },
  {
    label: "Jul",
    value: 3.22,
  },
  {
    label: "Aug",
    value: 1.22,
  },
  {
    label: "Sep",
    value: 7.22,
  },
  {
    label: "Sep",
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
