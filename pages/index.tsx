import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import MyPage from "components/pages/MyPage";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <MyPage />
    </>
  );
};

export default DashboardPage;
