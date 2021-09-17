import React, { FC } from "react";
import {
  Box,
  HStack,
  Button,
  Flex,
  Text,
  Image,
  Center,
  Divider,
  Circle,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

import { format } from "libs/parse";

import Card from "components/Card";
import SimpleStat from "components/SimpleStat";
import ChartVault from "components/vault/chart/ChartVault";
import DepositModal from "components/vault/DepositModal";
import WithdrawModal from "components/vault/WithdrawModal";
import AssetLine from "components/myPage/AssetLine";
import EllipseChartVaultAsset from "components/vault/chart/EllipseChartVaultAsset";

const graphData = "1";

const MotionFlex = motion(Flex);

type Props = {
  item: any;
  vault: any;
  balance: string;
  totalBalance: string;
  onClose: () => void;
};

const VaultLineActive: FC<Props> = ({
  item,
  vault,
  balance,
  totalBalance,
  onClose,
}) => {
  const balanceAmount = format(balance, "uusd");
  const totalBalanceAmount = format(totalBalance, "uusd");

  return (
    <Card>
      <MotionFlex
        justifyContent="space-between"
        flexDirection={{ base: "column", sm: "column", md: "row" }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <Box>
          <Box>
            <HStack spacing="2" mb="4">
              <Image src={item.logo} alt={item.logo} boxSize="1.875rem" />
              <Text color="#fff" fontSize="xl" fontWeight="bold">
                UST
              </Text>
            </HStack>
            <Text color="brand.500" fontSize="2xl" fontWeight="bold">
              --
            </Text>
          </Box>
          <ChartVault value={graphData} />
          <Flex
            justify="space-between"
            py="2"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.300"
          >
            <Text color="#fff" fontSize="xl">
              APY
            </Text>
            <SimpleStat
              value="--"
              asset="%"
              fontSizeValue="2xl"
              fontSizeAsset="sm"
            />
          </Flex>
          <Flex
            justify="space-between"
            py="2"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.300"
          >
            <Text color="#fff" fontSize="xl">
              Daily Yield
            </Text>
            <SimpleStat
              value="--"
              asset="%"
              fontSizeValue="2xl"
              fontSizeAsset="sm"
            />
          </Flex>
          <Flex
            justify="space-between"
            py="2"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.300"
          >
            <Text color="#fff" fontSize="xl">
              My Deposit
            </Text>
            <SimpleStat
              value={balanceAmount}
              asset="UST"
              fontSizeValue="2xl"
              fontSizeAsset="sm"
            />
          </Flex>
          <Flex
            justify="space-between"
            py="2"
            borderBottom="1px solid"
            borderBottomColor="whiteAlpha.300"
          >
            <Text color="#fff" fontSize="xl">
              Total Deposits
            </Text>
            <SimpleStat
              value={totalBalanceAmount}
              asset="UST"
              fontSizeValue="2xl"
              fontSizeAsset="sm"
            />
          </Flex>
          <Box mb="2">
            {vault && <DepositModal token="uusd" vault={vault} />}
          </Box>
          <Box>{vault && <WithdrawModal vault={vault} />}</Box>
        </Box>
      </MotionFlex>
    </Card>
  );
};

export default VaultLineActive;
