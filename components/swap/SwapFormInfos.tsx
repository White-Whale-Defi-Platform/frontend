import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { BN, fromTerraAmount } from "@arthuryeti/terra";

import InlineStat from "components/InlineStat";
import useFeeToString from "hooks/useFeeToString";

type Props = {
  token1: string;
  token2: string;
  exchangeRate: string;
  minimumReceive: string;
  slippage: string;
  onSlippageChange: (v: string) => void;
  fee: any;
};

const SwapFormInfos: FC<Props> = ({
  token1,
  token2,
  exchangeRate,
  minimumReceive,
  slippage,
  onSlippageChange,
  fee,
}) => {
  const feeString = useFeeToString(fee);
  const { getSymbol } = useTokenInfo();
  const token1Symbol = getSymbol(token1);
  const token2Symbol = getSymbol(token2);

  return (
    <>
      <Flex>
        <Box flex="1">
          <Box mb="4">
            <InlineStat
              label="Rate"
              value={exchangeRate}
              name={`${token1Symbol} per ${token2Symbol}`}
              tooltip="Swap price is calculated based on the pool price and spread"
            />
          </Box>
          <Box>
            <InlineStat
              label="Slippage"
              value={`${BN(slippage).times("100").toFixed(2)}%`}
            />
          </Box>
        </Box>
        <Box flex="1">
          <Box mb="4">
            <InlineStat
              label="Minimum Received"
              value={fromTerraAmount(minimumReceive, "0.000000")}
              name={token2Symbol}
              tooltip="Expected minimum quantity to be received based on the current price, maximum spread, and trading fee"
            />
          </Box>
          <Box>
            <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default SwapFormInfos;
