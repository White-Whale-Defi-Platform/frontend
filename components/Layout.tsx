import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { useTerraWebapp } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Navbar from "components/Navbar";
import RadialGradient from "components/RadialGradient";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const { network } = useTerraWebapp();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isInitializing) {
    return null;
  }

  return (
    <>
      <Global
        styles={{
          "html,body": {
            height: "100%",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          },
          body: {
            background: "#191919",
          },
          "#chakra-toast-manager-bottom-right": {
            right: "32px!important",
            bottom: "32px!important",
          },
        }}
      />
      <RadialGradient />
      <Flex direction="column">
        <Navbar />
        <Box flex="1" px="10">
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default Layout;
