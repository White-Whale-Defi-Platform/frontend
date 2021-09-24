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

import ArrowUpIcon from "components/icons/ArrowUpIcon";
import UnstakeForm from "components/governance/UnstakeForm";

const UnstakeModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        leftIcon={<ArrowUpIcon width="1.25rem" height="1.25rem" />}
        variant="secondary"
        size="sm"
        onClick={onOpen}
      >
        Unstake
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Unstake
              </Heading>
              <Text variant="light" textAlign="center" fontWeight="500">
                Unstake WHALE from WhiteWhale Governance
              </Text>

              <UnstakeForm onClose={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnstakeModal;
