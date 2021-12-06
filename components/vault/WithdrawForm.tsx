import React, { FC, useCallback } from "react";
import {
  Box,
  HStack,
  chakra,
  Button,
  Text,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { num, TxStep, useBalance } from "@arthuryeti/terra";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";

import { useFeeToString } from "hooks/useFeeToString";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/vault";

import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import WithdrawAmountInput from "components/WithdrawAmountInput";
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

  const state = useWithdraw({
    lpToken: vault.liquidity_token,
    contract: vault.contract_addr,
    amount: token.amount,
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.withdraw();
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
            <Heading size="md">Withdraw</Heading>
          </Box>
        </Flex>

        <Box width="85%" margin="0 auto">
          <Controller
            name="token"
            control={control}
            render={({ field }) => (
              <WithdrawAmountInput
                initialBalance={balance}
                ratio={state.ratio}
                {...field}
              />
            )}
          />

          <Flex mt="8" justify="center">
            <Box mb="4">
              <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
            </Box>
          </Flex>
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

        <Flex mt="4" justify="center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            px="12"
            isLoading={state.txStep == TxStep.Estimating}
            disabled={state.txStep != TxStep.Ready}
          >
            Withdraw
          </Button>
        </Flex>
      </Box>
    </chakra.form>
  );
};

export default WithdrawForm;
