import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Router from "next/router";

const Navbar = () => {
  const user = localStorage.getItem("user");

  return (
    <>
      <nav className="bg-blue-300 sticky top-0 list-none h-16 pt-4">
        <div className="flex justify-center gap-2">
          <Link href="/vendor" className="pr-[10vh]">
            <li>Vendor</li>
          </Link>

          <Link href="/customer">
            <li>Customer</li>
          </Link>

          <div>
            <button
              className="peer flex px-5  hover:bg-transparant-700 text-black"
            >
              Purchase
              <svg
                className="w-4 h-4 bg-transparent ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className="hidden peer-hover:flex hover:flex
            w-[170px]
            flex-col bg-white drop-shadow-lg"
            >
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li href="/" className="px-5 py-3 hover:bg-gray-200">
                <Link href="/payment">Payments</Link>
              </li>
              <li href=" " className="px-5 py-3 hover:bg-gray-200">
                <Link href="/purchase">Purchase Order</Link>
              </li>
            </div>
          </div>

          <div>
            <button className="peer flex px-5  hover:bg-transparant-700 text-black">
              {/* // onClick={() => setSales(!sales)} */}
              {/* // className="overflow-hidden  w-[14vh] flex justify-center items-center hover:cursor-pointer" */}
              Sales
              <svg
                className="w-4  h-5 pt-1 bg-transparent ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className="hidden peer-hover:flex hover:flex
            w-[150px]
            flex-col bg-white drop-shadow-lg"
            >
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li className="px-5 py-3 hover:bg-gray-200">
                <Link href="/sales-entry">Invoice</Link>
              </li>
              <li className="px-5 py-3 hover:bg-gray-200">
                <Link href="/sales-receipt">Receipt</Link>
              </li>
            </div>
          </div>

          <div>
            <div className="peer flex px-5  hover:bg-transparant-700 text-black">
              Admin
              <svg
                className="w-4 h-4 bg-transparent ml-2"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
            <div
              className="hidden peer-hover:flex hover:flex 
            w-[150px]
            flex-col bg-white drop-shadow-lg"
            >
              {/* className={`${dropdownOpen ? `top-full opacity-100 visible` : 'top-[110%] invisible opacity-0'} absolute left-0 z-40 mt-2 w-full rounded border-[.5px] border-light bg-white py-5 shadow-card transition-all`}> */}
              <li href="/" className="px-5 py-3 hover:bg-gray-200">
                <Link href="/" onClick={() => setAdmin(!admin)}>
                  Sales Category
                </Link>
              </li>
              <li href=" " className="px-5 py-3 hover:bg-gray-200">
                <Link href="/salesReceipt" onClick={() => setAdmin(!sales)}>
                  Payment Type
                </Link>
              </li>
              <li href=" " className="px-5 py-3 hover:bg-gray-200">
                <Link href="/loyalty" onClick={() => setAdmin(!admin)}>
                  Loyalty Point
                </Link>
              </li>
              <li href=" " className="px-5 py-3 hover:bg-gray-200">
                <Link href="/reedeemloyalty" onClick={() => setAdmin(!admin)}>
                  Reedem Loyalty Point
                </Link>
              </li>
            </div>
          </div>

          {user ? (
            <li
              className="cursor-pointer"
              onClick={() => {
                localStorage.clear();
                Router.push("/login");
              }}
            >
              Logout
            </li>
          ) : (
            <Link href="/login">
              <li>Login</li>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
