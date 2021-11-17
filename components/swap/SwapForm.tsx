import React, { FC, useEffect, useCallback, useState } from "react";
import { Box, Flex, chakra, IconButton, Button, Text } from "@chakra-ui/react";
import { num, TxStep, fromTerraAmount } from "@arthuryeti/terra";
import { useForm, Controller } from "react-hook-form";
import { useSwap } from "@arthuryeti/terraswap";

import { DEFAULT_SLIPPAGE, ONE_TOKEN } from "constants/constants";
import { toAmount } from "libs/parse";
import useContracts from "hooks/useContracts";
import useDebounceValue from "hooks/useDebounceValue";
import { gt } from "libs/math";

import DoubleArrowsIcon from "components/icons/DoubleArrowsIcon";
import LoadingForm from "components/LoadingForm";
import PendingForm from "components/PendingForm";
import AmountInput from "components/AmountInput";
import SwapFormInfos from "components/swap/SwapFormInfos";
import SwapFormSuccess from "components/swap/SwapFormSuccess";

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
  const { whaleToken } = useContracts();
  const [currentInput, setCurrentInput] = useState(null);

  console.log(whaleToken);

  const { control, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: {
      token1: {
        amount: undefined,
        asset: "uusd",
      },
      token2: {
        amount: undefined,
        asset: whaleToken,
      },
      slippage: String(DEFAULT_SLIPPAGE),
    },
  });
  const token1 = watch("token1");
  const token2 = watch("token2");
  const slippage = watch("slippage");

  const debouncedAmount1 = useDebounceValue(token1.amount, 200);
  const debouncedAmount2 = useDebounceValue(token2.amount, 200);

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
    amount1: toAmount(debouncedAmount1),
    amount2: toAmount(debouncedAmount2),
    slippage,
    reverse: currentInput == "token2",
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleToken1Change = (
    value: {
      asset: string;
      amount: string;
    },
    onChange: (value: { asset: string; amount: string }) => void
  ) => {
    if (
      value.amount != null &&
      num(value.amount).gt("0") &&
      swapState.simulated != null
    ) {
      const amount = num(swapState.simulated?.amount).div(ONE_TOKEN);
      const newAmount = num(value.amount).times(amount).toFixed(3);

      setValue("token2.amount", newAmount);
    }

    if (value.amount?.length == 0) {
      setValue("token2.amount", "");
    }

    setCurrentInput("token1");
    onChange(value);

    if (token1.asset != value.asset) {
      setValue("token1.amount", "");
      setValue("token2.amount", "");
    }
  };

  const handleToken2Change = (
    value: {
      asset: string;
      amount: string;
    },
    onChange: (value: { asset: string; amount: string }) => void
  ) => {
    if (
      value.amount != null &&
      num(value.amount).gt("0") &&
      swapState.simulated != null
    ) {
      const amount = num(swapState.simulated?.amount).div(ONE_TOKEN);
      const newAmount = num(value.amount).div(amount).toFixed(3);

      setValue("token1.amount", newAmount);
    }

    if (value.amount?.length == 0) {
      setValue("token1.amount", "");
    }

    setCurrentInput("token2");
    onChange(value);
  };

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

  useEffect(() => {
    if (gt(swapState.simulated?.amount, "0")) {
      const name = currentInput == "token2" ? "token1.amount" : "token2.amount";

      setValue(name, fromTerraAmount(swapState.simulated?.amount, "0.000"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swapState.simulated]);

  const submit = async () => {
    swapState.swap();
  };

  if (swapState.txStep == TxStep.Posting) {
    return <PendingForm />;
  }

  if (swapState.txStep == TxStep.Broadcasting) {
    return <LoadingForm txHash={swapState.txHash} />;
  }

  if (swapState.txStep == TxStep.Success) {
    return (
      <SwapFormSuccess txInfo={swapState.txInfo} onClick={swapState.reset} />
    );
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
          render={({ field }) => (
            <AmountInput
              {...field}
              onChange={(v) => handleToken1Change(v, field.onChange)}
            />
          )}
        />
      </Box>

      <Flex justify="center" align="center" color="brand.500" my="8">
        <IconButton
          aria-label="Reverse"
          variant="ghost"
          _focus={{ boxShadow: "none" }}
          _active={{ background: "transparent" }}
          _hover={{ background: "transparent", color: "white" }}
          icon={<DoubleArrowsIcon width="2rem" height="2rem" />}
          onClick={reverse}
        />
      </Flex>

      <Box width="full">
        <Controller
          name="token2"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <AmountInput
              isMaxDisabled
              hideBalance
              {...field}
              onChange={(v) => handleToken2Change(v, field.onChange)}
            />
          )}
        />
      </Box>

      <Box mt="8">
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
