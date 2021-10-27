import React, { FC } from "react";
import { Box, Button, HStack, Flex, Text, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import Card from "components/Card";
import ProvideModal from "components/pool/ProvideModal";
import WithdrawModal from "components/pool/WithdrawModal";
import { usePool } from "modules/pool";

type Props = {
  label: string;
  asset: string;
  pairContract: string;
  lpTokenContract: string;
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

  return (
    <Card noPadding>
      <Flex
        flexDir="column"
        align="center"
        justify="center"
        bg="blackAlpha.400"
        py="6"
      >
        <HStack spacing="-5">
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

        <Text fontWeight="bold" fontSize="xl" mt="4" mb="2">
          {label}
        </Text>
        <Text>{asset}</Text>
      </Flex>

      <Box fontSize="xl" p="6">
        {/* <Flex justify="space-between" mb="4">
          <Text>APR</Text>
          <Text color="brand.500" fontWeight="700">
            0.00%
          </Text>
        </Flex> */}
        <Flex justify="space-between" mb="4">
          <Text>Total provided</Text>
          <Text color="brand.500" fontWeight="700">
            {fromTerraAmount(pool.totalShareInUST)} UST
          </Text>
        </Flex>
        <Flex justify="space-between" mb="4">
          <Text>Provided</Text>
          <Text color="brand.500" fontWeight="700">
            {fromTerraAmount(pool.myShareInUST)} UST
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Text>APY</Text>
          <Text color="brand.500" fontWeight="700">
            --
          </Text>
        </Flex>
        <Box mt="6">
          <WithdrawModal
            pairContract={pairContract}
            lpTokenContract={lpTokenContract}
          />
        </Box>
        <Box mt="4">
          <ProvideModal pool={pool} pairContract={pairContract} />
        </Box>
      </Box>
    </Card>
  );
};

export default PoolItem;
