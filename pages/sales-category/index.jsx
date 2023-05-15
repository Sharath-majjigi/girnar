import {
  deleteSalesCategory,
  getSalesCategories,
} from "@/services/salesCategory";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const [salesCategories, setSalesCategories] = useState();

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  useEffect(() => {
    getSalesCategories(setSalesCategories, refreshToken);
  }, [refreshToken]);

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">
        SALES CATEGORY
      </h2>
      <div className="text-right">
        <Link
          href="/sales-category/add"
          className="btn btn-sm no-underline mr-2 btn-success px-4 py-1 text-lg"
        >
          Add Sales Category
        </Link>
      </div>
      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-r-2">Category</th>
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {salesCategories?.map((salesCategory) => (
            <tr key={salesCategory.category}>
              <td>{salesCategory.category}</td>
              <td>{salesCategory.description}</td>
              <td>
                <button
                  className="border-0 bg-red-500 text-white rounded px-4 py-2"
                  onClick={() =>
                    deleteSalesCategory(
                      salesCategory.category,
                      setSalesCategories,
                      refreshToken,
                      getSalesCategories
                    )
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;
