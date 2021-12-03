import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import Bond from "components/pages/Bond";

const bond: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Bond />
    </>
  );
};

export default bond;
