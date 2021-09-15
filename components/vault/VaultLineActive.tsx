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
        {/* Start bloc one */}
        <Flex
          flex="1"
          justify="space-between"
          flexDir="column"
          order={{ base: 0, sm: 0, md: 0 }}
        >
          <Flex justify="space-between" align="center">
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
            <Center h="16">
              <Divider
                orientation="vertical"
                borderColor="rgba(255, 255, 255, 0.1)"
              />
            </Center>
            <Box>
              <Text color="#fff" fontSize="xl" fontWeight="bold" mb="4">
                APY
              </Text>
              <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                --
              </Text>
            </Box>
            <Center h="16">
              <Divider
                orientation="vertical"
                borderColor="rgba(255, 255, 255, 0.1)"
              />
            </Center>
            <Box>
              <Text color="#fff" fontSize="xl" mb="4" fontWeight="bold">
                Daily Yield
              </Text>
              <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                --
              </Text>
            </Box>
          </Flex>
          <Box py={{ base: "27px", sm: "27px", md: "initial" }}>
            <Divider borderColor="rgba(255, 255, 255, 0.1)" />
          </Box>
          <Flex
            justify="space-between"
            align="center"
            display={{ base: "none", sm: "none", md: "inherit" }}
          >
            <Box>
              <Text color="#fff" fontSize="large" mb="4" fontWeight="bold">
                Total Deposits
              </Text>
              <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                {totalBalanceAmount}
              </Text>
            </Box>
            <Center
              h="16"
              display={{ base: "none", sm: "none", md: "inherit" }}
            >
              <Divider
                orientation="vertical"
                borderColor="rgba(255, 255, 255, 0.1)"
              />
            </Center>
            <Flex justify="space-between">
              <Box mr="12">
                <Text color="#fff" fontSize="large" mb="4" fontWeight="bold">
                  My Deposit
                </Text>
                <Text color="brand.500" fontSize="2xl" fontWeight="bold">
                  {balanceAmount}
                </Text>
              </Box>
              <Box>
                <Box mb="2">
                  {vault && <DepositModal token="uusd" vault={vault} />}
                </Box>
                <Box>{vault && <WithdrawModal vault={vault} />}</Box>
              </Box>
            </Flex>
          </Flex>
        </Flex>
        {/* Responsive part TOTAL */}
        <Flex
          justify="space-between"
          order={{ base: 4, sm: 4, md: 0 }}
          display={{ base: "flex", sm: "flex", md: "none" }}
        >
          <Box mr="12">
            <Text color="#fff" fontSize="large" mb="4" fontWeight="bold">
              My Deposit
            </Text>
            <Text color="brand.500" fontSize="2xl" fontWeight="bold">
              {balanceAmount}
            </Text>
          </Box>
          <Box>
            <Box mb="2">
              <DepositModal token="uusd" vault={vault} />
            </Box>
            <Box>
              <Button variant="secondary" size="sm" isFullWidth>
                Withdraw
              </Button>
            </Box>
          </Box>
        </Flex>
        {/* Responsive part TOTAL */}

        {/* End bloc one */}
        <Center
          h="48"
          px="12"
          alignSelf="center"
          display={{ base: "none", sm: "none", md: "initial" }}
          order={{ base: 2, sm: 2, md: 0 }}
        >
          <Divider
            orientation="vertical"
            borderColor="rgba(255, 255, 255, 0.1)"
          />
        </Center>

        {item.type == "peg" && (
          <Flex
            order={{ base: 2, sm: 2, md: 5 }}
            justifyContent="space-between"
          >
            <ChartVault value={graphData} />
            <Flex>
              <Button
                variant="primary"
                bgColor="#8F8F8F"
                onClick={() => onClose()}
              >
                -
              </Button>
            </Flex>
          </Flex>
        )}

        {item.type == "asset" && (
          <Flex order={{ base: 2, sm: 2, md: 5 }} flexDir="column">
            <Flex justifyContent="space-between">
              <Text fontSize="xl">Assets</Text>
              <Flex>
                <Button
                  variant="primary"
                  bgColor="#8F8F8F"
                  onClick={() => onClose()}
                >
                  -
                </Button>
              </Flex>
            </Flex>
            <Flex alignItems="center">
              <Flex flexDir="column" pr="38" pt="37">
                {item.assetList.map((data) => (
                  <Box key={data.label}>
                    <AssetLine data={data} />
                  </Box>
                ))}
              </Flex>
              <Box>
                <EllipseChartVaultAsset pt="36px" />
              </Box>
            </Flex>
          </Flex>
        )}
      </MotionFlex>
    </Card>
  );
};

export default VaultLineActive;
