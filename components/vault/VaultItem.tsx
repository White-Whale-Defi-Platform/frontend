import React, { FC, useState } from "react";
import { Box, HStack, Flex, Text, Image } from "@chakra-ui/react";

import { format } from "libs/parse";
import { useVault } from "modules/vault";
import { useUstPrice } from "hooks/useUstPrice";
import { num, useTerraWebapp } from "@arthuryeti/terra";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import ChartVault from "components/vault/chart/ChartVault";
import DepositModal from "components/vault/DepositModal";
import WithdrawModal from "components/vault/WithdrawModal";
import useVaultApy from "hooks/useVaultApy";
import { Tooltip } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { toFixed } from "libs/parse";

type Props = {
  data: any;
};

const VaultItemLine = ({ label, value, asset = "UST" }) => {
  const [ apr, apy  ] = useVaultApy();
  return (
    <Flex
      justify="space-between"
      align="center"
      py="2"
      borderBottom="1px solid"
      borderBottomColor="whiteAlpha.300"
      _last={{
        borderBottom: "none",
      }}
    >
      <Text color="#fff">
        {label}
        {(label === "Vault APR"||label === "APY") && (
          <Tooltip label={`APR is rolling weekly.`} maxW="160px" bg="blackAlpha.900" fontSize="xs"  color="brand.500"  borderRadius={10}>
            <InfoOutlineIcon ml="2" mb="1" color="brand.500" fontSize="xs" />
          </Tooltip>
        )}

      </Text>

      <SimpleStat
        label={label}
        value={value}
        asset={asset}
        fontSizeValue="lg"
        fontSizeAsset="sm"
      />
    </Flex>
  );
};

const VaultItem: FC<Props> = ({ data }) => {
  const { vault, balance, totalBalance } = useVault({
    contract: data.contract,
  });
  const balanceAmount = format(balance, "uusd");
  const totalBalanceAmount = format(totalBalance, "uusd");
  const ustPrice = useUstPrice();
  const isComing = data.contract == null;
  const [ apr, apy ] = useVaultApy();

  return (
    <Card
      noPadding
      maxWidth="320px"
      whileHover={{
        scale: 1.05,
      }}
    >
      <Box filter={isComing && "blur(3px)"}>
        <Box bg="rgba(0,0,0,0.2)" p="8" borderBottomRadius="2xl">
          <Flex justify="space-between">
            <HStack spacing="2" mb="4">
              <Image src={data.logo} alt={data.logo} boxSize="1.875rem" />
              <Text color="#fff" fontSize="xl" fontWeight="bold">
                {data.name}
              </Text>
            </HStack>
            {/* <Text color="brand.500" fontSize="2xl" fontWeight="bold">
              {data.name == "UST" ? `$${ustPrice}` : "--"}
            </Text> */}
          </Flex>
          {/* <ChartVault value={data.name == "UST" ? Number(ustPrice) : 0} /> */}
          <Flex width="424px" ></Flex>
        </Box>
        <Box p="8">
          <Box>
            {/* <VaultItemLine label="APR" value={"APR under Works"} asset="%" /> */}
            <VaultItemLine label="Anchor APY" value={`${apy}`} asset="%" />
            <VaultItemLine label="Vault APR" value={apr} asset="%" />
            <VaultItemLine label="Total Deposits" value={totalBalanceAmount} />
            <VaultItemLine label="My Deposit" value={balanceAmount} />
          </Box>
          <HStack mt="6">
            <WithdrawModal vault={vault} />
            <DepositModal token="uusd" vault={vault} />
          </HStack>
        </Box>
      </Box>
      {isComing && (
        <Flex
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          justify="center"
          align="center"
        >
          <Text color="white" fontSize="xl" fontWeight="700">
            Coming soon...
          </Text>
        </Flex>
      )}
    </Card>
  );
};

export default VaultItem;
