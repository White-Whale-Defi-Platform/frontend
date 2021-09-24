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
    label: "Jan",
    value: 0.22,
    color: "#3CCD64",
  },
  {
    label: "Feb",
    value: 0.39,
    color: "#2C8D47",
  },
  {
    label: "Apr",
    value: 0.1,
    color: "#444E46",
  },
  {
    label: "May",
    value: 0.29,
    color: "#3CCD64",
  },
];

const Gov: NextPage = () => {
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
        <GridItem colSpan={7}>
          <MyAssets />
        </GridItem>

        <GridItem colSpan={5}>
          <Card flex="1">
            <CardTitle label="Burn Vault" />
            <Flex justifyContent="space-between" mt="2">
              <Text>Total WHALE burned</Text>
              <SimpleStat
                value="359,426 "
                asset="WHALE"
                fontSizeValue="xl"
                fontSizeAsset="xl"
              />
            </Flex>
            <Box py="2">
              <Divider borderColor="rgba(255, 255, 255, 0.1)" />
            </Box>
            <Flex justifyContent="space-between">
              <Text>WHALE burned in the last 24h</Text>
              <SimpleStat
                value="37,526"
                asset="WHALE"
                fontSizeValue="xl"
                fontSizeAsset="xl"
              />
            </Flex>
            <Box height="150" mt="12">
              <LineChart data={dataChart} />
            </Box>
          </Card>
        </GridItem>
        <GridItem colSpan={4}>
          <Card>
            <CardTitle label="Total Value Locked" value="--" asset="UST" />

            <Flex mt="8">
              <Box h="175" pr="4" flex="1">
                <PieChart data={data} innerRadius={55} outerRadius={75} />
              </Box>

              <VStack justifyContent="center" spacing="6" flex="1">
                <Box>
                  <HStack spacing="2">
                    <Circle size="18" bgColor="#194325" />
                    <Text whiteSpace="nowrap">Arb Vaults</Text>
                  </HStack>
                  <Text color="#8b8b8c" fontWeight="700">
                    100,350,892 UST
                  </Text>
                </Box>

                <Box>
                  <HStack spacing="2">
                    <Circle size="18" bgColor="#3CCD64" />
                    <Text>Arb Vaults</Text>
                  </HStack>
                  <Text color="#8b8b8c" fontWeight="700" whiteSpace="nowrap">
                    100,350,892 UST
                  </Text>
                </Box>
              </VStack>
            </Flex>
          </Card>
        </GridItem>
        <GridItem colSpan={8}>
          <Card>
            <Flex align="center">
              <Box>
                <Text fontSize="xl" fontWeight="bold" mb="4">
                  WHALE
                </Text>
                <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                  {formatAmount(price)} UST
                </Text>
              </Box>
              <Center h="16" px="12">
                <Divider
                  orientation="vertical"
                  borderColor="rgba(255, 255, 255, 0.1)"
                />
              </Center>
              <Box>
                <Text fontSize="xl" fontWeight="bold" mb="4">
                  Market Cap
                </Text>
                <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                  --
                </Text>
              </Box>
              <Center h="16" px="12">
                <Divider
                  orientation="vertical"
                  borderColor="rgba(255, 255, 255, 0.1)"
                />
              </Center>
              <Box>
                <Text fontSize="xl" mb="4" fontWeight="bold">
                  Circulating Supply
                </Text>
                <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                  --
                </Text>
              </Box>
            </Flex>
            <Box height="150" mt="12">
              <LineChart data={dataChart} />
            </Box>
          </Card>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Gov;
