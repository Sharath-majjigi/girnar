import React, { useState } from "react";
import styles from "styles/Login.module.css";
import Router from "next/router";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "@/services/api_base_url";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${BASE_URL}user/authenticate`,
        {
          email,
          password,
        }
      );
      const { access_token, refresh_token, role, userName, id } = response.data;
      if (response.status === 200) {
        const girnarUser = { access_token, refresh_token, role, userName, id };
        localStorage.setItem("user", JSON.stringify(girnarUser));
        localStorage.setItem("token", password);
        Router.push("/vendor");
        toast.success("logged in successfully");
      }
    } catch (error) {
      toast.error("Error while logging in");
    }
  };

  return (
    <div className={styles.main}>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 bg-opacity-30 w-[35rem] h-[30rem] rounded px-8 pt-6 pb-8"
        method="Post"
      >
        <div className="flex flex-col py-9">
          <Image
            src="/girnar_circle_white.png"
            alt="Picture of the author"
            width={100}
            height={100}
          />

          <h1 className="text-3xl text-white flex item-center justify-center  bold">
            Login your Account
          </h1>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Email"
            type="Email"
            placeholder="Email"
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border border-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div className="text-right mb-3">
          <small
            className="cursor-pointer"
            onClick={() => Router.push("/forgot-password")}
          >
            Forgot Password?
          </small>
        </div>
        <div className="flex items-center flex-col flex-end  justify-between">
          <button
            className="bg-gradient-to-r from-orange-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            login
          </button>
        </div>
      </form>
      <p className="text-center text-black-500 text-xl">
        &copy;2023 - PT Sundish Travel Indah -All rights reserved
      </p>
    </div>
  );
};

export { LoginForm };
