import React, { FC } from "react";
import { Box, Button, HStack, Flex, Text, Image } from "@chakra-ui/react";

import Card from "components/Card";
import UnstakeModal from "components/swap/UnstakeModal";
import StakeModal from "components/swap/StakeModal";

type Props = {
  label: string;
  asset: string;
  apr: string;
  totalStaked: string;
};

const PoolItem: FC<Props> = ({ label, asset }) => {
  return (
    <Card>
      <Flex justify="space-between" align="center">
        <HStack spacing="6">
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
          <Box color="white">
            <Text fontWeight="bold" fontSize="xl" mb="2">
              {label}
            </Text>
            <Text>{asset}</Text>
          </Box>
        </HStack>

        <HStack spacing="24" fontSize="xl">
          <HStack spacing="12">
            <Text>APR</Text>
            <Text color="brand.500" fontWeight="700">
              0.00%
            </Text>
          </HStack>
          <HStack spacing="12">
            <Text>Total Staked</Text>
            <Text color="brand.500" fontWeight="700">
              0.00%
            </Text>
          </HStack>
        </HStack>

        <Flex>
          <Box mr="4">
            {/* @ts-expect-error */}
            <UnstakeModal />
          </Box>
          {/* @ts-expect-error */}
          <StakeModal />
        </Flex>
      </Flex>
    </Card>
  );
};

export default PoolItem;
