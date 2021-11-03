import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import UnstakeForm from "components/pool/UnstakeForm";

const UnstakeModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="md"
        onClick={onOpen}
        isFullWidth
      >
        Unstake
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <UnstakeForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnstakeModal;
