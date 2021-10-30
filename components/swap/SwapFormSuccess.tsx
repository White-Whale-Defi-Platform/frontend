import React, { FC } from "react";
import { Flex, Heading, Text, Box, Link, Button } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useTokenInfo } from "@arthuryeti/terraswap";

import { truncate } from "libs/text";
import useFinder from "hooks/useFinder";

type Props = {
  txInfo: any;
  onClick: () => void;
};

const SwapFormSuccess: FC<Props> = ({ txInfo, onClick }) => {
  const finder = useFinder();
  const { getSymbol } = useTokenInfo();
  const { amount, offer_amount, offer_asset, ask_asset } =
    txInfo.logs[0].eventsByType.wasm;
  const { txhash } = txInfo;

  return (
    <Flex flexDir="column" align="center" w="full" py="10">
      <Heading fontSize="2xl" mt="8">
        Receipt
      </Heading>

      <Box w="80%" fontSize="xl" mt="12">
        <Flex justify="space-between">
          <Text fontColor="whiteAlpha.200">Sent</Text>
          <Text fontWeight="bold">
            {fromTerraAmount(offer_amount, "0,0.00")} {getSymbol(offer_asset)}
          </Text>
        </Flex>
        <Flex justify="space-between" mt="6">
          <Text fontColor="whiteAlpha.200">Received</Text>
          <Text fontWeight="bold">
            {fromTerraAmount(amount, "0,0.00")} {getSymbol(ask_asset)}
          </Text>
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
