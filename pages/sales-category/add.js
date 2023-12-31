import { postSalesCategory } from "@/services/salesCategory";
import Router from "next/router";
import React, { useState } from "react";

const Add = () => {
  const [details, setDetails] = useState({
    category: "",
    description: "",
  });
  const { category, description } = details;

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle =
    "flex gap-6 mt-4 flex-wrap justify-between w-3/4 mx-auto";

  const handleInput = (e, setDetails) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold text-center mt-6 mb-10">
        ADD SALES CATEGORY
      </h2>
      <div className={containerStyle}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            className={inputStyle}
            name="category"
            value={category}
            onChange={(e) => handleInput(e, setDetails)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className={inputStyle}
            name="description"
            value={description}
            onChange={(e) => handleInput(e, setDetails)}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="btn btn-sm btn-success px-4 py-2"
          onClick={() => postSalesCategory(details, refreshToken)}
        >
          Save
        </button>
        <button
          className="border-2 border-red-500 text-red-500 rounded px-4 py-2"
          onClick={() => Router.push("/sales-category")}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export default Add;
