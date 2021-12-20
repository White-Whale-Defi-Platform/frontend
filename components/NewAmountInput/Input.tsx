import React, { FC } from "react";
import { Box, NumberInput, NumberInputField } from "@chakra-ui/react";

type Props = {
  onChange: any;
  onBlur: any;
  asset: string;
  value: string;
  max?: number;
  isDisabled?: boolean;
};

const Input: FC<Props> = ({ onChange, onBlur, value, max, isDisabled }) => {
  return (
    <Box>
      <NumberInput
        variant="brand"
        size="lg"
        value={value}
        min={0}
        max={max}
        step={0.000001}
        onChange={onChange}
        onBlur={onBlur}
        isDisabled={isDisabled}
      >
        <NumberInputField
          placeholder="0.0"
          _placeholder={{ color: "whiteAlpha.300" }}
        />
      </NumberInput>
    </Box>
  );
};

export default Input;
