import React, { FC } from "react";
import { Box, Text, Flex, HStack, VStack, Link } from "@chakra-ui/react";

import ThumbsDownIcon from "components/icons/ThumbsDownIcon";
import ThumbsUpIcon from "components/icons/ThumbsUpIcon";
import { useMediaQuery } from '@chakra-ui/react'
import { truncate } from "libs/text";
import { ExternalLinkIcon } from '@chakra-ui/icons'

type Props = {
  trade: {
    txhash: String;
    timestamp: String;
    vaultName: String;
    arb_assets: String;
    profit: String;
  };
};

const VaultTrackerItem: FC<Props> = ({ trade }) => {

  const { txhash, timestamp, vaultName, profit, arb_assets, } = trade
  const [isMobile] = useMediaQuery('(max-width:480px)')

  if (isMobile)
    return (
      <>
        <Flex pb="2" flexDirection="column"
        >
          <VStack alignItems="start" borderBottom="1px solid" pb="2" mb="3" borderBottomColor="whiteAlpha.300">
            <Text variant="light" flex={1} size="lg" textTransform="capitalize"> TxHash </Text>
            <Link href='https://chakra-ui.com' isExternal color="brand.500" flex={1} size="lg" textTransform="capitalize" mt="unset">
              {txhash} <ExternalLinkIcon mx='4px' mb="4px" />
            </Link>
          </VStack>
          <VStack alignItems="start" borderBottom="1px solid" pb="2" mb="3" borderBottomColor="whiteAlpha.300">
            <Text variant="light" flex={1} size="lg" textTransform="capitalize"> Timestamp </Text>
            <Text color="#fff" flex={1} size="lg" textTransform="capitalize" mt="unset"> {timestamp} </Text>
          </VStack>
          <VStack >
            <HStack justify="space-between" width="100%">
              <Text variant="light" size="lg" flex="1" textTransform="capitalize"> Vault </Text>
              <Text variant="light" size="lg" flex="1" textTransform="capitalize">Arb Pair </Text>
              <Text variant="light" size="lg" flex="1" textAlign="end" textTransform="capitalize">Profit </Text>
            </HStack>
            <HStack justify="space-between" width="100%" mt="unset">
              <Text color="#fff" size="lg" flex="1" textTransform="capitalize" mt="unset"> {vaultName} </Text>
              <Text color="#fff" size="lg" flex="1" textTransform="capitalize" mt="unset"> {arb_assets} </Text>
              <Text color="#fff" size="lg" flex="1" textAlign="end" textTransform="capitalize" mt="unset"> {profit} </Text>
            </HStack>
          </VStack>
        </Flex>
      </>
    )

  return (
    <Flex borderBottom="1px solid" borderBottomColor="whiteAlpha.300" pb="2" mb="5">
      <Link href='https://chakra-ui.com' isExternal color="brand.500" flex={1} size="lg" textTransform="capitalize" mt="unset">
        {txhash} <ExternalLinkIcon mx='5px' mb="4px" />
      </Link>
      <Text color="#fff" flex={1} size="lg" textTransform="capitalize"> {timestamp} </Text>
      <Text color="#fff" flex={1} size="lg" textTransform="capitalize"> {vaultName} </Text>
      <Text color="#fff" flex={1} size="lg" textTransform="capitalize"> {arb_assets} </Text>
      <Text color="#fff" flex={1} textAlign="end" size="lg" textTransform="capitalize"> {profit} </Text>
    </Flex>
  );
};

export default VaultTrackerItem;
