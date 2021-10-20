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
import { useGovStaker, useVote } from "modules/govern";
import { useFeeToString } from "hooks/useFeeToString";
import contracts from "constants/contracts.json";
import useFinder from "hooks/useFinder";
import { VoteType } from "types/poll";

import ArrowDownIcon from "components/icons/ArrowDownIcon";
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
  pollId: number;
  onClose: () => void;
};

const VoteForm: FC<Props> = ({ pollId, onClose }) => {
  const toast = useToast();
  const finder = useFinder();
  const staker = useGovStaker();
  const queryClient = useQueryClient();
  const {
    network: { name },
  } = useTerraWebapp();

  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      voteType: VoteType.Yes,
      token: {
        amount: undefined,
        asset: contracts[name].whaleToken,
      },
    },
  });
  const token = watch("token");
  const voteType = watch("voteType");

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("balance");
      onClose();
    },
    [onClose, queryClient]
  );

  const voteState = useVote({
    govContract: contracts[name].gov,
    pollId,
    vote: voteType,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    voteState.vote();
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
          render={({ field }) => (
            <AmountInput initialBalance={staker?.balance} {...field} />
          )}
        />
      </Box>

      <Box mt="4">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      {voteState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{voteState.error}</Text>
        </Box>
      )}

      <HStack spacing="6" width="full" mt="8">
        <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          flex="1"
          isLoading={voteState.txStep == TxStep.Estimating}
          isDisabled={voteState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default VoteForm;
