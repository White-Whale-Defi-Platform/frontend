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

import WalletModal from "components/modals/WalletModal";
import LogoutIcon from "components/icons/LogoutIcon";
import WalletIcon from "components/icons/WalletIcon";
import { truncate } from "libs/text";

const TerraWallet: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { status, disconnect } = useWallet();
  const wallet = useConnectedWallet();

  if (status === WalletStatus.WALLET_CONNECTED) {
    return (
      <Box
        color="white"
        borderWidth="1px"
        borderColor="white"
        borderRadius="full"
        py="2"
        px="3"
      >
        <HStack spacing="6">
          <HStack spacing="3">
            <WalletIcon />
            <Text variant="light" color="white">
              {truncate(wallet.terraAddress)}
            </Text>
          </HStack>

          <Box h="4">
            <Divider orientation="vertical" borderColor="white" />
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
      </Box>
    );
  }

  return (
    <>
      <chakra.button
        type="button"
        color="white"
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
