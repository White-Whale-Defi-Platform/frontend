import React, { FC, useCallback } from "react";
import { Box, HStack, chakra, Button, Text } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";

import { toAmount, format } from "libs/parse";
import { useDeposit } from "modules/vault";
import useDebounceValue from "hooks/useDebounceValue";
import useFeeToString from "hooks/useFeeToString";

import AmountInput from "components/AmountInput";
import LoadingForm from "components/LoadingForm";
import InlineStat from "components/InlineStat";
import { TxStep } from "@arthuryeti/terra";
import PendingForm from "components/PendingForm";

type IFormInputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  token: string;
  vault: any;
  onClose: () => void;
};

const DepositForm: FC<Props> = ({ token: tokenContract, vault, onClose }) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, watch } = useForm<IFormInputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: tokenContract ?? "uluna",
      },
    },
  });
  const token = watch("token");

  const debouncedAmount = useDebounceValue(token.amount, 500);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    onClose();
  }, [onClose, queryClient]);

  const depositState = useDeposit({
    token: token.asset,
    contract: vault.contract_addr,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    depositState.deposit();
  };

  const feeString = useFeeToString(depositState.fee);

  if (depositState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (depositState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={depositState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full">
        <Controller
          name="token"
          control={control}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Box mt="4">
        <Box mb="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
        </Box>
        {depositState.txStep == TxStep.Ready && (
          <InlineStat
            label="Minimum Deposit Amount"
            value={`${
              format(depositState.depositedAmount, "uusd") || "0.00"
            } UST`}
          />
        )}
      </Box>

      {depositState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{depositState.error}</Text>
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
          isLoading={depositState.txStep == TxStep.Estimating}
          disabled={depositState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default DepositForm;
