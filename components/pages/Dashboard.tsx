import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import Treasury from "components/Treasury";
import WhaleCard from "components/WhaleCard";

const Dashboard: NextPage = () => {
  return (
    <Box my="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Dashboard
      </Heading>

      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 2, md: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 5 }}>
          <Treasury />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 7 }}>
          <WhaleCard />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Dashboard;
