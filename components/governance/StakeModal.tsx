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
import StakeForm from "components/governance/StakeForm";

const StakeModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        leftIcon={<ArrowDownIcon width="1.25rem" height="1.25rem" />}
        variant="primary"
        size="sm"
        onClick={onOpen}
      >
        Stake
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Stake
              </Heading>
              <Text variant="light" textAlign="center" fontWeight="500">
                Stake WHALE to WhiteWhale Governance to earn rewards from
                protocol fee and exercise voting rights
              </Text>

              <StakeForm onClose={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StakeModal;
