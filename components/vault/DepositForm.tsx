import React, { FC, useCallback } from "react";
import {
  Box,
  HStack,
  chakra,
  Flex,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";

import { toAmount, format } from "libs/parse";
import { useDeposit } from "modules/vault";
import useDebounceValue from "hooks/useDebounceValue";
import { useFeeToString } from "hooks/useFeeToString";

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

  const state = useDeposit({
    token: token.asset,
    contract: vault.contract_addr,
    amount: toAmount(debouncedAmount),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.deposit();
  };

  // @ts-expect-error
  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (state.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={state.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full" py="6" pt="16">
      <Box
        border="2px"
        borderColor="whiteAlpha.200"
        borderRadius="3xl"
        px="4"
        py="8"
      >
        <Flex justify="center" mt="-12" mb="8">
          <Box bg="rgba(26,26,26,1)" px="8">
            <Heading size="md">Deposit</Heading>
          </Box>
        </Flex>

        <Box width="85%" margin="0 auto">
          <Controller
            name="token"
            control={control}
            render={({ field }) => <AmountInput {...field} />}
          />

          <Flex mt="8" justify="center">
            <Box mb="4">
              <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
            </Box>
            {/* {state.txStep == TxStep.Ready && (
            <InlineStat
              label="Minimum Deposit Amount"
              value={`${
                format(state.depositedAmount, "uusd") || "0.00"
              } UST`}
            />
          )} */}
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

        {/* <Button variant="secondary" size="lg" flex="1" onClick={onClose}>
          Cancel
        </Button> */}
        <Flex mt="4" justify="center">
          <Button
            type="submit"
            variant="primary"
            size="md"
            px="12"
            isLoading={state.txStep == TxStep.Estimating}
            disabled={state.txStep != TxStep.Ready}
          >
            Deposit UST
          </Button>
        </Flex>
      </Box>
    </chakra.form>
  );
};

export default DepositForm;
