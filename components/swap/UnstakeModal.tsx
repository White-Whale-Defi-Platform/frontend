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

import UnstakeForm from "components/swap/UnstakeForm";

type Props = {
  pairContract: string;
  lpTokenContract: string;
  stakingContract: string;
};

const UnstakeModal: FC<Props> = ({
  pairContract,
  lpTokenContract,
  stakingContract,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button type="button" variant="secondary" minW="32" onClick={onOpen}>
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
                Unstake your LP token
              </Text>

              <UnstakeForm
                pairContract={pairContract}
                lpTokenContract={lpTokenContract}
                stakingContract={stakingContract}
                onClose={onClose}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UnstakeModal;
