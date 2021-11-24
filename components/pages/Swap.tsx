import React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text, Grid, GridItem } from "@chakra-ui/react";

import useContracts from "hooks/useContracts";

import Card from "components/Card";
import PoolItem from "components/swap/PoolItem";
import SwapForm from "components/swap/SwapForm";

const Swap: NextPage = () => {
  const { whaleUstLpToken, whaleUstPair, whaleUstStaking } = useContracts();

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex gridGap="24">
        <Box flex="1">
          <Heading color="#fff" size="lg" mb="8">
            Swap
          </Heading>
        </Box>
        <Box flex="1" display={{ base: "none", lg: "block" }}>
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
        </Box>
      </Flex>

      <Grid
        templateColumns="repeat(12, 1fr)"
        gridAutoRows={{ lg: "1fr" }}
        gap={{ base: 10, lg: 12 }}
      >
        <GridItem colSpan={{ base: 12, lg: 6 }}>
          <Card h="full">
            <SwapForm />
          </Card>
        </GridItem>
        <GridItem colSpan={{ base: 12, lg: 4 }}>
          <PoolItem
            label="WHALE-UST LP"
            asset="Astroport"
            pairContract={whaleUstPair}
            lpTokenContract={whaleUstLpToken}
            stakingContract={whaleUstStaking}
          />
        </GridItem>
      </Grid>

      <Flex gridGap="24">
        <Box flex="1"></Box>
        <Box flex="1"></Box>
      </Flex>
    </Box>
  );
};

export default Swap;
