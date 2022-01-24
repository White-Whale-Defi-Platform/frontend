import React, { FC, useCallback } from 'react';
import { useWallet, ConnectType } from '@terra-money/wallet-provider';
import {
  Modal,
  ModalOverlay,
  Text,
  HStack,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  chakra,
} from '@chakra-ui/react';

import TerraExtensionIcon from 'components/icons/TerraExtensionIcon';
import XdefiExtensionIcon from 'components/icons/XdefiExtensionIcon';
import TerraMobileIcon from 'components/icons/TerraMobileIcon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const { connect, availableConnections } = useWallet();
  const connections = availableConnections && availableConnections.filter(connection => connection.name === 'XDEFI Wallet' || connection.name === 'Terra Station Wallet')
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Heading size="md" mb="6">
              Connect to a wallet
            </Heading>
            {connections && connections.map(({ type, identifier, name, icon }) => (
            <chakra.button
              key={identifier}
              transition="0.2s all"
              p="6"
              borderRadius="xl"
              bg="brand.900"
              width="100%"
              mb="4"
              _hover={{
                bg: 'white',
                color: 'brand.900',
              }}
              onClick={() => {
                onClose();
                connect(type, identifier);
              }}
            >
              <HStack justify="space-between">
                <Text>{name}</Text>
               {name === 'XDEFI Wallet' ?  <XdefiExtensionIcon /> :  <TerraExtensionIcon /> }
              </HStack>
            </chakra.button>
          ))}
            <chakra.button
              transition="0.2s all"
              p="6"
              borderRadius="xl"
              bg="brand.900"
              width="100%"
              _hover={{
                bg: 'white',
                color: 'brand.900',
              }}
              onClick={() => {
                onClose();
                connect(ConnectType.WALLETCONNECT);
              }}
            >
              <HStack justify="space-between">
                <Text>Terra Station Mobile</Text>
                <TerraMobileIcon width="1.5rem" height="1.5rem" />
              </HStack>
            </chakra.button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
