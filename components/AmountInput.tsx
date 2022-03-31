import { fromTerraAmount, num } from "@arthuryeti/terra";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import {
  Box, Button, Divider, Flex, forwardRef, HStack, Image,
  Menu,
  MenuButton, MenuItem, MenuList, NumberInput,
  NumberInputField, Text
} from "@chakra-ui/react";
import AmountMaxButton from "components/AmountMaxButton";
import Balance from "components/Balance";
import { ONE_TOKEN } from "constants/constants";
import { div } from "libs/math";
import React, { FC, useEffect, useMemo, useState } from "react";


type Props = {
  onChange: any;
  onBlur: any;
  availableToWithdraw?: number;
  initialBalance?: string;
  isMaxDisabled?: boolean;
  hideBalance?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  showLockedInPolls?: boolean;
  tokenList?: any[],
  setTokenList?: any;
  value: {
    amount: string;
    asset: string;
    selected?: boolean;
  };
};

const AmountInput: FC<Props> = forwardRef(
  (
    {
      name,
      onChange,
      onBlur,
      value = { asset: "", amount: 0, selected: true },
      initialBalance,
      availableToWithdraw,
      showLockedInPolls = false,
      isError = false,
      isMaxDisabled = false,
      hideBalance = false,
      isDisabled = false,
      tokenList = [],
      setTokenList,
      ...field
    },
    ref
  ) => {
    const { getIcon, getSymbol } = useTokenInfo();
    const icon = useMemo(() => value?.asset ? getIcon(value?.asset) : '', [value, getIcon]);
    const symbol = useMemo(() => value?.asset ? getSymbol(value?.asset) : '', [value, getSymbol]);
    const stakedOrAvailable = showLockedInPolls ? availableToWithdraw : initialBalance
    const max = num(stakedOrAvailable).gt("0")
      ? div(stakedOrAvailable, ONE_TOKEN)
      : null;

    const [selected, setSelected] = useState(value)
    const [filterTokenList, setFilterTokenList] = useState([])

    useEffect(() => {
      if (tokenList.length) {
        const [firstToken] = tokenList.filter(token => token.selected)
        setSelected({ ...firstToken, amount: value.amount })
        // onChange({ ...firstToken, amount : value.amount}, false)

        const filterSelected = tokenList.filter(token => !token.selected)
        setFilterTokenList(filterSelected)
      }

    }, [tokenList])

    const onTokenSelect = (token) => {
      onChange({ ...token, amount: value.amount }, true)
      setSelected({ ...token, amount: value.amount })
      const filterSelected = tokenList.map(item => {
        item.selected = (token.asset === item.asset) ? true : false
        item.amount = value.amount
        return item
      })
      setTokenList(filterSelected)
    }

    return (
      <Box ref={ref}>
        {!hideBalance && (
          <Box mb="2">
            {initialBalance == null && <Balance asset={value.asset} />}
            {initialBalance != null && (
              <Text ml="6">
                <Text as="span" variant="light" color="white" fontSize="xs">
                  Staked:
                </Text>{" "}
                <Text as="span" fontSize="xs" fontWeight="700" ml="3">
                  {fromTerraAmount(initialBalance, "0,0.000000")}
                </Text>
              </Text>
            )}
            {showLockedInPolls && (
              <Text ml="6">
                <Text as="span" variant="light" color="white" fontSize="xs">
                  Available:
                </Text>{" "}
                <Text as="span" fontSize="xs" fontWeight="700" ml="3">
                  {fromTerraAmount(availableToWithdraw, "0,0.00000000")}
                </Text>
              </Text>
            )}
          </Box>
        )}
        <Box position="relative">
          <NumberInput
            min={0}
            variant="brand"
            size="lg"
            value={value.amount}
            onChange={(a) => onChange({ ...value, amount: a })}
            onBlur={onBlur}
            isDisabled={isDisabled}
            {...field}
          >
            <NumberInputField
              color={isError ? "red.500" : "brand.500"}
              placeholder="0.0"
              _placeholder={{ color: "whiteAlpha.300" }}
              _hover={isDisabled && {
              cursor: "not-allowed"
            }}
            />
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
                  {tokenList.length ? getSymbol(selected?.asset) : symbol}
                </Text>
                {
                  !filterTokenList.length && (<Image src={tokenList.length ? getIcon(selected?.asset) : icon} width="1.5rem" alt="Logo" />)
                }
                {filterTokenList.length && (
                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton isActive={isOpen} p="unset" as={Button} variant="brand" _focus={{ boxShadow: "none", }} rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}>
                          <Image src={tokenList.length ? getIcon(selected?.asset) : icon} width="1.5rem" alt="Logo" />
                        </MenuButton>
                        <MenuList bg="blackAlpha.900" px="2" py="2" >
                          {filterTokenList.map((token) => (
                            <MenuItem key={token?.asset} onClick={(v) => { onTokenSelect(token) }}>
                              <HStack spacing="24px">
                                <Text color="white" fontWeight="500">
                                  {getSymbol(token?.asset)}
                                </Text>
                                <Image src={getIcon(token?.asset)} width="1.5rem" alt="Logo" />
                              </HStack>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </>
                    )}
                  </Menu>
                )}

              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Box>
    );
  }
);

export default AmountInput;
