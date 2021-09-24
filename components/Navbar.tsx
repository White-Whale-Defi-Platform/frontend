import React, { FC } from "react";
import Link from "next/link";
import { Flex, Box, HStack, Image } from "@chakra-ui/react";

import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";

const Navbar: FC = () => {
  return (
    <Box px="10" borderBottomWidth="2px" borderColor="brand.100">
      <Flex justifyContent="space-between" mx="auto" maxWidth="container.xl">
        <Box flex="1">
          <HStack spacing="8">
            <Link href="/" passHref>
              <a>
                <Image src="/logo.svg" alt="WhiteWhale Logo" boxSize="12" />
              </a>
            </Link>
            <NavbarLink text="My Page" href="/myPage" />
            <NavbarLink text="Vaults" href="/vaults" />
            <NavbarLink text="Swap" href="/swap" />
            <NavbarLink text="Governance" href="/gov" />
          </HStack>
        </Box>
        <HStack flex="1" spacing="6" justify="flex-end">
          <TerraWallet />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
