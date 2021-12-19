import React, { FC, useCallback } from "react";
import {
  Button,
  HStack,
  Box,
  Image,
  chakra,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "react-query";
import { useTokenInfo } from "@arthuryeti/terraswap";
import { fromTerraAmount, num, TxStep } from "@arthuryeti/terra";

import { useFeeToString } from "hooks/useFeeToString";
import { useWithdraw } from "modules/pool";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import PendingForm from "components/PendingForm";
import LoadingForm from "components/LoadingForm";
import { ONE_TOKEN } from "constants/constants";

type Inputs = {
  token: {
    asset: string;
    amount: string;
  };
};

type Props = {
  pairContract: string;
  lpTokenContract: string;
  onClose: () => void;
};

const WithdrawForm: FC<Props> = ({
  pairContract,
  lpTokenContract,
  onClose,
}) => {
  const { getIcon, getSymbol } = useTokenInfo();
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

  const debouncedAmount1 = useDebounceValue(token.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      queryClient.invalidateQueries("pool");
      // queryClient.invalidateQueries("staked");
      queryClient.invalidateQueries("balance");
      onClose();
    },
    [onClose, queryClient]
  );

  const state = useWithdraw({
    pairContract,
    lpTokenContract,
    amount: toAmount(debouncedAmount1),
    onSuccess: handleSuccess,
  });

  const submit = async () => {
    state.withdraw();
  };

  const feeString = useFeeToString(state.fee);

  const renderToken = (token) => {
    return (
      <Flex justify="space-between">
        <HStack>
          <Image
            src={getIcon(token)}
            width="1.5rem"
            height="1.5rem"
            alt="Logo"
          />
          <Text variant="light" fontWeight="500">
            {getSymbol(token)}
          </Text>
        </HStack>
        <Text>{fromTerraAmount(state.tokenAmounts[token], "0,0.000000")}</Text>
      </Flex>
    );
  };

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

      {state.tokenAmounts && (
        <Box py="3" my="6" bg="blackAlpha.300" px="4" borderRadius="2xl">
          <Box mb="4">{renderToken(state.token1)}</Box>
          {renderToken(state.token2)}
        </Box>
      )}

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
          isDisabled={state.txStep != TxStep.Ready}
        >
          Withdraw
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default WithdrawForm;
