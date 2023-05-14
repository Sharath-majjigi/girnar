import { getPurchaseOrders } from "@/services/poh";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const requestsInitialState = {
    amountPaid: 0,
    date: "",
    description: "",
    paymentType: "",
    id: 1,
  };

  const initialState = {
    requests: [requestsInitialState],
  };

  const [paymentDetails, setPaymentDetails] = useState(initialState);
  const [pohList, setPohList] = useState([]);
  const [pohDetails, setPohDetails] = useState("");

  const { requests } = paymentDetails;
  const { poDate, description, remarks, vendor, id } = pohDetails;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

  const postPaymentOrder = async (
    userId,
    pohId,
    paymentDetails,
    setPaymentDetails,
    setPohDetails
  ) => {
    try {
      const { requests } = paymentDetails;
      const newRequests = requests.map((entry) => {
        delete entry.id;
        return entry;
      });
      const details = { ...paymentDetails, requests: newRequests };
      const res = await axios({
        method: "post",
        url: `http://18.139.85.219:8088/api/v1/pop/${userId}/${pohId}`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 201) {
        setPaymentDetails({
          requests: [
            {
              amountPaid: 0,
              date: "",
              description: "",
              paymentType: "",
              id: 1,
            },
          ],
        });
        setPohDetails({
          poDate: "",
          vendor: { vendorName: "" },
          description: "",
          remarks: "",
        });
        toast.success("Successfully created the payment order");
      }
    } catch (error) {
      toast.error("Error occurred while creating the payment order");
    }
  };

  useEffect(() => {
    getPurchaseOrders(setPohList, refreshToken);
  }, []);

  const totalPoAmount = pohDetails?.pod?.reduce((acc, curr) => {
    acc += Number(curr.purchaseCost);
    return acc;
  }, 0);

  const totalPaid = requests.reduce((acc, curr) => {
    acc += Number(curr.amountPaid);
    return acc;
  }, 0);

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  const handleEntryInput = (event, entry, requests, setPaymentDetails) => {
    let [newRequest] = requests.filter((e) => e.id === entry.id);
    newRequest = {
      ...newRequest,
      [event.target.name]: event.target.value,
    };
    let newRequests = requests.map((e) => {
      if (e.id === entry.id) {
        return newRequest;
      }
      return e;
    });
    setPaymentDetails((prev) => ({ ...prev, requests: newRequests }));
  };

  const addNewEntry = (setPaymentDetails, requestsInitialState) => {
    setPaymentDetails((prev) => ({
      ...prev,
      requests: [
        ...prev.requests,
        {
          ...requestsInitialState,
          id: prev.requests[prev.requests.length - 1].id + 1,
        },
      ],
    }));
  };

  const deleteEntry = (entry, requests, setPaymentDetails) => {
    const newRequests = requests.filter((e) => e.id !== entry.id);
    setPaymentDetails((prev) => ({ ...prev, requests: newRequests }));
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-4 mb-8">
        Payments Form
      </h1>
      <div className={containerStyle}>
        <div>
          <label htmlFor="purchaseOrder">PO Number:</label>
          <select
            className={`${inputStyle} cursor-pointer`}
            name="purchaseOrder"
            id="purchaseOrder"
            onChange={(e) => {
              if (e.target.value === "") {
                return setPohDetails({
                  poDate: "",
                  vendor: { vendorName: "" },
                  description: "",
                  remarks: "",
                });
              }
              setPohDetails(JSON.parse(e.target.value));
            }}
          >
            <option value="">Select PO number</option>
            {pohList.map((poh) => (
              <option value={JSON.stringify(poh)}>{poh.id}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="poDate">PO Date:</label>
          <input
            type="date"
            id="poDate"
            className={`${inputStyle} cursor-pointer`}
            name="poDate"
            value={poDate}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="vendorName">Vendor:</label>
          <input
            type="text"
            id="vendorName"
            className={inputStyle}
            name="vendorName"
            value={vendor?.vendorName}
            disabled={true}
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
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="remarks">Remarks:</label>
          <input
            type="text"
            id="remarks"
            className={inputStyle}
            name="remarks"
            value={remarks}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="totalPoAmount">PO Amount:</label>
          <input
            type="text"
            id="totalPoAmount"
            className={inputStyle}
            name="totalPoAmount"
            value={totalPoAmount === undefined ? 0 : totalPoAmount}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="totalSellPrice">Toatal Paid:</label>
          <input
            type="text"
            id="totalPaid"
            className={inputStyle}
            name="totalPaid"
            value={totalPaid}
            disabled={true}
          />
        </div>
      </div>
      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-x-2">Description</th>
            <th className="text-center border-r-2">Payment Type</th>
            <th className="text-center border-r-2">Date Paid</th>
            <th className="text-center border-r-2">Amount Paid</th>
            <th className="border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((entry) => (
            <tr key={entry.id}>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="description"
                  value={entry.description}
                  onChange={(event) =>
                    handleEntryInput(event, entry, requests, setPaymentDetails)
                  }
                />
              </td>
              <td>
                <select
                  className={`${inputStyle} cursor-pointer`}
                  name="paymentType"
                  id="paymentType"
                  onChange={(event) =>
                    handleEntryInput(event, entry, requests, setPaymentDetails)
                  }
                >
                  <option value="">Select Payment Type</option>
                  <option value="UPI">UPI</option>
                  <option value="PHONEPE">PHONEPE</option>
                  <option value="PAYTM">PAYTM</option>
                </select>
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="date"
                  name="date"
                  value={entry.date}
                  onChange={(event) =>
                    handleEntryInput(event, entry, requests, setPaymentDetails)
                  }
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="amountPaid"
                  value={entry.amountPaid}
                  onChange={(event) =>
                    handleEntryInput(event, entry, requests, setPaymentDetails)
                  }
                />
              </td>
              <td className="flex justify-evenly">
                {requests[requests.length - 1].id === entry.id && (
                  <button
                    className="btn btn-sm btn-success px-3"
                    onClick={() =>
                      addNewEntry(setPaymentDetails, requestsInitialState)
                    }
                  >
                    Add
                  </button>
                )}
                {requests.length > 1 && (
                  <button
                    onClick={() =>
                      deleteEntry(entry, requests, setPaymentDetails)
                    }
                    className="btn btn-sm btn-danger btn-delete-user px-3"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
        <button
          onClick={() =>
            postPaymentOrder(
              userId,
              pohDetails.id,
              paymentDetails,
              setPaymentDetails,
              setPohDetails
            )
          }
          className="btn btn-sm btn-success px-4 py-2"
        >
          SAVE
        </button>

        <button
          className="border-2 border-red-500 text-red-500 rounded px-4 py-2"
          onClick={() => {
            setPaymentDetails({
              requests: [
                {
                  amountPaid: 0,
                  date: "",
                  description: "",
                  paymentType: "",
                  id: 1,
                },
              ],
            });
            setPohDetails({
              poDate: "",
              vendor: { vendorName: "" },
              description: "",
              remarks: "",
            });
            Router.push("/payment");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export { PaymentForm };
