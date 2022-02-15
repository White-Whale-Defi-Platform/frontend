import React , { useEffect } from "react";
import Router from 'next/router'

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
