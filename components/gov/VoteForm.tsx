import React, { FC, useCallback } from "react";
import {
  Button,
  HStack,
  Box,
  chakra,
  useToast,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { TxStep, useTerraWebapp } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useStake } from "modules/govern";
import useFeeToString from "hooks/useFeeToString";
import contracts from "constants/contracts.json";
import useFinder from "hooks/useFinder";
import { VoteType } from "types/poll";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PollVoteButtons from "components/gov/PollVoteButtons";
import InfoIcon from "components/icons/InfoIcon";

type Inputs = {
  voteType: VoteType;
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  onClose: () => void;
};

const VoteForm: FC<Props> = ({ onClose }) => {
  const toast = useToast();
  const finder = useFinder();
  const queryClient = useQueryClient();
  const {
    network: { name },
  } = useTerraWebapp();

  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      voteType: VoteType.Yes,
      token: {
        amount: undefined,
        asset: contracts[name].psiToken,
      },
    },
  });
  const token = watch("token");

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("balance");
      onClose();
    },
    [onClose, queryClient]
  );

  const voteState = useStake({
    tokenContract: token.asset,
    govContract: contracts[name].gov,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    voteState.deposit();
  };

  const feeString = useFeeToString(voteState.fee);

  if (voteState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (voteState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={voteState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Flex align="center" direction="column">
        <Controller
          name="voteType"
          control={control}
          defaultValue={null}
          rules={{ required: true }}
          render={({ field }) => <PollVoteButtons {...field} />}
        />
      </Flex>

      <Box width="full">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />

        <Box mt="4">
          <InlineStat
            label="Tx Fee"
            value={feeString}
            name="UST"
            tooltip="Fee paid to execute this transaction"
          />
        </Box>
      </Box>

      <Divider my="8" borderColor="brand.800" />

      <Box
        bg="linear-gradient(180deg, rgba(222, 146, 167, 0) 0%, rgba(222, 146, 167, 0.15) 100%);"
        px="6"
        py="4"
        mb="8"
        borderRadius="2xl"
      >
        <HStack spacing="6">
          <Box>
            <InfoIcon width="1.5rem" height="1.5rem" />
          </Box>
          <Text fontSize="xs">
            Votes cannot be changed after submission. Staked PSI used to vote in
            polls are locked and cannot be withdrawn until the poll finishes.
          </Text>
        </HStack>
      </Box>

      <HStack spacing="6" width="full" mt="8">
        <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          flex="1"
          isDisabled={voteState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default VoteForm;
