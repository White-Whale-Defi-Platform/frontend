import React from "react";
import { formatAmount, useTerra } from "@arthuryeti/terra";
import {
  Box,
  Divider,
  Heading,
  Flex,
  HStack,
  Text,
  Select,
  Tag,
  Stack,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { NextPage } from "next";
import Card from "components/Card";

import contracts from "constants/contracts.json";
import { useTokenPrice } from "modules/swap";

import SimpleStat from "components/SimpleStat";
import CustomCardPoll from "components/governance/CustomCardPoll";
import AssetLine from "components/myPage/AssetLine";
import PieChart from "components/PieChart";
import CardLine from "components/governance/CardLine";
import LineChart from "components/LineChart";
import UnstakeModal from "components/governance/UnstakeModal";
import StakeModal from "components/governance/StakeModal";
import {
  useGovStakable,
  useGovStaked,
  useGovTotalStaked,
} from "modules/govern";

const dataPie = [
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
    color: "#FFDD4D",
    label: "LUNA",
    value: "32M",
    asset: "UST",
  },
  {
    color: "#3CCD64",
    label: "WHALE",
    value: "8M",
    asset: "UST",
  },
  {
    color: "#2E78E9",
    label: "UST",
    value: "12M",
    asset: "UST",
  },
  {
    color: "#525252",
    label: "Others",
    value: "12M",
    asset: "UST",
  },
];

const CustomChevronDownIcon = () => {
  return (
    <Flex opacity="0.33">
      <ChevronDownIcon />
    </Flex>
  );
};

const Gov: NextPage = () => {
  const {
    networkInfo: { name },
  } = useTerra();
  const totalStakedAmount = useGovTotalStaked();
  const stakedAmount = useGovStaked();
  const price = useTokenPrice(contracts[name].whaleToken);

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Governance
      </Heading>

      <Flex justify="space-between" gridGap="12">
        <Card flex="2" noPadding>
          <Flex justify="space-between">
            <Box p="8" bg="blackAlpha.400" flex="1">
              <Flex justify="space-between" align="center" mb="6">
                <HStack spacing="4">
                  <Image
                    src="/warChest.png"
                    alt="War Chest"
                    boxSize="2.25rem"
                  />
                  <Text color="#fff" fontSize="xl" fontWeight="700">
                    War Chest
                  </Text>
                </HStack>
                <SimpleStat
                  value="54.06"
                  asset="UST"
                  fontSizeValue="2xl"
                  fontSizeAsset="xl"
                />
              </Flex>

              <Flex>
                <Box flex="1">
                  {assets.map((item) => (
                    <AssetLine key={item.asset} data={item} />
                  ))}
                </Box>

                <Box h="150" w="155px" pl="8">
                  <PieChart data={dataPie} innerRadius={45} outerRadius={60} />
                </Box>
              </Flex>
            </Box>

            <Box p="8" flex="1">
              <Box>
                <CardLine value="18.2" asset="%" label="APY" />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine value="0.21" asset="%" label="Daily Yield" />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine
                  value={formatAmount(totalStakedAmount)}
                  asset="WHALE"
                  label="Total Deposits"
                />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine
                  value={formatAmount(stakedAmount)}
                  asset="WHALE"
                  label="My Deposit"
                />
              </Box>
              <HStack mt="5">
                <UnstakeModal />
                <StakeModal />
              </HStack>
            </Box>
          </Flex>
        </Card>

        <Card flex="1">
          <Text fontSize="xl" mb="4">
            WHALE
          </Text>
          <SimpleStat
            value={formatAmount(price)}
            asset="UST"
            fontSizeValue="2xl"
            fontSizeAsset="xl"
          />
          <Box height="120" mt="12">
            <LineChart data={dataChart} />
          </Box>
        </Card>
      </Flex>

      <Flex justify="space-between" mt="24" mb="6">
        <Heading color="#fff" size="lg">
          Polls
        </Heading>
        <HStack>
          <Box
            w="208px"
            mr="19px"
            border="2px solid rgba(255, 255, 255, 0.1)"
            borderRadius="77px"
            display={{ base: "none", sm: "none", md: "initial" }}
          >
            <Select
              placeholder="All"
              color="#FFF"
              border="none"
              focusBorderColor="none"
              size="sm"
              icon={<CustomChevronDownIcon />}
            >
              <option value="option1">All</option>
            </Select>
          </Box>
          <Box
            as="button"
            mr="17px"
            borderRadius="full"
            color="white"
            border="1px solid #fff"
            alignSelf="center"
            padding="2px 20px"
          >
            <Text>Forum</Text>
          </Box>
          <Box
            as="button"
            mr="17px"
            borderRadius="full"
            color="white"
            border="1px solid #fff"
            alignSelf="center"
            padding="2px 20px"
          >
            <Text>Create Poll</Text>
          </Box>
        </HStack>
      </Flex>
      <Card>
        <Stack
          direction={{ base: "column", sm: "column", md: "row" }}
          spacing="44px"
        >
          <Box w="100%">
            <CustomCardPoll
              number="1"
              status="In progress"
              information="Adjust bot parameters"
              endTime="Wed, Aug 08, 15:40 PM"
            />
          </Box>
          <Box w="100%">
            <CustomCardPoll
              number="2"
              status="In progress"
              information="Burn Whale tokens"
              endTime="Wed, Aug 04, 19:20 PM"
            />
          </Box>
        </Stack>
      </Card>
    </Box>
  );
};

export default Gov;
