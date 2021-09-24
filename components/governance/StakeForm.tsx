import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useTerra, useFeeToString } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useStake } from "modules/govern";
import contracts from "constants/contracts.json";
import useDebounceValue from "hooks/useDebounceValue";

import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";

type Props = {
  onClose: () => void;
};

type IFormInputs = {
  token: {
    asset: string;
    amount: string;
  };
};

const StakeForm: FC<Props> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const {
    networkInfo: { name },
  } = useTerra();

  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: contracts[name].whaleToken,
      },
    },
  });
  const token = watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("staker");
    onClose();
  }, [onClose, queryClient]);

  const stakeState = useStake({
    tokenContract: token.asset,
    govContract: contracts[name].gov,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    stakeState.deposit();
  };

  const feeString = useFeeToString(stakeState.fee);

  if (stakeState.isLoading) {
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

      <Box mt="6">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
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
          isDisabled={!stakeState.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default StakeForm;
