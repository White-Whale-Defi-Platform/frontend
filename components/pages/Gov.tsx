import React from "react";
import {
  Box,
  Heading,
  Flex,
  Divider,
  Center,
  HStack,
  Text,
  Select,
  Tag,
  Stack,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { NextPage } from "next";
import Card from "components/Card";
import BarChart from "components/BarChart";

import SimpleStat from "components/SimpleStat";
import CustomCardPoll from "components/governance/CustomCardPoll";
import UnstakeModal from "components/governance/UnstakeModal";
import {
  useGovStakable,
  useGovStaked,
  useGovTotalStaked,
} from "modules/govern";
import StakeModal from "components/governance/StakeModal";
import { format } from "libs/parse";

const CustomChevronDownIcon = () => {
  return (
    <Flex opacity="0.33">
      <ChevronDownIcon />
    </Flex>
  );
};

const data = [
  {
    label: "WHALE",
    color: "#3CCD64",
    value: 0.8,
    valueCount: "87M",
  },
  {
    label: "UST",
    color: "rgba(58, 58, 58, 0.5);",
    value: 0.2,
    valueCount: "80MM",
  },
];

const Gov: NextPage = () => {
  const totalStakedAmount = useGovTotalStaked();
  const stakedAmount = useGovStaked();
  const stakableAmount = useGovStakable();

  return (
    <Box mt="16" mx="auto" maxW="container.xl">
      <Heading color="#fff" size="lg" mb="10">
        Governance
      </Heading>
      <Flex
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "column", md: "row" }}
      >
        <Box flex="1" pr={{ base: "0", sm: "0", md: "4" }}>
          <Card h="full" flex="1">
            <Flex h="full" justifyContent="space-between" flexDir="column">
              <Flex align="center">
                <Box>
                  <HStack spacing="4" mb="4">
                    <Text fontSize="xl">WHALE</Text>
                    <Tag size="sm" color="white" bg="#3CCD64">
                      --
                    </Tag>
                  </HStack>
                  {/* <Text color="brand.500" fontSize='2xl' fontWeight='700'> 1.001 UST </Text> */}
                  <SimpleStat
                    value="1.001"
                    asset="UST"
                    fontSizeValue="2xl"
                    fontSizeAsset="xl"
                  />
                </Box>
                <Center h="102px" p="0px 37px">
                  <Divider
                    orientation="vertical"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  />
                </Center>
                <Box>
                  <Text fontSize="xl" mb="4">
                    APR
                  </Text>
                  <Text
                    color="brand.500"
                    fontSize="2xl"
                    fontWeight="700"
                    lineHeight="1"
                  >
                    --
                  </Text>
                </Box>
                <Center
                  h="102px"
                  p="0px 37px"
                  display={{ base: "none", sm: "none", md: "initial" }}
                >
                  <Divider
                    orientation="vertical"
                    borderColor="rgba(255, 255, 255, 0.1)"
                  />
                </Center>
                <Box display={{ base: "none", sm: "none", md: "initial" }}>
                  <Text fontSize="xl" mb="4">
                    Total Staked
                  </Text>
                  <SimpleStat
                    value={format(totalStakedAmount)}
                    asset="WHALE"
                    fontSizeValue="2xl"
                    fontSizeAsset="xl"
                  />
                </Box>
              </Flex>
              <Box py="6">
                <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              </Box>

              {/* Responsive part  */}
              <Box display={{ base: "block", sm: "block", md: "none" }}>
                <Text fontSize="xl" mb="4">
                  Total Staked
                </Text>
                <SimpleStat
                  value={format(totalStakedAmount)}
                  asset="WHALE"
                  fontSizeValue="2xl"
                  fontSizeAsset="xl"
                />
              </Box>
              {/* Responsive part */}

              <Box display={{ base: "none", sm: "none", md: "block" }}>
                <HStack spacing="3">
                  <Box boxSize="6" bg="#2A2C2B" borderRadius="full" />
                  <Text fontSize="lg">Initial Supply</Text>
                  <HStack align="baseline" color="brand.200" spacing="1">
                    <Text fontSize="lg" fontWeight="700">
                      --
                    </Text>
                    <Text fontSize="xs" color="#8b8b8c">
                      WHALE
                    </Text>
                  </HStack>
                </HStack>
                <HStack spacing="3" mt="16px">
                  <Box boxSize="6" bg="brand.500" borderRadius="full" />
                  <Text fontSize="lg">Current Supply</Text>
                  <HStack align="baseline" color="brand.200" spacing="1">
                    <Text fontSize="lg" fontWeight="700">
                      --
                    </Text>
                    <Text fontSize="xs" color="#8b8b8c">
                      WHALE
                    </Text>
                  </HStack>
                </HStack>
                <Box mt="8">
                  <BarChart data={data} />
                </Box>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Flex
          flexDir="column"
          pt={{ base: "12", sm: "12", md: "initial" }}
          flex="1"
          pl={{ base: "0", sm: "0", md: "4" }}
        >
          <Card>
            <Flex
              justify="space-between"
              flexDir={{ base: "column", sm: "column", md: "row" }}
            >
              <Box>
                <Text fontSize="xl" mb="4" whiteSpace="nowrap">
                  Governance Vault
                </Text>
                <SimpleStat
                  value="--"
                  asset="UST"
                  fontSizeValue="2xl"
                  fontSizeAsset="md"
                />
              </Box>
              <Center
                h="24"
                px="6"
                display={{ base: "none", sm: "none", md: "initial" }}
              >
                <Divider
                  orientation="vertical"
                  borderColor="rgba(255, 255, 255, 0.1)"
                />
              </Center>

              <Box
                py="6"
                display={{ base: "initial", sm: "initial", md: "none" }}
              >
                <Divider borderColor="rgba(255, 255, 255, 0.1)" />
              </Box>

              <Box flex="1">
                <Flex justifyContent="space-between" align="center" mb="3">
                  <Text
                    bg="#2A2C2B"
                    px="3"
                    py="1"
                    borderRadius="full"
                    minW="24"
                    textAlign="center"
                    mr="3"
                  >
                    Staked
                  </Text>
                  <Box flex="1">
                    <SimpleStat
                      value={format(stakedAmount)}
                      asset="WHALE"
                      fontSizeValue="xl"
                      fontSizeAsset="xs"
                    />
                  </Box>
                  <UnstakeModal />
                </Flex>
                <Flex justifyContent="space-between" align="center">
                  <Text
                    bg="#2A2C2B"
                    px="3"
                    py="1"
                    borderRadius="full"
                    minW="24"
                    textAlign="center"
                    mr="3"
                  >
                    Stakable
                  </Text>
                  <Box flex="1">
                    <SimpleStat
                      value={format(stakableAmount)}
                      asset="WHALE"
                      fontSizeValue="xl"
                      fontSizeAsset="xs"
                    />
                  </Box>
                  <StakeModal />
                </Flex>
              </Box>
            </Flex>
          </Card>
          <Card
            mt="30"
            padding="30px 29px"
            display={{ base: "none", sm: "none", md: "initial" }}
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="xl" mb="4" whiteSpace="nowrap">
                  Burn Vault
                </Text>
                <SimpleStat
                  value="--"
                  asset="UST"
                  fontSizeValue="2xl"
                  fontSizeAsset="md"
                />
              </Box>
              <Center h="24" px="6">
                <Divider
                  orientation="vertical"
                  borderColor="rgba(255, 255, 255, 0.1)"
                />
              </Center>
              <Box flex="1">
                <HStack justify="space-between" mb="4">
                  <Text
                    bg="#2A2C2B"
                    px="6"
                    py="1"
                    borderRadius="full"
                    whiteSpace="nowrap"
                  >
                    Total WHALE burned
                  </Text>
                  <SimpleStat
                    value="--"
                    asset="WHALE"
                    fontSizeValue="2xl"
                    fontSizeAsset="sm"
                  />
                </HStack>
                <HStack justify="space-between">
                  <Text
                    bg="#2A2C2B"
                    px="6"
                    py="1"
                    borderRadius="full"
                    whiteSpace="nowrap"
                  >
                    Burned in the last 24h
                  </Text>
                  <SimpleStat
                    value="--"
                    asset="WHALE"
                    fontSizeValue="2xl"
                    fontSizeAsset="sm"
                  />
                </HStack>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Flex>
      <Flex justifyContent="space-between" mt="24" mb="6">
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
