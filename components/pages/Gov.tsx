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

import { useGovStaked, useGovTotalStaked, useGovGetPolls } from "modules/govern";
import { useWhalePrice } from "hooks/useWhalePrice";
import { formatAmount } from "libs/terra";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import CustomCardPoll from "components/governance/CustomCardPoll";
import Warchest from "components/governance/Warchest";
import CardLine from "components/governance/CardLine";
import LineChart from "components/LineChart";
import UnstakeModal from "components/governance/UnstakeModal";
import StakeModal from "components/governance/StakeModal";
import CommunityFund from "components/governance/CommunityFund";

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
  const polls = useGovGetPolls();

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
          <Text fontSize="xl" mb="4" fontWeight="bold">
            WHALE
          </Text>
          <SimpleStat
            value={formatAmount(price, "0.0000")}
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
