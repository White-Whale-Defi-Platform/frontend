import { formatAmount, useTerra } from "@arthuryeti/terra";
import { NextPage } from "next";
import numeral from "numeral";

import { useBalance } from "hooks/useBalance";
import contracts from "constants/contracts.json";
import { useVault } from "modules/vault";

import PieGraphCard from "components/myPage/PieGraphCard";

const MyAssets: NextPage = () => {
  const {
    networkInfo: { name },
  } = useTerra();
  const { balance } = useVault({
    contract: contracts[name].ustVault,
  });
  const ustBalance = useBalance("uusd");
  const total = numeral(balance).add(ustBalance).value().toString();

  const data = [
    {
      label: "Arb Vault holdings",
      value: Number(balance),
      color: "#3CCD64",
    },
    {
      label: "War Chest",
      value: 0,
      color: "#194325",
    },
    {
      label: "LP holding",
      value: 0,
      color: "#111111",
    },
    {
      label: "Liquid UST",
      value: Number(ustBalance),
      color: "#2E78E9",
    },
  ];

  return (
    <PieGraphCard
      title="My Assets"
      value={formatAmount(total)}
      asset="UST"
      data={data}
    />
  );
};

export default MyAssets;
