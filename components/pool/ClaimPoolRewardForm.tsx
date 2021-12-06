import React, { FC, useCallback } from "react";
import {
  Flex,
  Box,
  HStack,
  Heading,
  chakra,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { fromTerraAmount, TxStep } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { useClaimPool } from "modules/pool";
import { useFeeToString } from "hooks/useFeeToString";
import { useClaimableAmount } from "modules/pool";

import InlineStat from "components/InlineStat";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";

type Props = {
  contract: string;
  onClose: () => void;
};

const ClaimFarmForm: FC<Props> = ({ contract, onClose }) => {
  const queryClient = useQueryClient();
  const amount = useClaimableAmount(contract);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("stakerInfo");
      queryClient.invalidateQueries("balance");
      onClose();
    },
    [onClose, queryClient]
  );

  const state = useClaimPool({
    contract,
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.claim();
  };

  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (state.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={state.txHash} />;
  }

  return (
    <chakra.form onSubmit={submit} width="full">
      <Box
        border="2px"
        borderColor="whiteAlpha.200"
        borderRadius="3xl"
        px="4"
        py="8"
      >
        <Flex justify="center" mt="-12" mb="8">
          <Box bg="rgba(26,26,26,1)" px="8">
            <Heading size="md">Claim rewards</Heading>
          </Box>
        </Flex>

        <Flex justify="space-between" fontWeight="bold" fontSize="lg" mt="6">
          <Text>Amount</Text>
          <Text>{fromTerraAmount(amount, "0,0.0[00]")} WHALE</Text>
        </Flex>

        <Flex mt="8" justify="center">
          <Box mb="4">
            <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
          </Box>
        </Flex>

        <Flex mt="4" justify="center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            px="12"
            isLoading={state.txStep == TxStep.Estimating}
            disabled={state.txStep != TxStep.Ready}
          >
            Claim Rewards
          </Button>
        </Flex>
      </Box>
    </chakra.form>
  );
};

export default ClaimFarmForm;
