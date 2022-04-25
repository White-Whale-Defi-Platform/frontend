import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Dashboard from "components/pages/Dashboard";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Dashboard />
    </>
  );
};

export default DashboardPage;
