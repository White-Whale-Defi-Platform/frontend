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

import DepositForm from "components/vault/DepositForm";

type Props = {
  token: string;
  vault: any;
};

const DepositModal: FC<Props> = ({ token, vault }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="sm"
        isFullWidth
        onClick={onOpen}
      >
        Deposit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent py="0">
          <ModalCloseButton />
          <ModalBody py="0">
            <DepositForm token={token} vault={vault} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
