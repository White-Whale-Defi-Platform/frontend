import React, { FC } from "react";
import {
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";

import ArrowUpIcon from "components/icons/ArrowUpIcon";
import WithdrawForm from "components/pool/WithdrawForm";

type Props = {
  pairContract: string;
  lpTokenContract: string;
};

const WithdrawModal: FC<Props> = ({ pairContract, lpTokenContract }) => {
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
        Withdraw
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Withdraw
              </Heading>

              <WithdrawForm
                pairContract={pairContract}
                lpTokenContract={lpTokenContract}
                onClose={onClose}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WithdrawModal;
