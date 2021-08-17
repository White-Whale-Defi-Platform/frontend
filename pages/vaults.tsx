import React from "react";

import Vaults from "components/pages/Vaults";

import Head from "next/head";
import { NextPage } from "next";

const VaultsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Vaults />
    </>
  );
};

export default VaultsPage;
