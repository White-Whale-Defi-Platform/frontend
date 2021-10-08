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
  useDisclosure,
} from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";

import PlusIcon from "components/icons/PlusIcon";
import ProvideForm from "components/pool/ProvideForm";
import { Pool } from "types/common";

type Props = {
  pairContract: string;
  pool: Pool & { token1: string; token2: string };
};

const ProvideModal: FC<Props> = ({ pairContract, pool }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getSymbol } = useTokenInfo();

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={onOpen}
        isFullWidth
      >
        Provide
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Farm
              </Heading>
              <Text variant="light" textAlign="center" fontWeight="500">
                Supply {getSymbol(pool.token1)} & {getSymbol(pool.token2)} to LP
                pool in 50/50 proportion.
              </Text>

              <ProvideForm
                pairContract={pairContract}
                pool={pool}
                onClose={onClose}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProvideModal;
