import "/styles/globals.css";
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <main className="app-container">
        <Navbar />
        <Component {...pageProps} />;
        <ToastContainer />
      </main>
    </>
  );
}
