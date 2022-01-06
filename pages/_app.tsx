import React from "react";
import {
  WalletControllerChainOptions,
  getChainOptions,
  StaticWalletProvider,
  WalletProvider,
} from "@terra-money/wallet-provider";
import App, { AppProps } from "next/app";
import Head from "next/head";
import { QueryClientProvider, QueryClient } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import utc from "dayjs/plugin/utc";
import { TerraWebappProvider } from "@arthuryeti/terra";
import { TerraswapProvider } from "@arthuryeti/terraswap";

import Layout from "components/Layout";
import whitelist from "constants/whitelist.json";
import theme from "../theme";

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);

const MyApp = ({
  Component,
  pageProps,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) => {
  const [queryClient] = React.useState(() => new QueryClient());

  const main = (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <TerraWebappProvider>
              {/* @ts-expect-error */}
              <TerraswapProvider data={whitelist}>
                <CSSReset />
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </TerraswapProvider>
            </TerraWebappProvider>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );

  return process.browser ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
};

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const chainOptions = await getChainOptions();
  return { ...appProps, ...chainOptions };
};

export default MyApp;
