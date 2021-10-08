import React, { FC, useCallback } from "react";
import { Box, HStack, chakra, Button, Text } from "@chakra-ui/react";
import { TxStep, useBalance } from "@arthuryeti/terra";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";

import useFeeToString from "hooks/useFeeToString";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/vault";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";

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

const WithdrawForm: FC<Props> = ({ token: tokenContract, vault, onClose }) => {
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

  const balance = useBalance(vault.liquidity_token);

  const handleSuccess = useCallback(() => {
    queryClient.invalidateQueries("balance");
    onClose();
  }, [onClose, queryClient]);

  const withdrawState = useWithdraw({
    lpToken: vault.liquidity_token,
    contract: vault.contract_addr,
    amount: toAmount(token.amount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    withdrawState.withdraw();
  };

  const feeString = useFeeToString(withdrawState.fee);

  if (withdrawState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (withdrawState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={withdrawState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full">
        <Controller
          name="token"
          control={control}
          render={({ field }) => (
            <AmountInput initialBalance={balance} {...field} />
          )}
        />
      </Box>

      <Box mt="4">
        <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
      </Box>

      {withdrawState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{withdrawState.error}</Text>
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
          isLoading={withdrawState.txStep == TxStep.Estimating}
          disabled={withdrawState.txStep != TxStep.Ready}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default WithdrawForm;
