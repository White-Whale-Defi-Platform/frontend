import React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useTerraWebapp } from "@arthuryeti/terra";

import contracts from "constants/contracts.json";

import Card from "components/Card";
import PoolItem from "components/swap/PoolItem";
import SwapForm from "components/swap/SwapForm";

const Swap: NextPage = () => {
  const {
    network: { name },
  } = useTerraWebapp();
  const pairContract = contracts[name].whaleUstPair;
  const lpTokenContract = contracts[name].whaleUstLpToken;

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex gridGap="24">
        <Box flex="1">
          <Heading color="#fff" size="lg" mb="8">
            Swap
          </Heading>
          <Card>
            <SwapForm />
          </Card>
        </Box>

        <Box flex="1">
          <Flex
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

          <Box maxW="sm">
            <PoolItem
              label="WHALE-UST LP"
              asset="Astroport"
              pairContract={pairContract}
              lpTokenContract={lpTokenContract}
            />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Swap;
