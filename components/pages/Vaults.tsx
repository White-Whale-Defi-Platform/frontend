import React from "react";
import { Box, Heading, Flex, Button, Text } from "@chakra-ui/react";

import VaultLine from "components/vault/VaultLine";

const data = [
  {
    contract: "terra1759jepndfjyfzzgexa5vmkhhaq7vyn8tq8gf5z",
    name: "UST",
    logo: "/ust.png",
    apy: "33,6%",
    dailyYield: "0,28%",
    totalDeposits: "54.06k",
    myDeposit: "3000.06",
    myRewards: "800.46",
    type: "peg",
  },
  {
    contract: "",
    name: "KRT",
    logo: "/krtCrypto.png",
    apy: "24,2%",
    dailyYield: "0,33%",
    totalDeposits: "18.50k",
    myDeposit: "1040.56",
    myRewards: "54.46",
    type: "peg",
  },
  {
    contract: "",
    name: "LUNA/bLUNA",
    logo: "/terraCrypto.png",
    apy: "33,6%",
    dailyYield: "0,28%",
    totalDeposits: "320.01k",
    myDeposit: "3000.06",
    myRewards: "189.00",
    type: "asset",
    assetList: [
      {
        color: "#FFDD4D",
        label: "LUNA",
        value: "54M",
        asset: "UST",
      },
      {
        color: "#3CCD64",
        label: "UST",
        value: "87M",
        asset: "UST",
      },
      {
        color: "#2E78E9",
        label: "WHALE",
        value: "87M",
        asset: "UST",
      },
      {
        color: "#525252",
        label: "Others",
        value: "87M",
        asset: "UST",
      },
    ],
  },
];

const Vaults = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex justifyContent="space-between">
        <Heading color="#fff" size="lg" mb="10">
          Arb Vaults
        </Heading>
      </Flex>
      <Box mt="8">
        {data.map((item) => (
          <Box key={item.name} mb="12">
            <VaultLine data={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Vaults;
