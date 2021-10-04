import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import { useMarketCap } from "hooks/useMarketCap";
import { formatAmount } from "libs/terra";

import MyAssets from "components/myPage/MyAssets";
import LineGraphCard from "components/myPage/LineGraphCard";
import TVL from "components/myPage/TVL";
import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useCommunityFund } from "hooks/useCommunityFund";
import TransactionListCard from "components/myPage/TransactionListCard";
import { useWhalePrice } from "hooks/useWhalePrice";

const dataChart = [
  {
    label: "Apr",
    value: 1.32,
  },
  {
    label: "May",
    value: 4.12,
  },
  {
    label: "Jun",
    value: 2.22,
  },
  {
    label: "Jul",
    value: 3.22,
  },
  {
    label: "Aug",
    value: 1.22,
  },
  {
    label: "Sep",
    value: 7.22,
  },
  {
    label: "Sep",
    value: 7.255,
  },
];

const MyPage: NextPage = () => {
  const price = useWhalePrice();
  const marketCap = useMarketCap();
  const circSupply = useCirculatingSupply();
  const communityFund = useCommunityFund();

  return (
    <Box my="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        My Page
      </Heading>

      <Grid templateColumns="repeat(12, 1fr)" gridAutoRows="1fr" gap={12}>
        <GridItem colSpan={5}>
          <MyAssets />
        </GridItem>

        <GridItem colSpan={7}>
          <LineGraphCard
            cells={[
              {
                label: "WHALE",
                value: `${formatAmount(price, "0.0000")} UST`,
              },
              { label: "Market Cap", value: `${formatAmount(marketCap)} UST` },
              {
                label: "Circulating Supply",
                value: `${formatAmount(circSupply)} WHALE`,
              },
            ]}
            data={dataChart}
          />
        </GridItem>
        <GridItem colSpan={7}>
          <LineGraphCard
            cells={[
              {
                label: "Community Fund",
                value: `${formatAmount(communityFund.totalInUst)} UST`,
              },
              {
                label: "Total UST",
                value: `${formatAmount(communityFund.ustAmount)} UST`,
              },
              {
                label: "Total WHALE",
                value: `${formatAmount(communityFund.whaleAmount)} UST`,
              },
            ]}
            data={dataChart}
          />
        </GridItem>
        <GridItem colSpan={5}>
          <TVL />
        </GridItem>
      </Grid>
      <Heading color="#fff" size="lg" mb="6" mt="24">
        Transaction History
      </Heading>
      <Box>
        <TransactionListCard />
      </Box>
    </Box>
  );
};

export default MyPage;
