import { Box, Heading, Grid, GridItem } from "@chakra-ui/react";
import { NextPage } from "next";

import { useMarketCap } from "hooks/useMarketCap";
import { fromTerraAmount } from "libs/terra";

import { useCirculatingSupply } from "hooks/useCirculatingSupply";
import { useWhalePrice } from "hooks/useWhalePrice";
import { useWhalePriceTimes } from "hooks/useWhalePriceTimes";

import MyAssets from "components/myPage/MyAssets";
import LineGraphCard from "components/myPage/LineGraphCard";
import TVL from "components/myPage/TVL";
import dayjs from "dayjs";

const MyPage: NextPage = () => {
  const price = useWhalePrice();
  const marketCap = useMarketCap();
  const circSupply = useCirculatingSupply();
  const data = useWhalePriceTimes();

  const dataChart = data
    .map((item) => {
      return {
        label: dayjs(item.createdAt).format("h A"),
        value: item.token1,
      };
    })
    .slice(0, 10);

  // dataChart.push({
  //   label: dayjs(dayjs.unix()).format("h A"),
  //   value: fromTerraAmount(price, "0.000000"),
  // });

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
                value: `${fromTerraAmount(price, "0.000")} UST`,
              },
              {
                label: "Market Cap",
                value: `${fromTerraAmount(marketCap, "0,0")} UST`,
              },
              {
                label: "Circulating Supply",
                value: `${fromTerraAmount(circSupply, "0,0")} WHALE`,
              },
            ]}
            data={dataChart}
          />
        </GridItem>
        <GridItem colSpan={12}>
          <TVL />
        </GridItem>
      </Grid>
      {/* <Heading color="#fff" size="lg" mb="6" mt="24">
        Transaction History
      </Heading>
      <Box>
        <TransactionListCard />
      </Box> */}
    </Box>
  );
};

export default MyPage;
