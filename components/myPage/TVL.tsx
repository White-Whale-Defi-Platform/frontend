import { NextPage } from "next";

import { useTVL } from "hooks/useTVL";

import PieGraphCard from "components/myPage/PieGraphCard";
import { format } from "libs/parse";

const TVL: NextPage = () => {
  const { total, totalInVault, totalInWarchest } = useTVL();

  const data = [
    {
      label: "Arb Vault",
      value: Number(totalInVault),
      color: "#3CCD64",
    },
    {
      label: "War chest",
      value: Number(totalInWarchest),
      color: "#194325",
    },
  ];

  return (
    <PieGraphCard
      title="Total Value Locked"
      value={format(total, "uusd")}
      asset="UST"
      data={data}
    />
  );
};

export default TVL;
