import React, { FC, useCallback } from "react";
import { Button, Box, chakra, Heading, Flex } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";
import { useStake } from "modules/pool";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";

type Inputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  tokenContract: string;
  onClose: () => void;
};

const BondForm: FC<Props> = ({ tokenContract, onClose }) => {
  const { getSymbol } = useTokenInfo();
  const queryClient = useQueryClient();
  const { control, handleSubmit, watch } = useForm<Inputs>({
    defaultValues: {
      token: {
        amount: undefined,
        asset: tokenContract,
      },
    },
  });
  const token = watch("token");
  const symbol = getSymbol(token.asset);

  const debouncedAmount1 = useDebounceValue(token.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("pool");
      queryClient.invalidateQueries("staked");
      onClose();
    },
    [onClose, queryClient]
  );

  const state = useStake({
    lpTokenContract: tokenContract,
    amount: toAmount(debouncedAmount1),
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
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      <Box width="full" mt="8">
        <Controller
          name="token"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Flex mt="8" justify="center">
        <Box mb="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
        </Box>
      </Flex>

      <Flex mt="4" justify="center">
        <Button
          type="submit"
          variant="primary"
          size="md"
          px="12"
          isLoading={state.txStep == TxStep.Estimating}
          // isDisabled={state.txStep != TxStep.Ready}
        >
          Deposit {symbol}
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default BondForm;
