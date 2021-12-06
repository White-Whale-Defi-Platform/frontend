import React, { FC } from "react";
import {
  Box,
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Heading,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import StakeForm from "components/pool/StakeForm";
import UnstakeForm from "components/pool/UnstakeForm";
import BondForm from "./BondForm";
import RedeemForm from "./RedeemForm";

type Props = {
  tokenContract: string;
};

const BondModal: FC<Props> = ({ tokenContract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button minW="32" variant="secondary" onClick={onOpen}>
        Bond
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Box
              border="2px"
              borderColor="whiteAlpha.200"
              borderRadius="3xl"
              px="4"
              py="8"
            >
              <Tabs variant="brand">
                <TabList justify="center">
                  <Tab>Bond</Tab>
                  <Tab>Redeem</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <BondForm tokenContract={tokenContract} onClose={onClose} />
                  </TabPanel>
                  <TabPanel>
                    <RedeemForm
                      tokenContract={tokenContract}
                      onClose={onClose}
                    />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BondModal;
