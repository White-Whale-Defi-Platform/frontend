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

import WithdrawForm from "components/vault/WithdrawForm";

type Props = {
  vault: any;
};

const WithdrawModal: FC<Props> = ({ vault }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        isFullWidth
        onClick={onOpen}
      >
        Withdraw
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <WithdrawForm token="uusd" vault={vault} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithdrawModal;
