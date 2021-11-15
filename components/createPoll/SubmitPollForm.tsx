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
import useContracts from "hooks/useContracts";
import { VoteType } from "types/poll";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PollVoteButtons from "components/gov/PollVoteButtons";
import Card from "components/Card";
import PollInput from "components/PollInput";

type Inputs = {
  voteType: VoteType;
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  onClose?: () => void;
};

const SubmitPollForm: FC<Props> = ({ onClose }) => {
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

  const submit = async () => {
    console.log("oui");
  };

  // const feeString = useFeeToString(voteState.fee);

  // if (voteState.txStep == TxStep.Posting) {
  //   return <PendingForm />;
  // }

  // if (voteState.txStep == TxStep.Broadcasting) {
  //   return <LoadingForm txHash={voteState.txHash} />;
  // }

  return (
    <Card mb="8">
      <Text mb="6" color="#fff" fontSize="2xl" fontWeight="700">
        Submit text poll
      </Text>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        <Box width="full">
          <Controller
            name="token"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PollInput initialBalance={staker?.balance} {...field} />
            )}
          />
        </Box>

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

        {/* <Box mt="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
        </Box> */}

        {/* {voteState.error && (
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
        )} */}

        <HStack mt="8" width="full">
          <Button
            type="submit"
            variant="primary"
            size="md"
            flex="1"
            // isLoading={voteState.txStep == TxStep.Estimating}
            // isDisabled={voteState.txStep != TxStep.Ready}
          >
            Create Poll
          </Button>
        </HStack>
      </chakra.form>
    </Card>
  );
};

export default SubmitPollForm;
