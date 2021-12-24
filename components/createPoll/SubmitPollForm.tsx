import React, { FC, useCallback, useMemo } from "react";
import {
  Button,
  HStack,
  Box,
  chakra,
  Input,
  Divider,
  Flex,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { TxStep, useTerraWebapp } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useGovStaker, useCreatePoll } from "modules/govern";
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
  title: string;
  description: string;
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
      title: "",
      description: "",
    },
  });
  const { title, description } = watch();

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("balance");
    },
    [onClose, queryClient]
  );

  const data = useMemo(() => {
    return {
      title,
      description,
    };
  }, [title, description]);

  const state = useCreatePoll({
    govContract: gov,
    tokenContract: whaleToken,
    data,
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.submit();
  };

  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (state.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={state.txHash} />;
  }

  return (
    <Card mb="8">
      <Text mb="6" color="#fff" fontSize="2xl" fontWeight="700">
        Submit text poll
      </Text>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        <Box width="full">
          <Box mb="2">
            <Text mx="6" as="span" variant="light" color="white" fontSize="lg">
              Title
            </Text>
          </Box>
          <Box mb="2">
            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  size="lg"
                  variant="brand"
                  placeholder="Enter your title"
                  _placeholder={{ color: "whiteAlpha.300" }}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>
        <Box width="full">
          <Box mb="2">
            <Text mx="6" as="span" variant="light" color="white" fontSize="lg">
              Description
            </Text>
          </Box>
          <Box mb="2">
            <Controller
              name="description"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Textarea
                  variant="brand"
                  placeholder="Enter your title"
                  _placeholder={{ color: "whiteAlpha.300" }}
                  {...field}
                />
              )}
            />
          </Box>
        </Box>

        {/* <Box width="full">
          <Controller
            name="token"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <AmountInput {...field} />}
          />
        </Box> */}

        <Box mt="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
        </Box>

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

        <HStack mt="8" width="full">
          <Button
            type="submit"
            variant="primary"
            size="md"
            flex="1"
            // isLoading={state.txStep == TxStep.Estimating}
            // isDisabled={state.txStep != TxStep.Ready}
          >
            Create Poll
          </Button>
        </HStack>
      </chakra.form>
    </Card>
  );
};

export default SubmitPollForm;
