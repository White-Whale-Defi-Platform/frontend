import React, { FC } from 'react';
import Link from 'next/link';
import {
  Flex,
  Box,
  IconButton,
  HStack,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

import TerraWallet from 'components/TerraWallet';
import DrawerLink from 'components/DrawerLink';
import NavbarLink from 'components/NavbarLink';
import BurgerIcon from 'components/icons/BurgerIcon';

type Props = {
  hideNav?: boolean;
};

const Navbar: FC<Props> = ({ hideNav = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      px={{ base: '4', md: '10' }}
      borderBottomWidth="2px"
      borderColor="brand.100"
    >
      <Flex
        justifyContent="space-between"
        mx="auto"
        maxWidth="container.xl"
        display={{ base: 'none', md: 'flex' }}
      >
        <Box flex="1">
          <HStack spacing="8">
            <Link href="/" passHref>
              <a>
                <Image src="/logo.svg" alt="WhiteWhale Logo" boxSize="12" />
              </a>
            </Link>
            {/* TODO: This is where we enable and disable pages loading in the Nav Bar. Uncomment any of the pages to have then render in menu */}
            {!hideNav && (
              <>
                <NavbarLink text="Dashboard" href="/dashboard" />
                <NavbarLink text="My Page" href="/myPage" />
                <NavbarLink text="Vaults" href="/vaults" />
                <NavbarLink text="Swap" href="/swap" />
                <NavbarLink text="Governance" href="/gov" />
                {/* <NavbarLink text="Bond" href="/bond" /> */}
              </>
            )}
          </HStack>
        </Box>
        <HStack flex="1" spacing="6" justify="flex-end" py="3">
          <TerraWallet />
        </HStack>
      </Flex>

      <Flex
        justify="space-between"
        align="center"
        py="4"
        display={{ base: 'flex', md: 'none' }}
      >
        <Link href="/" passHref>
          <a>
            <Image src="/logo.svg" alt="WhiteWhale Logo" boxSize="12" />
          </a>
        </Link>
        <TerraWallet />
        <IconButton
          aria-label="Open drawer"
          variant="ghost"
          color="white"
          icon={<BurgerIcon width="1rem" height="1rem" />}
          onClick={onOpen}
          display={{ base: 'block', md: 'none' }}
          _focus={{
            bg: 'none',
          }}
          _active={{
            bg: 'none',
          }}
          _hover={{
            boxShadow: 'none',
          }}
        >
          Open
        </IconButton>
      </Flex>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <DrawerLink text="Dashboard" href="/dashboard" onClick={onClose} />
            <DrawerLink text="My Page" href="/myPage" onClick={onClose} />
            <DrawerLink text="Vaults" href="/vaults" onClick={onClose} />
            <DrawerLink text="Swap" href="/swap" onClick={onClose} />
            <DrawerLink text="Governance" href="/gov" onClick={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
