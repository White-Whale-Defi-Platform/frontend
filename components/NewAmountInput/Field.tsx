import React, { FC } from "react";
import {
  Box,
  Flex,
  forwardRef,
  Divider,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { useBalance, fromTerraAmount } from "@arthuryeti/terra";

import { Balance, Input } from "components/NewAmountInput";
import AmountMaxButton from "components/AmountMaxButton";

type Props = {
  asset: string;
  onBlur: any;
  onChange: any;
  hideLabel?: boolean;
  hideBalanceLabel?: boolean;
  balance?: string;
  balanceLabel?: string;
  isLpToken?: boolean;
  isSingle?: boolean;
  isDisabled?: boolean;
  hideMaxButton?: boolean;
  value: string;
  max?: number;
};

const Field: FC<Props> = forwardRef(
  (
    {
      asset,
      onChange,
      onBlur,
      value,
      max,
      balance,
      balanceLabel,
      hideBalanceLabel = false,
      hideMaxButton = false,
      isDisabled = false,
    },
    ref
  ) => {
    const { getSymbol, getIcon } = useTokenInfo();
    const max2 = fromTerraAmount(useBalance(asset), "0,0.00");

    return (
      <Box ref={ref}>
        <Box mb="2" ml="6">
          <Balance
            asset={asset}
            initial={balance}
            label={balanceLabel}
            hideLabel={hideBalanceLabel}
          />
        </Box>
        <Box position="relative">
          <Input
            asset={asset}
            value={value}
            max={max}
            onChange={(v: string) => onChange(v)}
            onBlur={onBlur}
            isDisabled={isDisabled}
          />
          <Flex
            position="absolute"
            height="100%"
            right="0"
            top="0"
            justify="center"
            px="6"
          >
            <HStack spacing="4">
              {!hideMaxButton && (
                <Box>
                  <AmountMaxButton
                    asset={asset}
                    max={max ?? max2}
                    onChange={(v: string) => onChange(v)}
                  />
                </Box>
              )}
              <Box py="2" height="full">
                <Divider orientation="vertical" borderColor="brand.600" />
              </Box>
              <HStack>
                <Text color="white" fontWeight="500">
                  {getSymbol(asset)}
                </Text>
                <Image
                  src={getIcon(asset)}
                  width="1.5rem"
                  height="1.5rem"
                  alt="Logo"
                />
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    );
  }
);

export default Field;
