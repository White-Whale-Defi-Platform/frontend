import React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import Card from "components/Card";
import PoolItem from "components/swap/PoolItem";
import { useTerra } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";
import SwapForm from "components/swap/SwapForm";

const Swap: NextPage = () => {
  const {
    routes,
    networkInfo: { name },
  } = useTerra();
  const whaleToken = contracts[name].whaleToken;

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="8">
        Swap
      </Heading>

      <Card>
        <SwapForm />
      </Card>

      <Flex
        mt="20"
        mb="8"
        flexDir={{ base: "column", sm: "column", md: "row" }}
        align="baseline"
      >
        <Heading color="#fff" size="lg" pr={{ md: "10px" }}>
          Earn WHALE
        </Heading>
        <Text
          color={{ base: "brand.500", sm: "brand.500", md: "white" }}
          fontSize="2xl"
          fontWeight={{ md: "700" }}
        >
          by staking WHALE LP
        </Text>
      </Flex>

      <Box mb="24">
        <Box mb="12">
          <PoolItem
            label="WHALE-UST LP"
            asset="TerraSwap"
            apr="--"
            totalStaked="--"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Swap;
