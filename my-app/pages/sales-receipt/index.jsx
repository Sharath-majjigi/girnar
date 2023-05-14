import { Link } from "components/Link";
import { useEffect, useState } from "react";
import { SalesReceiptModal } from "@/components";
import { deleteSalesReceipt, getSalesReceipts } from "@/services/salesReceipt";

const Index = () => {
  const [salesReceipts, setSalesReceipts] = useState();
  const [isModal, setIsModal] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(null);

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  useEffect(() => {
    getSalesReceipts(setSalesReceipts, refreshToken);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-6 mb-10">
        SALES RECEIPT DETAILS
      </h2>
      <section className="flex justify-between px-4">
        <div className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-white w-56 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
          </div>
          <button
            type="submit"
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLineCap="round"
                strokeLineJoin="round"
                strokeLineWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        <Link
          href="/sales-receipt/add"
          className="btn btn-sm no-underline btn-success px-4 py-1 text-lg"
        >
          Add Sales Receipt
        </Link>
      </section>

      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-x-2">id</th>
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2">Date</th>
            <th className="text-center border-r-2">Amount Received</th>
            <th className="border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {salesReceipts?.map((salesReceipt) => (
            <tr key={salesReceipt.id}>
              <td>{salesReceipt.id}</td>
              <td>{salesReceipt?.description}</td>
              <td>{salesReceipt.date}</td>
              <td>{salesReceipt?.amountReceived}</td>
              <td className="flex justify-evenly">
                <button
                  className="btn btn-sm btn-success px-3"
                  onClick={() => {
                    setIsModal(salesReceipt.id,);
                  }}
                >
                  View
                </button>
                {/* <Link
                  href={`/customer/edit/${user.id}`}
                  className="btn btn-sm btn-primary px-3"
                >
                  Edit
                </Link> */}
                <button
                  onClick={() => {
                    setIsDeleteModal(salesReceipt.id,);
                  }}
                  className="btn btn-sm btn-danger btn-delete-user px-3"
                >
                  Delete
                </button>
              </td>
              {isModal === salesReceipt.id && (
                <SalesReceiptModal
                  cancel={() => setIsModal(null)}
                  salesReceiptDetails={salesReceipt}
                />
              )}
              {isDeleteModal === salesReceipt.id && (
                <SalesReceiptModal
                  cancel={() => setIsDeleteModal(null)}
                  isDelete={isDeleteModal}
                  deleteUser={() =>
                    deleteSalesReceipt(
                      salesReceipt.id,
                      setSalesReceipts,
                      refreshToken,
                      getSalesReceipts
                    )
                  }
                  salesReceiptDetails={salesReceipt}
                />
              )}
            </tr>
          ))}
          {salesReceipts && !salesReceipts.length && (
            <div className="p-2 text-center text-xl">
              No Sales Receipts To Display
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
