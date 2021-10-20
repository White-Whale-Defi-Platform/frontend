import React, { FC } from "react";
import Link from "next/link";
import { Flex, Box, HStack, Image, Text } from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";
import { useTokenInfo, useTokenPriceInUst } from "@arthuryeti/terraswap";

import TerraWallet from "components/TerraWallet";
import NavbarLink from "components/NavbarLink";
import useContracts from "hooks/useContracts";

const Navbar: FC = () => {
  const { whaleToken } = useContracts();
  const whalePrice = useTokenPriceInUst(whaleToken);
  const { getIcon } = useTokenInfo();

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
          <HStack
            bg="blackAlpha.700"
            borderRadius="full"
            py="3"
            px="4"
            spacing="6"
          >
            <HStack>
              <Image
                src={getIcon(whaleToken)}
                alt="WhiteWhale Logo"
                boxSize="6"
              />
              <Text color="white">WHALE price</Text>
            </HStack>
            <Text color="brand.500" fontWeight="bold">
              {fromTerraAmount(whalePrice, "0.000")} UST
            </Text>
          </HStack>
          <TerraWallet />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
