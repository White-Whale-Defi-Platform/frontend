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

type Props = {
  lpTokenContract: string;
};

const StakeModal: FC<Props> = ({ lpTokenContract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={onOpen}
        isFullWidth
      >
        Stake LP
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
                  <Tab>Stake</Tab>
                  <Tab>Unstake</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <StakeForm
                      lpTokenContract={lpTokenContract}
                      onClose={onClose}
                    />
                  </TabPanel>
                  <TabPanel>
                    <UnstakeForm onClose={onClose} />
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

export default StakeModal;
