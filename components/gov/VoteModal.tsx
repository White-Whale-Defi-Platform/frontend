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

import VoteForm from "components/gov/VoteForm";

type Props = {
  pollId: number;
  isDisabled?: boolean;
};

const VoteModal: FC<Props> = ({ pollId, isDisabled = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="md"
        onClick={onOpen}
        isDisabled={isDisabled}
      >
        Vote now
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <VoteForm pollId={pollId} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoteModal;
