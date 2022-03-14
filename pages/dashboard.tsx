import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import Dashboard from "components/pages/Dashboard";
import Footer from "components/Footer";

const DashboardPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <Dashboard />
      <Footer/>
    </>
  );
};

export default DashboardPage;
