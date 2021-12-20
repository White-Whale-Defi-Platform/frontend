import React, { FC } from "react";
import { Box, HStack, Flex, Text, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import { usePool, usePoolApr } from "modules/pool";

import Card from "components/Card";
import ProvideModal from "components/pool/ProvideModal";
import StakeModal from "components/pool/StakeModal";
import ClaimPoolRewardModal from "components/pool/ClaimPoolRewardModal";

type Props = {
  label: string;
  asset: string;
  pairContract: string;
  lpTokenContract: string;
  stakingContract: string;
};

const PoolItem: FC<Props> = ({
  label,
  asset,
  pairContract,
  lpTokenContract,
}) => {
  const pool = usePool({
    pairContract,
    lpTokenContract,
  });

  console.log("pool", pool);

  // const apr = usePoolApr({
  //   pairContract,
  //   lpTokenContract,
  //   stakingContract,
  // });

  if (pool == null) {
    return null;
  }

  return (
    <Card noPadding h="full">
      <Flex flexDir="column" bg="blackAlpha.400" h="full">
        <Flex
          flexDir="column"
          align="center"
          justify="center"
          bg="blackAlpha.400"
          py="6"
          flex="1"
        >
          <HStack spacing="-5" mb="8">
            <Box
              bg="#252525"
              boxShadow="xl"
              borderRadius="full"
              p="4"
              position="relative"
              zIndex="2"
            >
              <Image src="/logo-small.svg" alt="logo-small" boxSize="2.5rem" />
            </Box>
            <Box
              border="2px solid rgba(255, 255, 255, 0.1);"
              borderRadius="full"
              p="3"
            >
              <Image src="/ust.png" alt="ust" boxSize="2.5rem" />
            </Box>
          </HStack>

          <Text fontWeight="bold" fontSize="xl">
            {label}
          </Text>
          <Text>{asset}</Text>
        </Flex>

        <Box fontSize="xl" p="6">
          {/* <Flex justify="space-between" mb="4">
            <Text>APR</Text>
            <Text color="brand.500" fontWeight="700">
              8,89%
            </Text>
          </Flex> */}
          <Flex justify="space-between" mb="4">
            <Text>Liquidity</Text>
            <Text color="brand.500" fontWeight="700">
              {fromTerraAmount(pool.total.shareInUst)} UST
            </Text>
          </Flex>
          <Flex justify="space-between" mb="4">
            <Text>My Liquidity</Text>
            <Text color="brand.500" fontWeight="700">
              {fromTerraAmount(pool.mine.shareInUST)} UST
            </Text>
          </Flex>
          {/* <Flex justify="space-between" mb="4">
          <Text>My Staked</Text>
          <Text color="brand.500" fontWeight="700">
            {fromTerraAmount(pool.myShareInUST)} UST
          </Text>
        </Flex> */}
          {/* <Flex justify="space-between" mb="4">
            <Text>APR</Text>
            <Text color="brand.500" fontWeight="700">
              {apr}%
            </Text>
          </Flex> */}
          {/* <Flex justify="space-between">
          <Text>My Rewards</Text>
          <Text color="brand.500" fontWeight="700">
            {fromTerraAmount(pool.rewards)} WHALE
          </Text>
        </Flex> */}
          <HStack mt="6">
            {/* <Box flex="1">
            <ClaimPoolRewardModal contract={stakingContract} />
          </Box> */}
            <Box flex="1">
              <ProvideModal
                pool={pool}
                lpTokenContract={lpTokenContract}
                pairContract={pairContract}
              />
            </Box>
            {/* <Box flex="1">
            <StakeModal lpTokenContract={lpTokenContract} />
          </Box> */}
          </HStack>
        </Box>
      </Flex>
    </Card>
  );
};

export default PoolItem;
