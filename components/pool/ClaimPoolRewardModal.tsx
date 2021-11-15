import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Button,
  Box,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import PlusIcon from "components/icons/PlusIcon";
import ClaimPoolRewardForm from "components/pool/ClaimPoolRewardForm";

type Props = {
  contract: string;
};

const ClaimPoolRewardModal: FC<Props> = ({ contract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        isFullWidth
        size="md"
        onClick={onOpen}
        display={["none", null, "inline-flex"]}
      >
        Claim
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <ClaimPoolRewardForm contract={contract} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ClaimPoolRewardModal;
