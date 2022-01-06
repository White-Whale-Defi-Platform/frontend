import React from "react";
import Head from "next/head";
import { NextPage } from "next";

import CreatePoll from "components/pages/CreatePoll";

const CreatePollPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>WhiteWhale Protocol</title>
      </Head>
      <CreatePoll />
    </>
  );
};

export default CreatePollPage;
