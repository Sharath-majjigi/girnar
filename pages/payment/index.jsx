import { Link } from "components/Link";
import { useEffect, useState } from "react";
import { PaymentModal } from "@/components";
import { deletePayment, getPayment } from "@/services/payments";

const Index = () => {
  const [payments, setPayments] = useState(undefined);
  const [searchText, setSearchText] = useState("");
  const [isModal, setIsModal] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(null);
  const [user, setUser] = useState(undefined);
  const [refreshToken, setRefreshToken] = useState(undefined);
 
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    if (user !== undefined) {
      setRefreshToken(JSON.parse(user)?.refresh_token);
    }
    if (refreshToken !== undefined) {
      getPayment(setPayments, refreshToken);
    }
  }, [user, refreshToken]);

  let filteredData;
  if (searchText) {
    filteredData = payments?.filter((d) => String(d.id).includes(searchText));
  } else {
    filteredData = payments;
  }

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">PAYMENTS</h2>
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
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>

        <Link
          href="/payment/add"
          className="btn btn-sm no-underline btn-success px-4 py-1 text-lg"
        >
          Add Payments
        </Link>
      </section>

      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-x-2">id</th>
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2">Date</th>
            <th className="text-center border-r-2">Amount Paid</th>
            <th className="border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((payment) => (
            <tr key={payment.id}>
              {isModal === payment.id && (
                <PaymentModal
                  cancel={() => setIsModal(null)}
                  payment={payment}
                />
              )}
              {isDeleteModal === payment.id && (
                <PaymentModal
                  cancel={() => setIsDeleteModal(null)}
                  isDelete={isDeleteModal}
                  deleteUser={() =>
                    deletePayment(
                      payment.id,
                      setPayments,
                      refreshToken,
                      getPayment
                    )
                  }
                  payment={payment}
                />
              )}
              <td>{payment.id}</td>
              <td>{payment.description}</td>
              <td>{payment.date}</td>
              <td>{payment.amountPaid}</td>
              <td className="flex justify-evenly">
                <button
                  className="btn btn-sm btn-success px-3"
                  onClick={() => {
                    setIsModal(payment.id);
                  }}
                >
                  View
                </button>
                <Link
                  href={`/payment/edit/${payment.id}`}
                  className="btn btn-sm btn-primary px-3"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    setIsDeleteModal(payment.id);
                  }}
                  className="btn btn-sm btn-danger btn-delete-user px-3"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredData && !filteredData.length && (
            <p className="p-2 text-center text-xl">No Payments To Display</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Index;
