import React from "react";
import Head from "next/head";

import { NextPage } from "next";
import Gov from "components/pages/Gov";

const GovPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Gov />
    </>
  );
};

export default GovPage;
