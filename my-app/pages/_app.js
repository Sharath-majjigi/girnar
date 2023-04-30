import "/styles/globals.css";
import React, { useState ,useEffect} from 'react'
import Navbar from "../components/Navbar";
import Head from "next/head";

import { Alert } from "components/Alert";

export default function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <div className="app-container">

        <Navbar />
        {/* <Alert/> */}
      <Component {...pageProps} />;
      </div>
    </>
  );
}

