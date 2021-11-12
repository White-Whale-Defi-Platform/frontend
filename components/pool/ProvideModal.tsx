import React, { FC } from "react";
import {
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";

import ProvideForm from "components/pool/ProvideForm";
import WithdrawForm from "components/pool/WithdrawForm";
import { Pool } from "types/common";

type Props = {
  pairContract: string;
  lpTokenContract: string;
  pool: Pool & { token1: string; token2: string };
};

const ProvideModal: FC<Props> = ({ pairContract, lpTokenContract, pool }) => {
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
        Pool
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
                  <Tab>Provide</Tab>
                  <Tab>Withdraw</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ProvideForm
                      pairContract={pairContract}
                      pool={pool}
                      onClose={onClose}
                    />
                  </TabPanel>
                  <TabPanel>
                    <WithdrawForm
                      pairContract={pairContract}
                      lpTokenContract={lpTokenContract}
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

export default ProvideModal;
