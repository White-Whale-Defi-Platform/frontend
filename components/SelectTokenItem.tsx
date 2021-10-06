import React, { FC } from "react";
import { Text, HStack, MenuItem, Image } from "@chakra-ui/react";
import { useTokenInfo } from "@arthuryeti/terraswap";

type Props = {
  asset: string;
  onClick: any;
};

const SelectTokenItem: FC<Props> = ({ asset, onClick }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const icon = getIcon(asset);
  const symbol = getSymbol(asset);

  return (
    <MenuItem onClick={() => onClick(asset)}>
      <HStack>
        <Image src={icon} width="1rem" height="1rem" alt="Logo" />
        <Text>{symbol}</Text>
      </HStack>
    </MenuItem>
  );
};

export default SelectTokenItem;
