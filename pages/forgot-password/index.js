import Router from "next/router";
import React, { useState } from "react";

const Index = () => {
  const [user, setUser] = useState({ userId: "", email: "" });
  const { userId, email } = user;

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex flex-col gap-6 justify-between w-fit mx-auto";

  return (
    <section>
      <h2 className="text-2xl font-semibold w-fit mx-auto my-4">
        Reset Password
      </h2>
      <div className={containerStyle}>
        <div>
          <label htmlFor="userId" className="w-20">
            User Id:
          </label>
          <input
            type="text"
            id="userId"
            className={inputStyle}
            name="userId"
            value={userId}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
        </div>
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
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <button className="btn btn-sm btn-success px-4 py-2" onClick={() => {}}>
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
    </section>
  );
};

export default Index;
