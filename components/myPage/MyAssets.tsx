import { useMemo } from "react";
import {
  fromTerraAmount,
  useTerraWebapp,
  useBalance,
  num,
} from "@arthuryeti/terra";
import { NextPage } from "next";

import useContracts from "hooks/useContracts";
import { useVault } from "modules/vault";
import { useGovStaked } from "modules/govern";
import { times, div } from "libs/math";
import { useWhalePrice } from "hooks/useWhalePrice";
import { ONE_TOKEN } from "constants/constants";
import { useLpHolding } from "hooks/useLpHolding";

import PieGraphCard from "components/myPage/PieGraphCard";

const MyAssets: NextPage = () => {
  const { ustVault, whaleToken } = useContracts();
  const price = useWhalePrice();
  const stakedAmount = useGovStaked();
  const lpHolding = useLpHolding();
  const { balance } = useVault({
    contract: ustVault,
  });

  const ustBalance = useBalance("uusd");
  const whaleBalance = useBalance(whaleToken);

  const warchestAmount = useMemo(() => {
    if (stakedAmount == null) {
      return null;
    }

    return times(stakedAmount, div(price, ONE_TOKEN));
  }, [stakedAmount, price]);

  const whaleAmount = useMemo(() => {
    if (whaleBalance == null || price == null) {
      return null;
    }

    return times(whaleBalance, div(price, ONE_TOKEN));
  }, [whaleBalance, price]);

  const total = useMemo(() => {
    return num(balance)
      .plus(ustBalance)
      .plus(warchestAmount)
      .plus(lpHolding)
      .plus(whaleAmount)
      .toString();
  }, [balance, lpHolding, warchestAmount, ustBalance, whaleAmount]);

  const data = [
    {
      label: "Arb Vault",
      value: Number(balance),
      color: "#30FF6A",
    },
    {
      label: "War Chest",
      value: Number(warchestAmount),
      color: "#298F46",
    },
    {
      label: "LP holding",
      value: Number(lpHolding),
      color: "#194325",
    },
    {
      label: "Liquid UST",
      value: Number(ustBalance),
      color: "#2EB1E9",
    },
    {
      label: "Liquid WHALE",
      value: Number(whaleAmount),
      color: "#3CCD64",
    },
  ];

  return (
    <PieGraphCard
      title="My Assets"
      value={fromTerraAmount(total, "0,0")}
      asset="UST"
      data={data}
    />
  );
};

export default MyAssets;
