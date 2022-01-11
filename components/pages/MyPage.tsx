import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import MyAssets from "components/myPage/MyAssets";
import WhaleCard from "components/WhaleCard";
import TVL from "components/myPage/TVL";

const MyPage: NextPage = () => {
  return (
    <Box my="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        My Page
      </Heading>

      <Grid templateColumns="repeat(12, 1fr)" gap={{ base: 2, md: 12 }}>
        <GridItem colSpan={{ base: 12, lg: 5 }}>
          <MyAssets />
        </GridItem>

        <GridItem colSpan={{ base: 12, lg: 7 }}>
          <WhaleCard />
        </GridItem>
        <GridItem colSpan={12}>
          <TVL />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyPage;
