import React, { FC } from "react";
import { Box, HStack, Flex, Text, Image } from "@chakra-ui/react";

import Card from "components/Card";

type Props = {
  label: string;
  asset: string;
  apr: string;
  totalStaked: string;
};

const SwapStakingCard: FC<Props> = ({ label, asset, apr, totalStaked }) => {
  return (
    <Card
      w={{ base: "100%", sm: "100%", md: "auto" }}
      mb={{ base: "30px", sm: "30px", md: "auto" }}
    >
      <Flex alignItems="center" justifyContent="center">
        <Box
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0px 0px 50px rgba(0, 0, 0, 0.5);"
          borderRadius="full"
          marginRight="-6px"
          padding="7"
        >
          <Image src="/logo-small.svg" alt="logo-small" boxSize="3rem" />
        </Box>
        <Box
          border="2px solid rgba(255, 255, 255, 0.1);"
          borderRadius="77px"
          marginLeft="-8px"
          padding="7"
        >
          <Image src="/ust.png" alt="ust" boxSize="3rem" />
        </Box>
      </Flex>
      <Text mt="30px" textAlign="center" fontWeight="700" fontSize="xl">
        {label}
      </Text>
      <Text mt="12px" textAlign="center" fontWeight="400" fontSize="m">
        {asset}
      </Text>
      <HStack
        spacing="22px"
        mt="36px"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Text
            bg="rgba(255, 255, 255, 0.05);"
            fontSize="lg"
            borderRadius="full"
            px="4"
            py="1"
            mb="2"
          >
            APR
          </Text>
          <Text
            textAlign="center"
            color="brand.500"
            fontSize="xl"
            fontWeight="700"
          >
            {apr}
          </Text>
        </Box>
        <Box>
          <Text
            bg="rgba(255, 255, 255, 0.05);"
            fontSize="lg"
            borderRadius="full"
            px="4"
            py="1"
            mb="2"
          >
            Total Staked
          </Text>
          <Text
            textAlign="center"
            color="brand.500"
            fontSize="xl"
            fontWeight="700"
          >
            {totalStaked}
          </Text>
        </Box>
      </HStack>
    </Card>
  );
};

export default SwapStakingCard;
