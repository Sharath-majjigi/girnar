import { getCustomers } from "@/services/customer";
import { getPurchaseOrders } from "@/services/poh";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SalesEntryForm = () => {
  const seInitialState = {
    id: 1,
    poNumber: "",
    poDate: "",
    description1: "",
    description2: "",
    purchaseCost: "",
    sellPrice: "",
  };

  const initialState = {
    date: "",
    description: "",
    discount: 0,
    message: "",
    salesCat: "",
    salesDetailList: [seInitialState],
    vatAmt: 0,
  };

  const [salesEntryDetails, setSalesEntryDetails] = useState(initialState);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [purchaseOrders, setPurchaseOrders] = useState([]);

  const { date, description, discount, message, salesDetailList, vatAmt } =
    salesEntryDetails;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

  //   const postSalesEntry = async (
  //     userId,
  //     vendorId,
  //     poDetails,
  //     setPoDetails,
  //     initialState
  //   ) => {
  //     try {
  //       const { pod } = poDetails;
  //       const newPod = pod.map((entry) => {
  //         delete entry.id;
  //         return entry;
  //       });
  //       const details = { ...poDetails, pod: newPod };
  //       const res = await axios({
  //         method: "post",
  //         url: `http://18.139.85.219:8088/api/v1/poh/${userId}/${vendorId}`,
  //         headers: { authorization: `Bearer ${refreshToken}` },
  //         data: {
  //           ...details,
  //         },
  //       });
  //       if (res.status === 200) {
  //         console.log(res)
  //         setPoDetails(initialState);
  //         toast.success("Successfully created the payment order");
  //       }
  //     } catch (error) {
  //       toast.error("Error occurred while creating the payment order");
  //     }
  //   };

  useEffect(() => {
    getCustomers(setCustomers, refreshToken);
    getPurchaseOrders(setPurchaseOrders, refreshToken);
  }, []);

  const invoiceAmount = salesDetailList.reduce((acc, curr) => {
    acc += Number(curr.sellPrice);
    return acc;
  }, 0);

  const totalInvoiceAmount = invoiceAmount - discount + vatAmt;

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  const handleInput = (e, setSalesEntryDetails) => {
    setSalesEntryDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEntryInput = (
    event,
    entry,
    salesDetailList,
    setSalesEntryDetails
  ) => {
    if (event.target.value === "") {
      // {
      //     id: 1,
      //     poNumber: "",
      //     poDate: "",
      //     description1: "",
      //     description2: "",
      //     purchaseCost: "",
      //     sellPrice: "",
      //   };
    }
    let [salesDetail] = salesDetailList.filter((e) => e.id === entry.id);
    salesDetail =
      event.target.value === ""
        ? {
            ...salesDetail,
            ...{
              poNumber: "",
              poDate: "",
              description1: "",
              description2: "",
              purchaseCost: "",
              sellPrice: "",
            },
          }
        : {
            ...salesDetail,
            ...event.target.value,
          };
    let newSalesDetailList = salesDetailList.map((e) => {
      if (e.id === entry.id) {
        return salesDetail;
      }
      return e;
    });
    setSalesEntryDetails((prev) => ({
      ...prev,
      salesDetailList: newSalesDetailList,
    }));
  };

  const addNewEntry = (setSalesEntryDetails, seInitialState) => {
    setSalesEntryDetails((prev) => ({
      ...prev,
      salesDetailList: [
        ...prev.salesDetailList,
        {
          ...seInitialState,
          id: prev.salesDetailList[prev.salesDetailList.length - 1].id + 1,
        },
      ],
    }));
  };

  const deleteEntry = (entry, salesDetailList, setSalesEntryDetails) => {
    const newSalesDetailList = salesDetailList.filter((e) => e.id !== entry.id);
    setSalesEntryDetails((prev) => ({
      ...prev,
      salesDetailList: newSalesDetailList,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-4 mb-8">
        Sales Entry Form
      </h1>
      <div className={containerStyle}>
        <div>
          <label htmlFor="date">Invoice Date:</label>
          <input
            type="date"
            id="date"
            className={`${inputStyle} cursor-pointer`}
            name="date"
            value={date}
            onChange={(e) => handleInput(e, setSalesEntryDetails)}
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
          <label htmlFor="customerId">Customer:</label>
          <select
            className={`${inputStyle} cursor-pointer`}
            name="customerId"
            id="customerId"
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option value={customer.id}>{customer.customerName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="salesCat">Sales Category:</label>
          <select
            className={`${inputStyle} cursor-pointer`}
            name="salesCat"
            id="salesCat"
            onChange={(event) => handleInput(e, setSalesEntryDetails)}
          >
            <option value="">Select Sales Category</option>
            <option value="UPI">UPI</option>
            <option value="PHONEPE">PHONEPE</option>
            <option value="PAYTM">PAYTM</option>
          </select>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            className={inputStyle}
            name="description"
            value={description}
            onChange={(e) => handleInput(e, setSalesEntryDetails)}
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
            onChange={(e) => handleInput(e, setSalesEntryDetails)}
          />
        </div>
        <div>
          <label htmlFor="invoiceAmount">Invoice Amount:</label>
          <input
            type="text"
            id="invoiceAmount"
            className={inputStyle}
            name="invoiceAmount"
            value={invoiceAmount}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="discount">Discount:</label>
          <input
            type="text"
            id="discount"
            className={inputStyle}
            name="discount"
            value={discount}
            onChange={(e) => handleInput(e, setSalesEntryDetails)}
          />
        </div>
        <div>
          <label htmlFor="vatAmt">Vat Amount:</label>
          <input
            type="text"
            id="vatAmt"
            className={inputStyle}
            name="vatAmt"
            value={vatAmt}
            onChange={(e) => handleInput(e, setSalesEntryDetails)}
          />
        </div>
        <div>
          <label htmlFor="totalInvoiceAmount">Total Invoice Amount:</label>
          <input
            type="text"
            id="totalInvoiceAmount"
            className={inputStyle}
            name="totalInvoiceAmount"
            value={totalInvoiceAmount}
            disabled={true}
          />
        </div>
      </div>
      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-x-2">PO Number</th>
            <th className="text-center border-r-2">PO Date</th>
            <th className="text-center border-r-2">Description</th>
            <th className="text-center border-r-2">Total Purchase Cost</th>
            <th className="text-center border-r-2">Total Sell Price</th>
            <th className="border-r-2"></th>
          </tr>
        </thead>
        <tbody>
          {salesDetailList?.map((entry) => (
            <tr key={entry.id}>
              <td>
                <select
                  className={`${inputStyle} cursor-pointer`}
                  name="poNumber"
                  id="poNumber"
                  onChange={(e) => {
                    handleEntryInput(
                      e,
                      entry,
                      salesDetailList,
                      setSalesEntryDetails
                    );
                  }}
                >
                  <option value="">Select PO number</option>
                  {purchaseOrders.map((purchaseOrder) => (
                    <option value={JSON.stringify(purchaseOrder)}>
                      {purchaseOrder.id}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="poDate"
                  value={entry.poDate}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="description1"
                  value={entry.description1}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="purchaseCost"
                  value={entry.purchaseCost}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="sellPrice"
                  value={entry.sellPrice}
                  disabled={true}
                />
              </td>
              <td className="flex justify-evenly">
                {salesDetailList[salesDetailList.length - 1].id ===
                  entry.id && (
                  <button
                    className="btn btn-sm btn-success px-3"
                    onClick={() =>
                      addNewEntry(setSalesEntryDetails, seInitialState)
                    }
                  >
                    Add
                  </button>
                )}
                {salesDetailList.length > 1 && (
                  <button
                    onClick={() =>
                      deleteEntry(entry, salesDetailList, setSalesEntryDetails)
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
            postPurchaseOrder(userId, customerId, salesEntryDetails)
          }
          className="btn btn-sm btn-success px-4 py-2"
        >
          SAVE
        </button>
        <button className="btn btn-sm btn-success px-4 py-2">
          Print Invoice
        </button>
      </div>
    </div>
  );
};

export { SalesEntryForm };
