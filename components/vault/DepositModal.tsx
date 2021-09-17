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

import ArrowDownIcon from "components/icons/ArrowDownIcon";
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Deposit asset
              </Heading>

              <DepositForm token={token} vault={vault} onClose={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DepositModal;
