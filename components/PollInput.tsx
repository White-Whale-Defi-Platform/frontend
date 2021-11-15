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
  Input,
  Textarea,
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

const PollInput: FC<Props> = forwardRef(
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
    // const { getIcon, getSymbol } = useTokenInfo();
    // const icon = getIcon(value.asset);
    // const symbol = getSymbol(value.asset);
    // const max = num(initialBalance).gt("0")
    //   ? div(initialBalance, ONE_TOKEN)
    //   : null;

    return (
      <Box ref={ref}>
        <Box mb="2">
          <Text mx="6" as="span" variant="light" color="white" fontSize="lg">
            Title
          </Text>{" "}
        </Box>
        <Box mb="2" position="relative">
          <Input
            size="lg"
            placeholder="Enter your title"
            _placeholder={{ color: "whiteAlpha.300" }}
            rounded="3xl"
            borderColor="rgba(255, 255, 255, 0.1)"
          ></Input>
        </Box>
        <Box mb="2">
          <Text ml="6">
            <Text as="span" variant="light" color="white" fontSize="lg">
              Description
            </Text>
          </Text>
        </Box>
        <Box mb="2" position="relative">
          <Input
            height="120px"
            size="lg"
            placeholder="Enter your description"
            _placeholder={{ color: "whiteAlpha.300" }}
            rounded="3xl"
            borderColor="rgba(255, 255, 255, 0.1)"
          ></Input>
        </Box>
      </Box>
    );
  }
);

export default PollInput;
