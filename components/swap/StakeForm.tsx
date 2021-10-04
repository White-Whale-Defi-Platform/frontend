import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useFeeToString } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useStake } from "modules/pool";
import useDebounceValue from "hooks/useDebounceValue";

import InlineStat from "components/InlineStat";
import AmountInput from "components/AmountInput";
import LoadingForm from "components/LoadingForm";

type Inputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  stakingContract: string;
  lpTokenContract: string;
  onClose: () => void;
};

const StakeForm: FC<Props> = ({
  stakingContract,
  lpTokenContract,
  onClose,
}) => {
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

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    onClose();
  }, [onClose, queryClient]);

  const handleError = useCallback(() => {
    queryClient.invalidateQueries("balance");
    onClose();
  }, [onClose, queryClient]);

  const stakeStep = useStake({
    stakingContract: stakingContract,
    lpTokenContract: lpTokenContract,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const submit = async () => {
    stakeStep.submit();
  };

  const feeString = useFeeToString(stakeStep.fee);

  if (stakeStep.isLoading) {
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

      {stakeStep.isReady && (
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
          isDisabled={!stakeStep.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default StakeForm;
