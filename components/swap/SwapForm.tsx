import React, { FC, useEffect, useCallback } from "react";
import { Box, Flex, chakra, IconButton, Button, Text } from "@chakra-ui/react";
import { num, TxStep, useTerraWebapp } from "@arthuryeti/terra";
import { useForm, Controller } from "react-hook-form";
import { useSwap } from "@arthuryeti/terraswap";
import numeral from "numeral";

import { DEFAULT_SLIPPAGE } from "constants/constants";
import contracts from "constants/contracts.json";
import { toAmount } from "libs/parse";
import useDebounceValue from "hooks/useDebounceValue";

import DoubleArrowsIcon from "components/icons/DoubleArrowsIcon";
import LoadingForm from "components/LoadingForm";
import PendingForm from "components/PendingForm";
import AmountInput from "components/AmountInput";
import SwapFormInfos from "components/swap/SwapFormInfos";

type Inputs = {
  token1: {
    asset: string;
    amount: string;
  };
  token2: {
    asset: string;
    amount: string;
  };
  slippage: string;
};

const SwapForm: FC = () => {
  const {
    network: { name },
  } = useTerraWebapp();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState,
    reset: resetForm,
  } = useForm<Inputs>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: contracts[name].whaleToken,
      },
      token2: {
        amount: undefined,
        asset: "uusd",
      },
      slippage: String(DEFAULT_SLIPPAGE),
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const slippage = watch("slippage");

  const debouncedAmount = useDebounceValue(token1.amount, 200);

  const handleSuccess = useCallback(
    (txHash) => {
      setValue("token1.amount", "");
      setValue("token2.amount", "");
    },
    [setValue]
  );

  const handleError = useCallback((txHash) => {
    if (txHash) {
      // eslint-disable-next-line no-console
      console.log("ouii");
    }
  }, []);

  const swapState = useSwap({
    token1: token1.asset,
    token2: token2.asset,
    amount: toAmount(debouncedAmount),
    slippage,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  useEffect(() => {
    if (
      // @ts-expect-error
      formState.name == "token1" &&
      token1.amount != null &&
      num(token1.amount).gt("0") &&
      swapState.simulated != null
    ) {
      const newAmount = numeral(token1.amount)
        .divide(swapState.simulated?.price)
        .value()
        .toFixed(6);

      setValue("token2.amount", newAmount);
    }

    if (
      // @ts-expect-error
      formState.name == "token1" &&
      token1.amount.length == 0
    ) {
      setValue("token2.amount", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token1.amount]);

  useEffect(() => {
    if (
      // @ts-expect-error
      formState.name == "token2" &&
      token2.amount != null &&
      num(token2.amount).gt("0") &&
      swapState.simulated != null
    ) {
      const newAmount = numeral(token2.amount)
        .multiply(swapState.simulated?.price2)
        .value()
        .toFixed(6);

      setValue("token1.amount", newAmount);
    }

    if (
      // @ts-expect-error
      formState.name == "token2" &&
      token2.amount.length == 0
    ) {
      setValue("token1.amount", "");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token2.amount]);

  const reverse = () => {
    setValue("token1", {
      asset: token2.asset,
      amount: "",
    });
    setValue("token2", {
      asset: token1.asset,
      amount: "",
    });
  };

  const submit = async () => {
    swapState.swap();
  };

  if (swapState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (swapState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={swapState.txHash} />;
  }

  return (
    <chakra.form onSubmit={handleSubmit(submit)} width="full">
      {/* <Box>
        <IconButton
          aria-label="Settings"
          variant="primary"
          icon={<GearIcon width="1rem" height="1rem" />}
          onClick={() => console.log("oui")}
        />
      </Box> */}
      <Box>
        <Controller
          name="token1"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <AmountInput {...field} />}
        />
      </Box>

      <Flex justify="center" align="center" color="brand.600" my="6">
        <IconButton
          aria-label="Reverse"
          variant="primary"
          icon={<DoubleArrowsIcon width="1rem" height="1rem" />}
          onClick={reverse}
        />
      </Flex>

      <Box width="full">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput isMaxDisabled hideBalance {...field} />
          )}
        />
      </Box>

      <Box mt="6">
        <SwapFormInfos
          token1={token1.asset}
          token2={token2.asset}
          fee={swapState.fee}
          slippage={slippage}
          exchangeRate={swapState.simulated?.price}
          minimumReceive={swapState.minReceive}
          control={control}
        />
      </Box>

      {swapState.error && (
        <Box
          my="6"
          color="red.500"
          borderColor="red.500"
          borderWidth="1px"
          px="4"
          py="2"
          borderRadius="2xl"
        >
          <Text>{swapState.error}</Text>
        </Box>
      )}

      <Flex justify="center" mt="8">
        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={swapState.txStep == TxStep.Estimating}
          isDisabled={swapState.txStep != TxStep.Ready}
          minW="64"
        >
          Swap
        </Button>
      </Flex>
    </chakra.form>
  );
};

export default SwapForm;
