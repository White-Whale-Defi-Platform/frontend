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
import { useTokenInfo } from "@arthuryeti/terraswap";

import AmountMaxButton from "components/AmountMaxButton";
import Balance from "components/Balance";
import { lookupSymbol, formatAsset } from "libs/parse";
import { div } from "libs/math";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  onChange: any;
  onBlur: any;
  initialBalance?: string;
  value: {
    amount: string;
    asset: string;
  };
};

const AmountInput: FC<Props> = forwardRef(
  ({ onChange, onBlur, value, initialBalance, ...field }, ref) => {
    const { getIcon, getSymbol } = useTokenInfo();
    const icon = getIcon(value.asset);
    const symbol = getSymbol(value.asset);
    const max = initialBalance ? div(initialBalance, ONE_TOKEN) : null;

    return (
      <Box ref={ref}>
        <Box mb="2">
          {initialBalance == null && <Balance asset={value.asset} />}
          {initialBalance != null && (
            <Text>
              <Text as="span" variant="light">
                Balance:
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="500">
                {formatAsset(initialBalance, getSymbol(value.asset))}
              </Text>
            </Text>
          )}
        </Box>
        <Box position="relative">
          <NumberInput
            variant="brand"
            size="lg"
            precision={6}
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
              <Box>
                <AmountMaxButton
                  asset={value.asset}
                  max={max}
                  onChange={(v: string) => onChange({ ...value, amount: v })}
                />
              </Box>
              <Box py="2" height="full">
                <Divider orientation="vertical" borderColor="brand.600" />
              </Box>
              <HStack>
                <Image src={icon} width="1.5rem" height="1.5rem" alt="Logo" />
                <Text variant="light" fontWeight="500">
                  {symbol}
                </Text>
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    );
  }
);

export default AmountInput;
