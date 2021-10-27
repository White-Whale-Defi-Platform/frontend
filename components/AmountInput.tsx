import React, { FC } from "react";
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  Flex,
  HStack,
  Divider,
  forwardRef,
  Image,
} from "@chakra-ui/react";
import { fromTerraAmount, num } from "@arthuryeti/terra";
import { useTokenInfo } from "@arthuryeti/terraswap";

import { formatAsset } from "libs/parse";
import { div } from "libs/math";
import { ONE_TOKEN } from "constants/constants";

import AmountMaxButton from "components/AmountMaxButton";
import Balance from "components/Balance";

type Props = {
  onChange: any;
  onBlur: any;
  initialBalance?: string;
  isMaxDisabled?: boolean;
  hideBalance?: boolean;
  value: {
    amount: string;
    asset: string;
  };
};

const AmountInput: FC<Props> = forwardRef(
  (
    {
      onChange,
      onBlur,
      value,
      initialBalance,
      isMaxDisabled = false,
      hideBalance = false,
      ...field
    },
    ref
  ) => {
    const { getIcon, getSymbol } = useTokenInfo();
    const icon = getIcon(value.asset);
    const symbol = getSymbol(value.asset);
    const max = num(initialBalance).gt("0")
      ? div(initialBalance, ONE_TOKEN)
      : null;

    return (
      <Box ref={ref}>
        {!hideBalance && (
          <Box mb="2">
            {initialBalance == null && <Balance asset={value.asset} />}
            {initialBalance != null && (
              <Text ml="6">
                <Text as="span" variant="light">
                  Available:
                </Text>{" "}
                <Text as="span" fontSize="sm" fontWeight="500">
                  {fromTerraAmount(initialBalance, "0.000")}
                </Text>
              </Text>
            )}
          </Box>
        )}
        <Box position="relative">
          <NumberInput
            variant="brand"
            size="lg"
            value={value.amount}
            onChange={(a) => onChange({ ...value, amount: a })}
            onBlur={onBlur}
            {...field}
          >
            <NumberInputField placeholder="0.0" />
          </NumberInput>
          <Flex
            position="absolute"
            height="100%"
            right="0"
            top="0"
            justify="center"
            px="6"
          >
            <HStack spacing="4">
              {!isMaxDisabled && (
                <Box>
                  <AmountMaxButton
                    asset={value.asset}
                    max={max}
                    onChange={(v: string) => onChange({ ...value, amount: v })}
                  />
                </Box>
              )}
              <Box py="2" height="full">
                <Divider orientation="vertical" borderColor="brand.600" />
              </Box>
              <HStack>
                <Text color="white" fontWeight="500">
                  {symbol}
                </Text>
                <Image src={icon} width="1.5rem" height="1.5rem" alt="Logo" />
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    );
  }
);

export default AmountInput;
