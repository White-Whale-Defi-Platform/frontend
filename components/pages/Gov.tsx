import React from "react";
import {
  Box,
  Divider,
  Heading,
  Flex,
  HStack,
  Text,
  Select,
  Stack,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { NextPage } from "next";

import { useGovStaked, useGovTotalStaked } from "modules/govern";
import { useWhalePrice } from "hooks/useWhalePrice";
import { fromTerraAmount } from "libs/terra";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import CustomCardPoll from "components/gov/CustomCardPoll";
import Warchest from "components/gov/Warchest";
import Polls from "components/gov/Polls";
import CardLine from "components/gov/CardLine";
import LineChart from "components/LineChart";
import UnstakeModal from "components/gov/UnstakeModal";
import StakeModal from "components/gov/StakeModal";
import CommunityFund from "components/gov/CommunityFund";

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

const CustomChevronDownIcon = () => {
  return (
    <Flex opacity="0.33">
      <ChevronDownIcon />
    </Flex>
  );
};

const Gov: NextPage = () => {
  const totalStakedAmount = useGovTotalStaked();
  const stakedAmount = useGovStaked();
  const price = useWhalePrice();

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Governance
      </Heading>

      <Flex justify="space-between" gridGap="12">
        <Card flex="2" noPadding>
          <Flex justify="space-between" h="full">
            <Box p="8" bg="blackAlpha.400" flex="1.3" h="full">
              <Warchest />
            </Box>

            <Box p="8" flex="1">
              <Box>
                <CardLine value="--" asset="%" label="APY" />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine value="--" asset="%" label="Daily Yield" />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine
                  value={fromTerraAmount(totalStakedAmount)}
                  asset="WHALE"
                  label="Total Deposits"
                />
                <Box py="3">
                  <Divider borderColor="whiteAlpha.400" />
                </Box>
                <CardLine
                  value={fromTerraAmount(stakedAmount)}
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
          <Text fontSize="xl" mb="4" fontWeight="bold">
            WHALE
          </Text>
          <SimpleStat
            value={fromTerraAmount(price, "0,0.0[00000]")}
            asset="UST"
            fontSizeValue="2xl"
            fontSizeAsset="xl"
          />
          <Box height="150" mt="6">
            <LineChart data={dataChart} />
          </Box>
        </Card>
      </Flex>

      <CommunityFund />

      <Flex justify="space-between" mt="24" mb="6">
        <Heading color="#fff" size="lg">
          Polls
        </Heading>
        <HStack>
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
      <Polls />
    </Box>
  );
};

export default Gov;
