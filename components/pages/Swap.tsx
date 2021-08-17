import React from "react";
import { NextPage } from "next";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";

import Card from "components/Card";
import SwapStakingCard from "components/swap/SwapStakingCard";
import SwapItemLine from "components/swap/SwapItemLine";

const Swap: NextPage = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.sm">
      <Heading color="#fff" size="lg" mb="12">
        Swap
      </Heading>
      <Card>
        <SwapItemLine
          value="520.8145454545"
          asset="LUNA"
          logo="/logoTerra.svg"
        />
        <Flex
          alignItems="center"
          justifyContent="center"
          mb="2.75rem"
          mt="2.75rem"
        >
          <Image
            src="/Vector.svg"
            alt="Vector"
            width="2.375rem"
            height="2.375rem"
          />
        </Flex>
        <SwapItemLine
          value="520.8145454545"
          asset="WHALE"
          logo="/logo-small.svg"
        />
        <Flex justify="center" mt="12">
          <Button variant="primary" size="lg" px="77px">
            Swap tokens
          </Button>
        </Flex>
      </Card>

      <Flex
        mt="24"
        mb="12"
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

      <Flex
        align="center"
        justify="space-between"
        mb="24"
        flexDir={{ base: "column", sm: "column", md: "row" }}
      >
        <SwapStakingCard
          label="WHALE-UST LP"
          asset="TerraSwap"
          apr="--"
          totalStaked="--"
        />
        <SwapStakingCard
          label="WHALE-UST LP"
          asset="Astroport"
          apr="--"
          totalStaked="--"
        />
      </Flex>
    </Box>
  );
};

export default Swap;
