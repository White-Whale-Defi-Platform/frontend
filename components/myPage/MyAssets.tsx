import { formatAmount, useTerra } from "@arthuryeti/terra";
import { NextPage } from "next";
import { Box, Flex } from "@chakra-ui/react";
import numeral from "numeral";
import { Denom } from "@terra-money/terra.js";

import { useBalance } from "hooks/useBalance";
import contracts from "constants/contracts.json";
import { useVault } from "modules/vault";

import AssetLine from "components/myPage/AssetLine";
import Card from "components/Card";
import CardTitle from "components/CardTitle";
import PieChart from "components/PieChart";

const Gov: NextPage = () => {
  const {
    networkInfo: { name },
  } = useTerra();
  const { balance } = useVault({
    contract: contracts[name].ustVault,
  });
  const ustBalance = useBalance(Denom.USD);
  const total = numeral(balance).add(ustBalance).value().toString();

  const assets = [
    {
      color: "#2C8D47",
      label: "Arb Vault holdings",
      value: formatAmount(balance),
      asset: "UST",
    },
    {
      color: "#194325",
      label: "War Chest",
      value: "0",
      asset: "UST",
    },
    {
      color: "#111111",
      label: "LP holding",
      value: "0",
      asset: "UST",
    },
    {
      color: "#F1F1F1",
      label: "Liquid UST",
      value: formatAmount(ustBalance),
      asset: "UST",
    },
  ];

  const data = [
    {
      label: "Arb Vault holdings",
      value: 0.28,
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
      value: 0.72,
      color: "#F1F1F1",
    },
  ];

  return (
    <Card h="full">
      <Flex justify="space-between" flexDir="column" h="full">
        <CardTitle label="My Assets" value={formatAmount(total)} asset="UST" />
        <Flex>
          <Box flex="1">
            {assets.map((item) => (
              <Box key={item.asset}>
                <AssetLine data={item} />
              </Box>
            ))}
          </Box>
          <Box flex="0.5" pl="8">
            <PieChart data={data} />
          </Box>
        </Flex>
      </Flex>
    </Card>
  );
};

export default Gov;
