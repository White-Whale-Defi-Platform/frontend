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
  chakra,
} from "@chakra-ui/react";
import numeral from "numeral";
import { useTokenInfo } from "@arthuryeti/terra";

import Balance from "components/Balance";
import { lookup, lookupSymbol, formatAsset } from "libs/parse";
import { useBalance } from "hooks/useBalance";

type Props = {
  onChange: any;
  onBlur: any;
  balance?: string;
  max?: string;
  value: {
    amount: string;
    asset: string;
  };
};

const AmountInput: FC<Props> = forwardRef(
  ({ onChange, onBlur, value, balance, max }, ref) => {
    const { getIcon, getSymbol } = useTokenInfo();
    const icon = getIcon(value.asset);
    const symbol = lookupSymbol(getSymbol(value.asset));
    const assetBalance = useBalance(value.asset);
    const initialMaxAmount = lookup(
      max || balance || assetBalance,
      value.asset
    );
    const amount = numeral(initialMaxAmount).value();

    return (
      <Box ref={ref}>
        <Box mb="2">
          {balance == null && <Balance asset={value.asset} />}
          {balance != null && (
            <Text>
              <Text as="span" variant="light">
                Balance:
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="500">
                {formatAsset(balance, getSymbol(value.asset))}
              </Text>
            </Text>
          )}
        </Box>
        <Box position="relative">
          <NumberInput
            variant="brand"
            size="lg"
            value={value.amount}
            onChange={(a) => onChange({ ...value, amount: a })}
            onBlur={onBlur}
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
              {amount > 0 && (
                <Box>
                  <chakra.button
                    type="button"
                    outline="none"
                    color="brand.500"
                    fontWeight="500"
                    onClick={() => onChange({ ...value, amount })}
                  >
                    Max
                  </chakra.button>
                </Box>
              )}
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
