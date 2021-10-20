import React, { FC } from "react";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import {
  Text,
  HStack,
  chakra,
  IconButton,
  Box,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { useBalance, fromTerraAmount } from "@arthuryeti/terra";

import { truncate } from "libs/text";

import WalletModal from "components/modals/WalletModal";
import LogoutIcon from "components/icons/LogoutIcon";
import WalletIcon from "components/icons/WalletIcon";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, disconnect } = useWallet();
  const wallet = useConnectedWallet();
  const balance = useBalance("uusd");

  if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <HStack>
        <Box
          color="white"
          borderWidth="1px"
          borderColor="whiteAlpha.400"
          borderRadius="full"
          py="2"
          px="4"
        >
          <HStack spacing="6">
            <HStack spacing="3">
              <WalletIcon />
              <Text variant="light" color="white">
                {truncate(wallet.terraAddress)}
              </Text>
            </HStack>

            <Box h="6">
              <Divider orientation="vertical" borderColor="whiteAlpha.400" />
            </Box>

            <HStack spacing="8">
              <Text>UST</Text>
              <Text>{fromTerraAmount(balance)}</Text>
            </HStack>
          </HStack>
        </Box>
        <IconButton
          aria-label="Logout"
          icon={<LogoutIcon />}
          variant="unstyled"
          size="sm"
          _focus={{
            boxShadow: "none",
          }}
          _hover={{
            color: "brand.500",
          }}
          onClick={disconnect}
        />
      </HStack>
    );
  }

  return (
    <>
      <chakra.button
        type="button"
        color="white"
        borderWidth="1px"
        borderColor="whiteAlpha.400"
        borderRadius="full"
        py="3"
        px="4"
        _focus={{
          outline: "none",
          boxShadow: "none",
        }}
        _hover={{
          color: "brand.500",
        }}
        onClick={onOpen}
      >
        <HStack spacing="3">
          <WalletIcon />
          <Text variant="light">Connect your wallet</Text>
        </HStack>
      </chakra.button>
      <WalletModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TerraWallet;
