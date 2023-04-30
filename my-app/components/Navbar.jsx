import React, { useState } from 'react'
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from 'next/image';

import styles from "@/styles/Navbar.module.css";
const Navbar = () => {

  // const { hasMounted } = useMounted();
  // const nav = hasMounted ? null : 0;

  return (
    <>

      {/* {" "}
      {/* <nav className={styles.mainnav}> */}
      {/* <nav className="flex  bg-pink text-black fixed top-0 decoration-none list-none h-[10vh] w-full item-center justify-center space-x-9 py-7"> */}
      <nav className="flex  bg-blue-300 text-black fixed top-0 decoration-none list-none h-[11vh] w-full item-center space-x-2 justify-between pr-[10vh] py-[4vh]">
        {/* <nav className="flex  bg-blue-300 text-black fixed top-0 decoration-none list-none h-[10vh] w-full item-center space-x-2 justify-end pr-[10vh] py-4"> */}
        {/* <Link href="/">
          {" "}
          <li>Home</li>{" "}
        </Link> */}
        {/* <div className='flex justify-center  '> */}
        {/* <Image

            src="/girnar_circle_white.png"
            alt="Picture of the author"
            width={100}
            height={100}
          />
        </div> */}
        <div className='flex  text-black  decoration-none list-none w-full item-center space-x-2 justify-end align-center pb-9 pr-[10vh] '>

          <Link href="/vendor" className='pr-[10vh]'>
            {" "}
            <li>Vendor</li>{" "}
          </Link>

          <Link href="/customers">
            {" "}
            <li>Customer</li>{" "}
          </Link>



          <Link href="/purchases">
            {" "}


            <button
              // onClick={() => setPurchase(!purchase)}
              className="peer flex px-5  hover:bg-transparant-700 text-black">

              Purchase <svg className="w-4 h-4 bg-transparent ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>


            <div
              className='hidden peer-hover:flex hover:flex
            w-[170px]
            flex-col bg-white drop-shadow-lg'>
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li
                href="/"
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/payment' >

                  Payment

                </Link>
              </li>
              <li
                href=" "

                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/payment/add'>New PO</Link>
              </li>
            </div>

            {" "}
          </Link>



          <Link href="/sales">
            {" "}


            <button className='peer flex px-5  hover:bg-transparant-700 text-black'>
              {/* // onClick={() => setSales(!sales)} */}
              {/* // className="overflow-hidden  w-[14vh] flex justify-center items-center hover:cursor-pointer" */}
              Sales <svg className="w-4  h-5 pt-1 bg-transparent ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div
              className='hidden peer-hover:flex hover:flex
            w-[150px]
            flex-col bg-white drop-shadow-lg'>
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li
                href="/"
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/' >
                  Invoice
                </Link>
              </li>
              <li
                href=" "
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/salesReceipt'  >Receipt</Link>
              </li>

            </div>

            {" "}
          </Link>

          <Link href='/loyalty'>
            {" "}


            <div

              className='peer flex px-5  hover:bg-transparant-700 text-black'>

              Admin <svg className="w-4 h-4 bg-transparent ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>


            <div
              className='hidden peer-hover:flex hover:flex 
            w-[150px]
            flex-col bg-white drop-shadow-lg'>
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li
                href="/"
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/' onClick={() => setAdmin(!admin)}>
                  Sales Category
                </Link>
              </li>
              <li
                href=" "
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/salesReceipt' onClick={() => setAdmin(!sales)} >Payment Type</Link>
              </li>
              <li
                href=" "
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/loyalty' onClick={() => setAdmin(!admin)} >Loyalty Point</Link>
              </li>
              <li
                href=" "
                className="px-5 py-3 hover:bg-gray-200"
              >
                <Link href='/reedeemloyalty' onClick={() => setAdmin(!admin)} >Reedem Loyalty Point</Link>
              </li>

            </div>









            {" "}
          </Link>



          <Link href="/login">
            {" "}
            <li>Login</li>{" "}
          </Link>
        </div >
      </nav >

    </>
  );

};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });

