import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Swap from "components/pages/Swap";

const SwapPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Swap />
    </>
  );
};

export default SwapPage;
