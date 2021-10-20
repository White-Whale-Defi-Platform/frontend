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
  isDisabled: boolean;
};

const VoteModal: FC<Props> = ({ pollId, isDisabled }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        type="button"
        variant="primary"
        size="lg"
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
            <Flex align="center" direction="column">
              <Heading size="md" mb="4">
                Vote
              </Heading>
              <Text variant="light" textAlign="center" fontWeight="500">
                You are about to vote on “Proposal: Funding for Kado”. Please
                select side, set the amount and sumbit your vote.
              </Text>

              <VoteForm pollId={pollId} onClose={onClose} />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VoteModal;
