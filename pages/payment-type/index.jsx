import { deletePaymentType, getPaymentTypes } from "@/services/paymentType";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const [paymentTypes, setPaymentTypes] = useState();

  let user;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
  }

  useEffect(() => {
    getPaymentTypes(setPaymentTypes, refreshToken);
  }, [refreshToken]);

  return (
    <>
      <h2 className="text-2xl font-semibold text-center my-6">
        PAYMENT TYPE
      </h2>
      <div className="text-right">
        <Link
          href="/payment-type/add"
          className="btn btn-sm no-underline mr-2 btn-success px-4 py-1 text-lg"
        >
          Add Payment Type
        </Link>
      </div>
      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-r-2">Type</th>
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {paymentTypes?.map((paymentType) => (
            <tr key={paymentType.type}>
              <td>{paymentType.type}</td>
              <td>{paymentType.description}</td>
              <td>
                <button
                  className="border-0 bg-red-500 text-white rounded px-4 py-2"
                  onClick={() =>
                    deletePaymentType(
                      paymentType.type,
                      setPaymentTypes,
                      refreshToken,
                      getPaymentTypes
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
