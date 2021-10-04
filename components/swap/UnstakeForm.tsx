import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra, useToast } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useFeeToString } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import AmountInput from "components/AmountInput";
import SuccessToast from "components/toasts/SuccessToast";
import InlineStat from "components/InlineStat";
import LoadingForm from "components/LoadingForm";
import { toAmount } from "libs/parse";
import { useUnstake } from "modules/pool";
import ArrowUpIcon from "components/icons/ArrowUpIcon";
import useDebounceValue from "hooks/useDebounceValue";

type Inputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  pairContract: string;
  lpTokenContract: string;
  stakingContract: string;
  onClose: () => void;
};

const UnstakeForm: FC<Props> = ({
  pairContract,
  lpTokenContract,
  stakingContract,
  onClose,
}) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: lpTokenContract,
      },
    },
  });
  const token = watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 200);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    onClose();
  }, [onClose, queryClient]);

  const handleError = useCallback(() => {
    onClose();
  }, [onClose]);

  const unstakeStep = useUnstake({
    stakingContract,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submit = async () => {
    unstakeStep.submit();
  };

  const feeString = useFeeToString(unstakeStep.fee);

  if (unstakeStep.isLoading) {
    return <LoadingForm />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      {unstakeStep.isReady && (
        <Box mt="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
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
          isDisabled={!unstakeStep.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default UnstakeForm;
