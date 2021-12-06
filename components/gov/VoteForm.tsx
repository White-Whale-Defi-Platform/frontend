import React, { FC, useCallback } from "react";
import { Box, chakra, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useGovStaker, useVote } from "modules/govern";
import { useFeeToString } from "hooks/useFeeToString";
import useContracts from "hooks/useContracts";
import { VoteType } from "types/poll";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PollVoteButtons from "components/gov/PollVoteButtons";

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
  const { whaleToken, gov } = useContracts();
  const staker = useGovStaker();
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      voteType: VoteType.Yes,
      token: {
        amount: undefined,
        asset: whaleToken,
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

  const state = useVote({
    govContract: gov,
    pollId,
    vote: voteType,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.vote();
  };

  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (state.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={state.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box
        border="2px"
        borderColor="whiteAlpha.200"
        borderRadius="3xl"
        px="4"
        py="8"
      >
        <Flex justify="center" mt="-12" mb="8">
          <Box bg="rgba(26,26,26,1)" px="8">
            <Heading size="md">Vote</Heading>
          </Box>
        </Flex>

        {/* <Text variant="light" textAlign="center" fontWeight="500">
                You are about to vote on “Proposal: Funding for Kado”. Please
                select side, set the amount and sumbit your vote.
              </Text> */}

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

        <Flex mt="8" justify="center">
          <Box mb="4">
            <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
          </Box>
        </Flex>

        {state.error && (
          <Box
            my="6"
            color="red.500"
            borderColor="red.500"
            borderWidth="1px"
            px="4"
            py="2"
            borderRadius="2xl"
          >
            <Text>{state.error}</Text>
          </Box>
        )}

        <Flex mt="4" justify="center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            px="12"
            isLoading={state.txStep == TxStep.Estimating}
            disabled={state.txStep != TxStep.Ready}
          >
            Vote
          </Button>
        </Flex>
      </Box>
    </chakra.form>
  );
};

export default VoteForm;
