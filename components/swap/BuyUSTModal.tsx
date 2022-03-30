import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Button,
  Text,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  Link,
  Box,
  Image,
  useDisclosure,
  VStack,
  useMediaQuery
} from "@chakra-ui/react";
import { HStack, Icon } from '@chakra-ui/react'
import { BiDollarCircle } from 'react-icons/bi'
import { FiExternalLink } from 'react-icons/fi'

import DepositForm from "components/vault/DepositForm";


const fiat = [
  {
    name: "Kado",
    link: "https://ramp.kado.money",
    icon: "/assets/kado-logo.png"
  }
]

const Logo = ({ url, name }) => (
  <Box boxSize='40px' objectFit='cover'>
    <Image src={url} alt={name} />
  </Box>
)

const BuyUSTModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width:480px)')

  return (
    <>
      <Link onClick={onOpen}>
        <Flex alignItems="center">
          <Icon fontSize="lg" color="brand.500" as={BiDollarCircle} />
          <Text as="span" variant="light" color="brand.500" ml="5px" fontSize="md">Buy UST</Text>
        </Flex>
      </Link>
      <Modal isOpen={isOpen} onClose={onClose} size={isMobile ? "full" : "lg"} isCentered>
        <ModalOverlay />
        <ModalContent py="0">
          <ModalCloseButton />
          <ModalBody width="full" py="6" pt="16">
            <Box
              border="2px"
              borderColor="whiteAlpha.200"
              borderRadius="3xl"
              px="4"
              py="8"
            >
              <Flex justify="center" mt="-12" mb="8">
                <Box bg="rgba(26,26,26,1)" px="8" color="brand.500">
                  <Heading size="md" >Buy UST</Heading>
                </Box>
              </Flex>

              <Box width="85%" >
                <Heading color="white" fontSize="10px" mb="2">
                  With Fiat
                </Heading>
              </Box>
              <VStack align='center'>
                {fiat.map(({ name, link, icon }) => (

                  <Button colorScheme='brand' rightIcon={<Logo url={icon} name={name} />} width="100%" onClick={() => open(link, "_blank")} justifyContent="space-between" px="30px" py="25px">
                    <HStack>
                      <Text>{name}</Text>
                      <Icon as={FiExternalLink} />
                    </HStack>
                  </Button>
                ))}
              </VStack>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuyUSTModal;
