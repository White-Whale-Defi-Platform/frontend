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

import StakeForm from "components/pool/StakeForm";

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
        Stake
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <StakeForm lpTokenContract={lpTokenContract} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StakeModal;
