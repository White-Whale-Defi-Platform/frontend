import React, { FC, useEffect, useCallback } from "react";
import {
  Button,
  HStack,
  Text,
  Box,
  chakra,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { fromTerraAmount, num, TxStep, useBalance } from "@arthuryeti/terra";

import { toAmount } from "libs/parse";
import { useFeeToString } from "hooks/useFeeToString";
import { useProvide, calculateTokenAmount } from "modules/pool";
import { gt } from "libs/math";
import useFinder from "hooks/useFinder";
import useDebounceValue from "hooks/useDebounceValue";

import PlusCircleIcon from "components/icons/PlusCircleIcon";
import InlineStat from "components/InlineStat";
import AmountInput from "components/AmountInput";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";

type Inputs = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
};

type Props = {
  pairContract: string;
  pool: any;
  onClose: () => void;
};

const ProvideForm: FC<Props> = ({ pairContract, pool, onClose }) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      token1: pool.token1.asset,
      amount1: "",
      token2: pool.token2.asset,
      amount2: "",
    },
  });
  const { token1, amount1, token2, amount2 } = watch();

  const debouncedAmount1 = useDebounceValue(amount1, 200);
  const debouncedAmount2 = useDebounceValue(amount2, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("pool");
      queryClient.invalidateQueries("staked");
      queryClient.invalidateQueries("balance");
      // queryClient.invalidateQueries("stakerInfo");
      onClose();
    },
    [onClose, queryClient]
  );

  const handleError = useCallback(
    (txHash) => {
      onClose();
    },
    [onClose]
  );

  const state = useProvide({
    contract: pairContract,
    pool: pool,
    token1,
    token2,
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const balances = {
    token1: fromTerraAmount(useBalance(token1), "0.000000"),
    token2: fromTerraAmount(useBalance(token2), "0.000000"),
  };

  const token1Max = Math.min(
    +balances.token1,
    num(balances.token2)
      .times(num(pool.token1.share).div(pool.token2.share))
      .dp(6)
      .toNumber()
  );

  const token2Max = Math.min(
    +balances.token2,
    num(balances.token1)
      .div(num(pool.token1.share).div(pool.token2.share))
      .dp(6)
      .toNumber()
  );

  const handleAmount1Change = (value) => {
    const normalizedValue = value || 0;
    const ratio = num(pool.token2.share).div(pool.token1.share);
    const newAmount2 = num(normalizedValue).times(ratio).toFixed(6);
    setValue("amount1", normalizedValue);
    setValue("amount2", newAmount2);
  };

  const handleAmount2Change = (value) => {
    const normalizedValue = value || 0;
    const ratio = num(pool.token2.share).div(pool.token1.share);
    const newAmount1 = num(normalizedValue).div(ratio).toFixed(6);
    setValue("amount1", newAmount1);
    setValue("amount2", normalizedValue);
  };

  const submit = async () => {
    state.provideLiquidity();
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
      <Box width="full" mt="8">
        <Controller
          name="amount1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NewAmountInput
              asset={token1}
              max={token1Max}
              {...field}
              onChange={handleAmount1Change}
            />
          )}
        />
      </Box>

      <Flex justify="center" color="whiteAlpha.300" my="6">
        <PlusCircleIcon />
      </Flex>

      <Box width="full">
        <Controller
          name="amount2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NewAmountInput
              asset={token2}
              max={token2Max}
              {...field}
              onChange={handleAmount2Change}
            />
          )}
        />
      </Box>

      <Flex mt="8" justify="center">
        <Box mb="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
        </Box>
      </Flex>

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
          isDisabled={state.txStep != TxStep.Ready}
        >
          Provide
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default ProvideForm;
