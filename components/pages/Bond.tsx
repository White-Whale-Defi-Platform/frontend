import React from "react";
import { Stack, Box, Heading } from "@chakra-ui/react";
import Card from "components/Card";
import { NextPage } from "next";

import useContracts from "hooks/useContracts";

import BondCardHeader from "components/bond/BondCardHeader";
import BondItem from "components/bond/BondItem";

const Bond: NextPage = () => {
  const { whaleUstLpToken } = useContracts();
  const data = [
    {
      contract: whaleUstLpToken,
      name: "WHALE-UST LP",
      icon1: "/logo-small.svg",
      icon2: "/ust.png",
      price: "$0.924",
      roi: "7.63%",
      purchased: "$18,296,029",
    },
    {
      contract: "uluna",
      name: "LUNA",
      icon1: "/terraCrypto.png",
      price: "$0.94",
      roi: "6%",
      purchased: "$13,341,324",
    },
    {
      contract: "uusd",
      name: "UST",
      icon1: "/ust.png",
      price: "$0.9199",
      roi: "8.01%",
      purchased: "$11,200,023",
    },
  ];

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Stack justify="space-between" spacing="4" mb="10">
        <Heading color="#fff" size="lg" mb="4">
          Bond (1,1)
        </Heading>
      </Stack>
      <Card noPadding h="full">
        <Stack p="8" spacing="4">
          <BondCardHeader />
          {data.map((item) => (
            <BondItem data={item} key={item.contract} />
          ))}
        </Stack>
      </Card>
    </Box>
  );
};

export default Bond;
