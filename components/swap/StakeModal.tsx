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

import StakeForm from "components/swap/StakeForm";

type Props = {
  stakingContract: string;
  lpTokenContract: string;
};

const ProvideModal: FC<Props> = ({ stakingContract, lpTokenContract }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button type="button" variant="primary" minW="32" onClick={onOpen}>
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
                Stake your LP token
              </Text>

              <StakeForm
                stakingContract={stakingContract}
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

export default ProvideModal;
