import React from "react";
import { NextPage } from "next";
import { Box, Flex, Heading, Text, Grid, GridItem } from "@chakra-ui/react";

import useContracts from "hooks/useContracts";

import Card from "components/Card";
import PoolItem from "components/swap/PoolItem";
import SwapForm from "components/swap/SwapForm";

const Swap: NextPage = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex justify="center">
        <Card h="full" minW={{ lg: "container.sm" }}>
          <SwapForm />
        </Card>
      </Flex>
    </Box>
  );
};

export default Swap;
