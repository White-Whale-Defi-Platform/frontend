import React, { FC } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { num, fromTerraAmount } from "@arthuryeti/terra";
import { Controller } from "react-hook-form";

import InlineStat from "components/InlineStat";
import SwapFormSlippage from "components/swap/SwapFormSlippage";
import { useFeeToString } from "hooks/useFeeToString";

type Props = {
  token1: string;
  token2: string;
  exchangeRate: string;
  minimumReceive: string;
  slippage: string;
  control: any;
  fee: any;
};

const SwapFormInfos: FC<Props> = ({
  token1,
  token2,
  exchangeRate,
  minimumReceive,
  slippage,
  control,
  fee,
}) => {
  const feeString = useFeeToString(fee);
  const { getSymbol } = useTokenInfo();
  const token1Symbol = getSymbol(token1);
  const token2Symbol = getSymbol(token2);

  return (
    <>
      <HStack mb="4" spacing="0">
        <InlineStat label="Slippage" value="" />
        <Controller
          name="slippage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <SwapFormSlippage {...field} />}
        />
      </HStack>
      <Box mb="4">
        <InlineStat
          label="Rate"
          value={exchangeRate}
          name={`${token1Symbol}`}
          tooltip="Swap price is calculated based on the pool price and spread"
        />
      </Box>
      <Box mb="4">
        <InlineStat
          label="Minimum Received"
          value={fromTerraAmount(minimumReceive, "0,0.0[00000]")}
          name={token2Symbol}
          tooltip="Expected minimum quantity to be received based on the current price, maximum spread, and trading fee"
        />
      </Box>
      <Box mb="6">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>
    </>
  );
};

export default SwapFormInfos;
