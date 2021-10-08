import React, { FC } from "react";
import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  Flex,
  HStack,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  Image,
  forwardRef,
  chakra,
} from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { fromTerraAmount, useBalance } from "@arthuryeti/terra";

import { lookup, toNumber, formatAsset } from "libs/parse";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import SelectTokenItem from "components/SelectTokenItem";

type Props = {
  onChange: any;
  onBlur: any;
  value: {
    amount: string;
    asset: string;
  };
};

const AmountWithSelectInput: FC<Props> = forwardRef(
  ({ onChange, onBlur, value }, ref) => {
    const { getIcon, getSymbol } = useTokenInfo();
    const balance = useBalance(value.asset);

    const renderButton = () => {
      if (value) {
        return (
          <HStack>
            <Box>
              <Image
                src={getIcon(value.asset)}
                width="1.5rem"
                height="1.5rem"
                alt="Logo"
              />
            </Box>
            <Text variant="light" fontWeight="500">
              {getSymbol(value.asset)}
            </Text>
            <Box>
              <ChevronDownIcon width="1rem" height="1rem" />
            </Box>
          </HStack>
        );
      }

      return (
        <HStack>
          <Text variant="light" fontWeight="500">
            Select Token
          </Text>
          <Box>
            <ChevronDownIcon width="1rem" height="1rem" />
          </Box>
        </HStack>
      );
    };

    return (
      <Box ref={ref}>
        {value && (
          <Box mb="2" ml="6">
            <Text fontSize="xl">
              <Text as="span" variant="light">
                Available:
              </Text>{" "}
              <Text as="span" fontSize="sm" fontWeight="500">
                {`${fromTerraAmount(balance, "0,0.0[00000]")} ${getSymbol(
                  value.asset
                )}`}
              </Text>
            </Text>
          </Box>
        )}
        <Box position="relative">
          <NumberInput
            variant="brand"
            size="lg"
            value={value.amount}
            onChange={(amount) => onChange({ ...value, amount })}
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
              <Box py="2" height="full">
                <Divider orientation="vertical" borderColor="brand.600" />
              </Box>
              <Menu placement="bottom-end">
                <MenuButton type="button" as={chakra.button} outline="none">
                  {renderButton()}
                </MenuButton>
                <MenuList>
                  <SelectTokenItem
                    asset="uluna"
                    onClick={(asset) => {
                      onChange({ ...value, asset });
                    }}
                  />
                  <SelectTokenItem
                    asset="terra18nle009rtynpjgleh2975rleu5zts0zdtqryte"
                    onClick={(asset) => {
                      onChange({ ...value, asset });
                    }}
                  />
                  <SelectTokenItem
                    asset="uusd"
                    onClick={(asset) => {
                      onChange({ ...value, asset });
                    }}
                  />
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>
      </Box>
    );
  }
);

export default AmountWithSelectInput;
