import { getPaymentTypes } from "@/services/paymentType";
import { getSalesEntries, postSalesEntry } from "@/services/salesEntry";
import { postSalesReceipt } from "@/services/salesReceipt";
import { getDateFormate } from "@/utils/date";
import Router from "next/router";
import React, { useEffect, useState } from "react";

const SalesReceiptForm = () => {
  const srInitialState = {
    id: 1,
    amountReceived: 0,
    date: "",
    description: "",
    receiptType: "",
  };

  const initialState = {
    date:  getDateFormate(),
    requests: [srInitialState],
  };

  const [salesReceiptDetails, setSalesReceiptDetails] = useState(initialState);
  const [salesEntries, setSalesEntries] = useState([]);
  const [salesEntry, setSalesEntry] = useState("");
  const [paymentTypes, setPaymentTypes] = useState(undefined);

  const { date, requests } = salesReceiptDetails;
  const { customer, salesCat, description, message, totalInvoiceAmt } =
    salesEntry;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

  useEffect(() => {
    getSalesEntries(setSalesEntries, refreshToken);
    getPaymentTypes(setPaymentTypes, refreshToken);
  }, []);

  const totalPaid = requests.reduce((acc, curr) => {
    acc += Number(curr.amountReceived);
    return acc;
  }, 0);

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  const handleEntryInput = (event, entry, requests, setSalesReceiptDetails) => {
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
    setSalesReceiptDetails((prev) => ({ ...prev, requests: newRequests }));
  };

  const addNewEntry = (setSalesReceiptDetails, srInitialState) => {
    setSalesReceiptDetails((prev) => ({
      ...prev,
      requests: [
        ...prev.requests,
        {
          ...srInitialState,
          id: prev.requests[prev.requests.length - 1].id + 1,
        },
      ],
    }));
  };

  const deleteEntry = (entry, requests, setSalesReceiptDetails) => {
    const newRequests = requests.filter((e) => e.id !== entry.id);
    setSalesReceiptDetails((prev) => ({
      ...prev,
      requests: newRequests,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-4 mb-8">
        Sales Entry Form
      </h1>
      <div className={containerStyle}>
        <div>
          <label htmlFor="salesEntriesId">Invoice Number:</label>
          <select
            className={`${inputStyle} cursor-pointer`}
            name="salesEntriesId"
            id="salesEntriesId"
            onChange={(e) => setSalesEntry(JSON.parse(e.target.value))}
          >
            <option value="">Select Invoice Number</option>
            {salesEntries.map((salesEntry) => (
              <option value={JSON.stringify(salesEntry)}>
                {salesEntry.id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Invoice Date:</label>
          <input
            type="date"
            id="date"
            className={`${inputStyle} cursor-pointer`}
            name="date"
            value={date}
            onChange={(e) => handleInput(e, setSalesReceiptDetails)}
          />
        </div>
        <div>
          <label htmlFor="userId">User Id:</label>
          <input
            type="text"
            id="userId"
            className={`${inputStyle} cursor-pointer`}
            name="userId"
            value={userId}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="customer">Customer</label>
          <input
            type="text"
            id="customer"
            className={`${inputStyle} cursor-pointer`}
            name="customer"
            value={customer?.customerName}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="salesCat">Sales Category:</label>
          <input
            type="text"
            id="salesCat"
            className={`${inputStyle} cursor-pointer`}
            name="salesCat"
            value={salesCat}
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
            onChange={(e) => handleInput(e, setSalesReceiptDetails)}
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <input
            type="text"
            id="message"
            className={inputStyle}
            name="message"
            value={message}
            onChange={(e) => handleInput(e, setSalesReceiptDetails)}
          />
        </div>
        <div>
          <label htmlFor="invoiceAmount">Invoice Amount:</label>
          <input
            type="text"
            id="invoiceAmount"
            className={inputStyle}
            name="invoiceAmount"
            value={totalInvoiceAmt}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="totalPaid">Total Paid:</label>
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
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2">Payment Type</th>
            <th className="text-center border-r-2">Date Received</th>
            <th className="text-center border-r-2">Amount Received</th>
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
                  onChange={(e) =>
                    handleEntryInput(e, entry, requests, setSalesReceiptDetails)
                  }
                />
              </td>
              <td>
                <select
                  className={`${inputStyle} cursor-pointer`}
                  name="receiptType"
                  id="receiptType"
                  onChange={(e) =>
                    handleEntryInput(e, entry, requests, setSalesReceiptDetails)
                  }
                >
                  <option value="">Select Payment Type</option>
                  {paymentTypes?.map((paymentType) => (
                    <option value={paymentType.type}>{paymentType.type}</option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="date"
                  name="date"
                  value={entry.date}
                  onChange={(e) =>
                    handleEntryInput(e, entry, requests, setSalesReceiptDetails)
                  }
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="amountReceived"
                  value={entry.amountReceived}
                  onChange={(e) =>
                    handleEntryInput(e, entry, requests, setSalesReceiptDetails)
                  }
                />
              </td>
              <td className="flex justify-evenly">
                {requests[requests.length - 1].id === entry.id && (
                  <button
                    className="btn btn-sm btn-success px-3"
                    onClick={() =>
                      addNewEntry(setSalesReceiptDetails, srInitialState)
                    }
                  >
                    Add
                  </button>
                )}
                {requests.length > 1 && (
                  <button
                    onClick={() =>
                      deleteEntry(entry, requests, setSalesReceiptDetails)
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
            postSalesReceipt(
              userId,
              salesEntry.id,
              salesReceiptDetails,
              setSalesReceiptDetails,
              initialState,
              refreshToken,
              setSalesEntry
            )
          }
          className="btn btn-sm btn-success px-4 py-2"
        >
          SAVE
        </button>
        <button
          className="border-2 border-red-500 text-red-500 rounded px-4 py-2"
          onClick={() => {
            Router.push("/sales-receipt");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export { SalesReceiptForm };
