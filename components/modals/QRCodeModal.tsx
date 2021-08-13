import React, { FC } from "react";
import {
  Modal,
  Box,
  ModalOverlay,
  ModalContent,
  Flex,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

type Props = {
  qrCode: string;
  isOpen: boolean;
  onClose: () => void;
};

const QRCodeModal: FC<Props> = ({ qrCode, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction="column"
            justify="center"
            align="center"
            textAlign="center"
          >
            <Image src={qrCode} alt="QR Code" mb="12" />
            <Heading size="md" mb="2">
              Scan your QR code
            </Heading>
            <Text variant="light" textAlign="center" mb="6">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
            <Button
              variant="primary"
              size="lg"
              onClick={onClose}
              minWidth="10rem"
            >
              Done!
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default QRCodeModal;
