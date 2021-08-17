import React from "react";
import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";

import TotalBurned from "components/dashboard/TotalBurned";
import TotalValueLocked from "components/dashboard/TotalValueLocked";
import TokenCirculatingSupply from "components/dashboard/TokenCirculatingSupply";

const Dashboard = () => {
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Box>
        <Heading color="#fff" size="lg" mb="10">
          Dashboard
        </Heading>
      </Box>
      <Grid templateColumns="repeat(12, 1fr)" gap={16}>
        <GridItem colSpan={7}>
          <TotalBurned />
        </GridItem>
        <GridItem colSpan={5}>
          <TokenCirculatingSupply />
        </GridItem>
        <GridItem colSpan={12}>
          <TotalValueLocked />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
