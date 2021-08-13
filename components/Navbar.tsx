import React, { FC, useState } from "react";
import Link from "next/link";
import {
  useWallet,
  WalletStatus,
  useConnectedWallet,
} from "@terra-money/wallet-provider";
import {
  Flex,
  Text,
  Box,
  HStack,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";

import QRCodeModal from "components/modals/QRCodeModal";
import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import DuplicateIcon from "components/icons/DuplicateIcon";
import QRCodeIcon from "components/icons/QRCodeIcon";
import LogoutIcon from "components/icons/LogoutIcon";

const Navbar: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const wallet = useConnectedWallet();

  return (
    <Box px="10" borderBottomWidth="2px" borderColor="brand.100">
      <Flex justifyContent="space-between">
        <Box flex="1">
          <HStack spacing="8">
            <Link href="/" passHref>
              <a>
                <Image src="/logo.svg" alt="WhiteWhale Logo" />
              </a>
            </Link>
            <NavbarLink text="Dashboard" href="/" />
            <NavbarLink text="Vaults" href="/vaults" />
            <NavbarLink text="Swap" href="/swap" />
            <NavbarLink text="Governance" href="/gov" />
          </HStack>
        </Box>
        <HStack flex="1" spacing="6" justify="flex-end">
          <TerraWallet />
        </HStack>
      </Flex>
      <QRCodeModal qrCode="/qrCode.png" isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

const useCopyAddress = (address: string) => {
  const [copied, setCopied] = useState(false);
  const reset = () => setCopied(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return { copy, copied, reset };
};

export default Navbar;
