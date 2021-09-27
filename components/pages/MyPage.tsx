import { formatAmount, useTerra } from "@arthuryeti/terra";
import {
  Box,
  Heading,
  Flex,
  VStack,
  Grid,
  GridItem,
  Text,
  HStack,
  Center,
  Divider,
  Tag,
  Circle,
} from "@chakra-ui/react";
import { NextPage } from "next";

import { useTokenPrice } from "modules/swap";
import contracts from "constants/contracts.json";

import SimpleStat from "components/SimpleStat";
import MyAssets from "components/myPage/MyAssets";
import Card from "components/Card";
import CardTitle from "components/CardTitle";
import LineChart from "components/LineChart";
import PieChart from "components/PieChart";
import LineGraphCard from "components/myPage/LineGraphCard";
import PieGraphCard from "components/myPage/PieGraphCard";

const dataChart = [
  {
    name: "Apr",
    value: 1.32,
  },
  {
    name: "May",
    value: 4.12,
  },
  {
    name: "Jun",
    value: 2.22,
  },
  {
    name: "Jul",
    value: 3.22,
  },
  {
    name: "Aug",
    value: 1.22,
  },
  {
    name: "Sep",
    value: 7.22,
  },
  {
    name: "Sep",
    value: 7.255,
  },
];

const data = [
  {
    label: "Arb Vault",
    value: 389900091,
    color: "#3CCD64",
  },
  {
    label: "War chest",
    value: 201000001,
    color: "#2C8D47",
  },
];

const MyPage: NextPage = () => {
  const {
    networkInfo: { name },
  } = useTerra();

  const price = useTokenPrice(contracts[name].whaleToken);

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
              { label: "WHALE", value: `${formatAmount(price)} UST` },
              { label: "Market Cap", value: "--" },
              { label: "Circulating Supply", value: "--" },
            ]}
            data={dataChart}
          />
        </GridItem>
        <GridItem colSpan={7}>
          <LineGraphCard
            cells={[
              { label: "Community Fund", value: "-- UST" },
              { label: "Total UST", value: "--" },
              { label: "Total WHALE", value: "--" },
            ]}
            data={dataChart}
          />
        </GridItem>
        <GridItem colSpan={5}>
          <PieGraphCard
            title="Total Value Locked"
            value="--"
            asset="UST"
            data={data}
          />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default MyPage;
