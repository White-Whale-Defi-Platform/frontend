import {
  Box,
  Heading,
  Flex,
  Button,
  Text,
  HStack,
  Center,
  Divider,
  Tag,
} from "@chakra-ui/react";
import SimpleStat from "components/SimpleStat";
import AssetLine from "components/myPage/AssetLine";

import Card from "components/Card";
import LineChart from "components/LineChart";
import { NextPage } from "next";
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

const assets = [
  {
    color: "#3CCD64",
    label: "Total Holdings",
    value: "87M",
    asset: "UST",
  },
  {
    color: "#2C8D47",
    label: "Arb Vault holdings",
    value: "32M",
    asset: "UST",
  },
  {
    color: "#194325",
    label: "War Chest",
    value: "8M",
    asset: "UST",
  },
  {
    color: "#111111",
    label: "LP holding",
    value: "12M",
    asset: "UST",
  },
  {
    color: "#444E46",
    label: "Gov Staked",
    value: "2M",
    asset: "UST",
  },
  {
    color: "#F1F1F1",
    label: "Liquid UST",
    value: "12M",
    asset: "UST",
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
  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Flex justifyContent="space-between" mb="10">
        <Heading color="#fff" size="lg">
          My Page
        </Heading>
      </Flex>
      <Flex justifyContent="space-between" gridGap="12">
        <Card flex="1">
          <Flex justify="space-between" gridGap="8">
            <Box flex="1">
              <Text mb="6" fontSize="xl">
                Total Value
              </Text>
              <SimpleStat
                value="--"
                asset="UST"
                fontSizeValue="2xl"
                fontSizeAsset="md"
              />
              <Box h="200px" mt="6">
                <PieChart data={data} />
              </Box>
            </Box>
            <Box flex="2">
              <Text mb="6" fontSize="large">
                Assets
              </Text>
              {assets.map((item) => (
                <Box key={item.asset}>
                  <AssetLine data={item} />
                </Box>
              ))}
            </Box>
          </Flex>
        </Card>

        <Card flex="1">
          <HStack>
            <Box>
              <HStack mb="4">
                <Text fontSize="xl" fontWeight="700" pr="6">
                  WHALE
                </Text>
                <Tag size="sm" color="white" bg="#3CCD64">
                  +4.69%
                </Tag>
              </HStack>
              <SimpleStat
                value="--"
                asset="UST"
                fontSizeValue="2xl"
                fontSizeAsset="md"
              />
            </Box>
          </HStack>
          <Box height="230px" mt="8">
            <LineChart data={dataChart} />
          </Box>
        </Card>
      </Flex>
    </Box>
  );
};

export default Gov;
