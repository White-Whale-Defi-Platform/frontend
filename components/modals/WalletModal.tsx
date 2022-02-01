import React, { FC } from 'react';
import { useWallet, ConnectType } from '@terra-money/wallet-provider';
import {
  Modal,
  useMediaQuery,
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

import TerraMobileIcon from 'components/icons/TerraMobileIcon';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}


const WalletModal: FC<Props> = ({ isOpen, onClose }) => {
  const isSmallScreen = useMediaQuery('(max-width: 1000px)')[0];
  const { connect, availableConnections, availableInstallations } = useWallet();
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
            {!isSmallScreen && availableConnections.filter(({ type }) => type !== ConnectType.READONLY).map(({ type, identifier, name, icon }) => (
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
               <img width={24} height={24} src={icon} alt={name} />
              </HStack>
            </chakra.button>
          ))}
          {
            !isSmallScreen && availableInstallations.filter(({ type }) => type === ConnectType.EXTENSION).map(({ type, identifier, name, icon, url }) => (
              <chakra.button
                key={'installation' + type + identifier}
                className="install"
                target="_blank"
                rel="noreferrer"
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
                  openInNewTab(url)
                  onClose();
                }}
                >
                <HStack justify="space-between">
                  <Text>Install {name}</Text>
                 <img width={24} height={24} src={icon} alt={`Install ${name}`} />
                </HStack>
              </chakra.button>
            ))}
          
            { isSmallScreen && 
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
            }       
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletModal;
