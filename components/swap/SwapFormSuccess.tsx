import React, { FC, useMemo } from "react";
import { Flex, Heading, Text, Box, Link, Button, Image } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useTokenInfo } from "@arthuryeti/terraswap";
import useContracts from "hooks/useContracts";
import { Stack, HStack, VStack } from '@chakra-ui/react'

import { truncate } from "libs/text";
import useFinder from "hooks/useFinder";

type Props = {
  txInfo: any;
  onClick: () => void;
};

const SwapFormSuccess: FC<Props> = ({ txInfo, onClick }) => {
  const finder = useFinder();
  const { getIcon, getSymbol } = useTokenInfo();
  // const { return_amount, offer_amount, offer_asset, ask_asset } =
  //   txInfo.logs[0].eventsByType.wasm;
  const { txhash } = txInfo;
  const { ustVault, whaleToken } = useContracts();

  const { return_amount, offer_amount, offer_asset, ask_asset } = useMemo(() => {
    const [log1, log2] = txInfo.logs

    if (!log2) {
      const { return_amount, offer_amount, offer_asset, ask_asset } = log1?.eventsByType.wasm;
      return ({ return_amount, offer_amount, offer_asset, ask_asset })
    }

    const [offer_asset] = log1?.eventsByType.wasm?.contract_address

    if (offer_asset === ustVault) {
      const { return_amount, } = log2?.eventsByType.wasm;
      const [offer_amount] = log1?.eventsByType.wasm['Received funds:'] || [];
      const [ask_asset] = log2?.eventsByType.wasm?.contract_address.reverse()
      return ({ return_amount, offer_amount : offer_amount.replace('uusd',''), offer_asset : 'uusd', ask_asset })
    }

    if (offer_asset === whaleToken) {
      const { offer_amount, offer_asset } = log1?.eventsByType.wasm;
      const [return_amount] = log2?.eventsByType.wasm.redeem_amount
      const ask_asset = 'uusd'
      return ({ return_amount, offer_amount, offer_asset, ask_asset })
    }

    return {}

  }, [txInfo, ustVault, whaleToken])


  return (
    <Flex flexDir="column" align="center" w="full" py="10">
      <Heading fontSize="2xl" mt="8">
        Receipt
      </Heading>

      <Box w="80%" fontSize="xl" mt="12">
        <Flex justify="space-between">
          <Text fontColor="whiteAlpha.200">Sent</Text>
          <HStack spacing='24px'>
            <Text fontWeight="bold">
              {fromTerraAmount(offer_amount, "0,0.00")}
            </Text>
            <Image src={getIcon(offer_asset)} width="1.5rem" alt={getSymbol(offer_asset)} />
          </HStack>

        </Flex>
        <Flex justify="space-between" mt="6">
          <Text fontColor="whiteAlpha.200">Received</Text>
          <HStack spacing='24px'>
            <Text fontWeight="bold">
              {fromTerraAmount(return_amount, "0,0.00")}
            </Text>
            <Image src={getIcon(ask_asset)} width="1.5rem" alt={getSymbol(ask_asset)} />
          </HStack>
        </Flex>
        <Flex justify="space-between" mt="6">
          <Text fontColor="whiteAlpha.200">Tx Hash</Text>
          <Link fontWeight="bold" href={finder(txhash, "tx")} target="_blank">
            {truncate(txhash)}
          </Link>
        </Flex>
      </Box>

      <Button type="button" variant="primary" onClick={onClick} mt="12" px="10">
        Close
      </Button>
    </Flex>
  );
};

export default SwapFormSuccess;
