import React, { FC } from "react";
import {
  Button,
  ButtonGroup,
  forwardRef,
  NumberInput,
  NumberInputField,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { num } from "@arthuryeti/terra";

type Props = {
  onChange: any;
  onBlur: any;
  value: string;
};

const SwapFormSlippage: FC<Props> = forwardRef(
  ({ onChange, onBlur, value, ...field }, ref) => {
    const format = (val) => {
      if (num(val).isEqualTo("0") || val.length == 0) {
        return val;
      }

      return num(val).times("100").toString();
    };

    const parse = (val) => {
      if (num(val).isEqualTo("0") || val.length == 0) {
        return val;
      }

      return num(val).div("100").toString();
    };

    const isSelected = (label: string) => {
      return value == label;
    };

    return (
      <ButtonGroup variant="secondary" size="sm">
        <Button
          type="button"
          isActive={isSelected("0.01")}
          onClick={() => onChange("0.01")}
        >
          1%
        </Button>
        <Button
          type="button"
          isActive={isSelected("0.05")}
          onClick={() => onChange("0.05")}
        >
          5%
        </Button>
        <Button
          type="button"
          isActive={isSelected("0.3")}
          onClick={() => onChange("0.3")}
        >
          30%
        </Button>
        <InputGroup size="sm" flex="1">
          <NumberInput
            variant="brand"
            value={format(value)}
            onChange={(a) => onChange(parse(a))}
            onBlur={onBlur}
            {...field}
          >
            <NumberInputField
              placeholder="50"
              py="4"
              paddingLeft="0.75rem!important"
              paddingRight="0.75rem!important"
              borderTopLeftRadius="full"
              borderBottomLeftRadius="full"
              borderColor="transparent"
              bg="brand.900"
              maxW="16"
            />
          </NumberInput>
          <InputRightAddon
            bg="brand.900"
            py="4"
            borderColor="transparent"
            borderTopRightRadius="full"
            borderBottomRightRadius="full"
          >
            %
          </InputRightAddon>
        </InputGroup>
      </ButtonGroup>
    );
  }
);

export default SwapFormSlippage;
