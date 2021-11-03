import React, { FC, useCallback } from "react";
import { Button, HStack, Box, chakra, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import { toAmount } from "libs/parse";
import { useStake } from "modules/govern";
import useFeeToString from "hooks/useFeeToString";
import useContracts from "hooks/useContracts";
import useDebounceValue from "hooks/useDebounceValue";

import LoadingForm from "components/LoadingForm";
import PendingForm from "components/PendingForm";
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
  const { whaleToken, gov } = useContracts();

  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: whaleToken,
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
    govContract: gov,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    stakeState.deposit();
  };

  // @ts-expect-error
  const feeString = useFeeToString(stakeState.fee);

  if (stakeState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (stakeState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={stakeState.txHash} />;
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

      {stakeState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{stakeState.error}</Text>
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
          isLoading={stakeState.txStep == TxStep.Estimating}
          disabled={stakeState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default StakeForm;
