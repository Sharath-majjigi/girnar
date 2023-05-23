import axios from "axios";
import Router from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Index = () => {
  const [user, setUser] = useState({
    confirmPassword: "",
    password: "",
    email: "",
  });
  const { confirmPassword, password, email } = user;

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex flex-col gap-6 justify-between w-fit mx-auto";

  const handleResetPassword = async () => {
    try {
      const res = await axios({
        method: "patch",
        url: "http://18.139.85.219:8088/api/v1/user/change-password",
        // headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...user,
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Password changed successfully");
        Router.push("/");
      }
    } catch (error) {
      toast.error("Error occurred while changing password");
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold w-fit mx-auto my-4">
        Reset Password
      </h2>
      <div className={containerStyle}>
        <div>
          <label htmlFor="email" className="w-20">
            Email:
          </label>
          <input
            type="text"
            id="email"
            className={inputStyle}
            name="email"
            value={email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="password" className="w-20">
            Password:
          </label>
          <input
            type="text"
            id="password"
            className={inputStyle}
            name="password"
            value={password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="w-20">
            Confirm Password:
          </label>
          <input
            type="text"
            id="confirmPassword"
            className={inputStyle}
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="btn btn-sm btn-success px-4 py-2"
          onClick={() => {
            if (
              password &&
              email &&
              confirmPassword &&
              password !== confirmPassword
            ) {
              handleResetPassword();
            } else {
              toast.warn("Please check the fields before reset");
            }
          }}
        >
          Reset
        </button>
        <button
          className="border-2 border-red-500 text-red-500 rounded px-4 py-2"
          onClick={() => {
            Router.push("/");
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default Index;
