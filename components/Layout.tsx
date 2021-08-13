import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Global } from "@emotion/react";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import { useTerra } from "contexts/TerraContext";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const { isLoading } = useTerra();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  if (isLoading || isInitializing) {
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
      <Flex direction="column">
        <Navbar />
        <Box flex="1" px="10">
          {children}
        </Box>
        {/* <Footer /> */}
      </Flex>
    </>
  );
};

export default Layout;
