import React, { FC, useCallback } from "react";
import { Box, HStack, chakra, Button } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import numeral from "numeral";
import { useFeeToString } from "@arthuryeti/terra";
import { useQueryClient } from "react-query";

import LoadingForm from "components/LoadingForm";
import AmountInput from "components/AmountInput";
import InlineStat from "components/InlineStat";
import { toAmount } from "libs/parse";
import { useWithdraw } from "modules/vault";
import { useBalance } from "hooks/useBalance";
import { ONE_TOKEN } from "constants/constants";

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

  if (withdrawState.isLoading) {
    return <LoadingForm />;
  }

  const initialBalance = numeral(balance)
    .divide(ONE_TOKEN)
    .multiply(withdrawState.ratio)
    .value()
    .toFixed();

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

      {withdrawState.isReady && (
        <Box mt="4">
          <InlineStat label="Tx Fee" value={`${feeString || "0.00"}`} />
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
          isDisabled={!withdrawState.isReady}
        >
          Confirm
        </Button>
      </HStack>
    </chakra.form>
  );
};

export default WithdrawForm;
