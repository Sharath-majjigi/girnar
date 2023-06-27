import { getCustomers } from "@/services/customer";
import { getPurchaseOrdersNotInSales } from "@/services/poh";
import { getSalesCategories } from "@/services/salesCategory";
import { BASE_URL } from "@/services/api_base_url";
import { postSalesEntry } from "@/services/salesEntry";
import { getDateFormate } from "@/utils/date";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
import Select from "react-select";

const SalesEntryForm = ({ isEdit, id }) => {
  const seInitialState = {
    id: 1,
    poNumber: "",
    poDate: "",
    description: "",
    amount: "",
    sellAmount: "",
  };

  const initialState = {
    date: getDateFormate(),
    description: "",
    discount: 0,
    message: "",
    salesCat: "",
    vatAmt: 0,
    salesDetailList: [seInitialState],
  };

  const [salesEntryDetails, setSalesEntryDetails] = useState(initialState);
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesCategories, setSalesCategories] = useState(undefined);
  const [firstEffect, setFirstEffect] = useState(false);

  const {
    date,
    description,
    discount,
    message,
    salesDetailList,
    vatAmt,
    salesCat,
  } = salesEntryDetails;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

  const getSalesEntryById = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}sales-header/${id}`,
        headers: { authorization: `Bearer ${refreshToken}` },
      });
      if (response.status === 200) {
        const data = response?.data;
        delete data.id;
        const { salesDetailList: list } = data;
        const detailList = list?.map((e) => {
          const ddd = purchaseOrders?.find((ee) => ee.id === e.poNumber);
          return { ...ddd, _id: e.id, poNumber: ddd?.id };
        });
        setSalesEntryDetails({ ...data, salesDetailList: detailList });
        setCustomerId(data.customer.id);
      }
    } catch (error) {
      toast.error("error occurred while getting sales entry by id");
    }
  };

  const memorizedGetSalesEntryById = useCallback(getSalesEntryById, [
    refreshToken,
    purchaseOrders,
  ]);

  useEffect(() => {
    getCustomers(setCustomers, refreshToken);
    getPurchaseOrdersNotInSales(setPurchaseOrders, refreshToken);
    getSalesCategories(setSalesCategories, refreshToken);
    setFirstEffect(true);
  }, [refreshToken]);

  useEffect(() => {
    if (isEdit && firstEffect) {
      memorizedGetSalesEntryById(id);
    }
  }, [isEdit, id, firstEffect, memorizedGetSalesEntryById]);

  const invoiceAmount = salesDetailList.reduce((acc, curr) => {
    acc += Number(curr?.sellAmount);
    return acc;
  }, 0);

  const totalInvoiceAmount = invoiceAmount - Number(discount) + Number(vatAmt);

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  const handleInput = (e, setSalesEntryDetails) => {
    setSalesEntryDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputForSC = (category, setSalesEntryDetails) => {
    setSalesEntryDetails((prev) => ({
      ...prev,
      salesCat: category,
    }));
  };

  const handleEntryInput = (
    obj,
    entry,
    salesDetailList,
    setSalesEntryDetails
  ) => {
    let [salesDetail] = salesDetailList.filter((e) => e.id === entry.id);
    const newId = obj.id;
    let value;
    if (newId) {
      [value] = purchaseOrders.filter((e) => e.id === newId);
    }
    salesDetail =
      newId === ""
        ? {
            ...salesDetail,
            ...{
              id: 1,
              poNumber: "",
              poDate: "",
              description: "",
              amount: "",
              sellAmount: "",
            },
          }
        : {
            ...salesDetail,
            poNumber: value.id,
            poDate: value.poDate,
            description: value.description,
            amount: value.amount,
            sellAmount: value.sellAmount,
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

  const postSalesEntryUpdate = async (
    customerId,
    salesEntryDetails,
    setSalesEntryDetails,
    initialState,
    refreshToken
  ) => {
    try {
      const { salesDetailList, description, date, vatAmt, salesCat, message } =
        salesEntryDetails;
      const isEmpty = salesDetailList.reduce((acc, curr) => {
        if (curr.poNumber === "") {
          acc.push(true);
          return acc;
        }
        acc.push(false);
        return acc;
      }, []);
      if (
        customerId === "" ||
        isEmpty.includes(true) ||
        date === "" ||
        salesCat === ""
      ) {
        return toast.warn("Please fill all details");
      }
      const newSalesDetailList = salesDetailList.map((entry) => {
        return { poNumber: entry.poNumber, id: entry._id };
      });
      const details = {
        ...salesEntryDetails,
        salesDetailList: newSalesDetailList,
      };
      const res = await axios({
        method: "put",
        url: `${BASE_URL}sales-header/${id}`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 200) {
        Router.push("/sales-entry");
        setSalesEntryDetails(initialState);
        toast.success("Successfully updated the sales entry");
      }
    } catch (error) {
      toast.error("Error occurred while updating the sales entry");
    }
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
            type="text"
            id="date"
            disabled={true}
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
          {/* <select
            className={`${inputStyle} cursor-pointer`}
            name="customerId"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customerName}
              </option>
            ))}
          </select> */}
          <Select
            className={`border-2 border-black rounded w-44 ml-2 outline-0 inline-block ${
              isEdit ? "" : "cursor-pointer"
            }`}
            name="customerId"
            id="customerId"
            options={customers}
            onChange={(obj) => setCustomerId(obj.id)}
            getOptionLabel={(option) => option.customerName}
            getOptionValue={(option) => option.customerName}
            placeholder="Customer"
            isSearchable={true}
          />
        </div>
        <div>
          <label htmlFor="salesCat">Sales Category:</label>
          {/* <select
            className={`${inputStyle} cursor-pointer`}
            name="salesCat"
            id="salesCat"
            value={salesCat}
            onChange={(event) => handleInput(event, setSalesEntryDetails)}
          >
            <option value="">Select Sales Category</option>
            {salesCategories?.map((salesCategory) => (
              <option
                key={salesCategory.category}
                value={salesCategory.category}
              >
                {salesCategory.category}
              </option>
            ))}
          </select> */}
          <Select
            className={`border-2 border-black rounded w-44 ml-2 outline-0 inline-block ${
              isEdit ? "" : "cursor-pointer"
            }`}
            name="salesCat"
            id="salesCat"
            options={salesCategories}
            onChange={(obj) =>
              handleInputForSC(obj.category, setSalesEntryDetails)
            }
            getOptionLabel={(option) => option.category}
            getOptionValue={(option) => option.category}
            placeholder="sales category"
            isSearchable={true}
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
            <tr key={entry?.id}>
              <td>
                {/* <select
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
                  value={entry?.poNumber}
                >
                  <option value="">Select PO number</option>
                  {purchaseOrders.map((purchaseOrder) => (
                    <option key={purchaseOrder.id} value={purchaseOrder.id}>
                      {purchaseOrder.id}
                    </option>
                  ))}
                </select> */}
                <Select
                  className={`border-2 border-black rounded w-44 outline-0 inline-block ${
                    isEdit ? "" : "cursor-pointer"
                  }`}
                  name="poNumber"
                  id="poNumber"
                  options={purchaseOrders}
                  onChange={(obj) => {
                    handleEntryInput(
                      obj,
                      entry,
                      salesDetailList,
                      setSalesEntryDetails
                    );
                  }}
                  getOptionLabel={(option) => option.id}
                  getOptionValue={(option) => option.id}
                  placeholder="PO Number"
                  isSearchable={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="poDate"
                  value={entry?.poDate}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="description1"
                  value={entry?.description}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="purchaseCost"
                  value={entry?.amount}
                  disabled={true}
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="sellPrice"
                  value={entry?.sellAmount}
                  disabled={true}
                />
              </td>
              <td className="flex justify-evenly">
                {salesDetailList[salesDetailList.length - 1]?.id ===
                  entry?.id && (
                  <button
                    className="btn btn-sm btn-success px-3"
                    onClick={() =>
                      addNewEntry(setSalesEntryDetails, seInitialState)
                    }
                    disabled={isEdit ? true : false}
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
        {isEdit ? (
          <button
            onClick={() =>
              postSalesEntryUpdate(
                customerId,
                salesEntryDetails,
                setSalesEntryDetails,
                initialState,
                refreshToken
              )
            }
            className="btn btn-sm btn-success px-4 py-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() =>
              postSalesEntry(
                userId,
                customerId,
                salesEntryDetails,
                setSalesEntryDetails,
                initialState,
                refreshToken
              )
            }
            className="btn btn-sm btn-success px-4 py-2"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export { SalesEntryForm };
