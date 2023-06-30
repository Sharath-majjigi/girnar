import { BASE_URL } from "@/services/api_base_url";
import { getVendors } from "@/services/vendor";
import { getDateFormate } from "@/utils/date";
import axios from "axios";
import Router from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

const PurchaseForm = ({ isEdit, id }) => {
  const podInitialState = {
    description1: "",
    description2: "",
    paxName: "",
    purchaseCost: "",
    sellPrice: "",
    id: 1,
  };

  const initialState = {
    poDate: getDateFormate(),
    description: "",
    remarks: "",
    pod: [podInitialState],
  };

  const [poDetails, setPoDetails] = useState(initialState);
  const [vendors, setVendors] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [error, setError] = useState({
    sellPriceError: [],
    purchaseCostError: [],
  });
  const [selectedVendor, setSelectedVendor] = useState(null);

  const { poDate, description, remarks, pod } = poDetails;
  const { sellPriceError, purchaseCostError } = error;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

  const getPurchaseById = async (id) => {
    try {
      const response = await axios({
        method: "get",
        url: `${BASE_URL}poh/${id}`,
        headers: { authorization: `Bearer ${refreshToken}` },
      });
      if (response.status === 200) {
        const data = response.data;
        delete data.id;
        setPoDetails({ ...data });
        setVendorId(data.vendor.id);
        setSelectedVendor(data.vendor);
      }
    } catch (error) {
      toast.error("error occurred while getting purchase order data by id");
    }
  };

  const memorizedGetPurchaseById = useCallback(getPurchaseById, [refreshToken]);

  useEffect(() => {
    if (isEdit) {
      memorizedGetPurchaseById(id);
    }
  }, [isEdit, id, memorizedGetPurchaseById]);

  const postPurchaseOrder = async (
    userId,
    vendorId,
    poDetails,
    setPoDetails,
    initialState
  ) => {
    try {
      const { description, remarks, pod } = poDetails;
      const isEmpty = pod.reduce((acc, curr) => {
        if (
          curr.description1 === "" ||
          curr.description2 === "" ||
          curr.paxName === "" ||
          curr.purchaseCost === 0 ||
          curr.sellPrice === 0
        ) {
          acc.push(true);
          return acc;
        }
        acc.push(false);
        return acc;
      }, []);
      if (sellPriceError.length > 0 || purchaseCostError.length > 0) {
        return toast.warn("Rectify errors before saving!");
      }
      if (vendorId === "" || isEmpty.includes(true)) {
        return toast.warn("Please fill all details");
      }
      const newPod = pod.map((entry) => {
        delete entry.id;
        return entry;
      });
      const details = { ...poDetails, pod: newPod };
      const res = await axios({
        method: "post",
        url: `${BASE_URL}poh/${userId}/${vendorId}`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 200) {
        Router.push("/purchase");
        setPoDetails(initialState);
        toast.success("Successfully created the purchase order");
      }
    } catch (error) {
      toast.error("Error occurred while creating the purchase order");
    }
  };

  const postPurchaseOrderUpdate = async (
    vendorId,
    poDetails,
    setPoDetails,
    initialState
  ) => {
    try {
      const { description, remarks, pod } = poDetails;
      const isEmpty = pod.reduce((acc, curr) => {
        if (
          curr.description1 === "" ||
          curr.description2 === "" ||
          curr.paxName === "" ||
          curr.purchaseCost === 0 ||
          curr.sellPrice === 0
        ) {
          acc.push(true);
          return acc;
        }
        acc.push(false);
        return acc;
      }, []);
      if (sellPriceError.length > 0 || purchaseCostError.length > 0) {
        return toast.warn("Rectify errors before saving!");
      }
      if (vendorId === "" || isEmpty.includes(true)) {
        return toast.warn("Please fill all details");
      }
      delete poDetails.vendor;
      delete poDetails.vendorName;
      delete poDetails.sellAmount;
      delete poDetails.amount;
      delete poDetails.user;
      const details = { ...poDetails };
      const res = await axios({
        method: "put",
        url: `${BASE_URL}poh/${id}/update`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 200) {
        Router.push("/purchase");
        setPoDetails(initialState);
        toast.success("Successfully updated the purchase order");
      }
    } catch (error) {
      toast.error("Error occurred while updating the purchase order");
    }
  };

  useEffect(() => {
    getVendors(setVendors, refreshToken);
  }, [refreshToken]);

  const totalPoAmount = poDetails?.pod?.reduce((acc, curr) => {
    acc += Number(curr.purchaseCost);
    return acc;
  }, 0);

  const totalSellPrice = poDetails?.pod?.reduce((acc, curr) => {
    acc += Number(curr.sellPrice);
    return acc;
  }, 0);

  const inputStyle =
    "border-2 border-black rounded w-44 ml-2 outline-0 px-2 py-1";
  const containerStyle = "flex gap-6 flex-wrap justify-between w-3/4 mx-auto";

  const handleInput = (e, setPoDetails) => {
    setPoDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEntryInput = (event, entry, pod, setPoDetails) => {
    let [newPod] = pod.filter((e) => e.id === entry.id);
    if (event.target.name === "sellPrice") {
      if (/^\d+$/.test(event.target.value)) {
        if (sellPriceError) {
          setError((prev) => ({
            ...prev,
            sellPriceError: [...prev.sellPriceError].filter(
              (n) => n !== entry.id
            ),
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          sellPriceError: [...prev.sellPriceError, entry.id],
        }));
      }
      newPod = {
        ...newPod,
        [event.target.name]: event.target.value,
      };
    } else if (event.target.name === "purchaseCost") {
      if (/^\d+$/.test(event.target.value)) {
        if (purchaseCostError) {
          setError((prev) => ({
            ...prev,
            purchaseCostError: [...prev.purchaseCostError].filter(
              (n) => n !== entry.id
            ),
          }));
        }
      } else {
        setError((prev) => ({
          ...prev,
          purchaseCostError: [...prev.purchaseCostError, entry.id],
        }));
      }
      newPod = {
        ...newPod,
        [event.target.name]: event.target.value,
      };
    } else {
      newPod = {
        ...newPod,
        [event.target.name]: event.target.value,
      };
    }

    let podd = pod.map((e) => {
      if (e.id === entry.id) {
        return newPod;
      }
      return e;
    });
    setPoDetails((prev) => ({ ...prev, pod: podd }));
  };

  const addNewEntry = (setPoDetails, podInitialState) => {
    setPoDetails((prev) => ({
      ...prev,
      pod: [
        ...prev.pod,
        {
          ...podInitialState,
          id: prev.pod[prev.pod.length - 1].id + 1,
        },
      ],
    }));
  };

  const deleteEntry = (entry, pod, setPoDetails) => {
    const newPod = pod.filter((e) => e.id !== entry.id);
    setPoDetails((prev) => ({ ...prev, pod: newPod }));
  };


  const handleVendorChange = (selectedOption) => {
    setSelectedVendor(selectedOption);
    setVendorId(selectedOption ? selectedOption.id : "");
  };

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-4 mb-8">
        Purchase Order Form
      </h1>
      <div className={containerStyle}>
        {/* <div>
          <label htmlFor="vendorId">Vendor:</label>
          <select
            className={`${inputStyle} ${isEdit ? "" : "cursor-pointer"}`}
            name="vendorId"
            id="vendorId"
            value={vendorId}
            
            disabled={isEdit ? true : false}
            onChange={(e) => setVendorId(e.target.value)}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.vendorName}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label htmlFor="vendorId">Vendor:</label>
          <Select
            className={`border-2 border-black rounded w-44 ml-2 outline-0 inline-block ${
              isEdit ? "" : "cursor-pointer"
            }`}
            name="vendorId"
            id="vendorId"
            value={selectedVendor}
            isDisabled={isEdit ? true : false}
            options={vendors} // Pass the vendors array directly as options
            onChange={handleVendorChange} // Create a new function to handle the vendor selection
            getOptionLabel={(option) => option.vendorName} // Specify the property to display as the label
            getOptionValue={(option) => option.id} // Specify the property to use as the value
            placeholder="Select Vendor"
            isSearchable={true} // Enable search functionality
          />
        </div>
        <div>
          <label htmlFor="po-date">PO Date:</label>
          <input
            type="text"
            id="po-date"
            disabled={true}
            className={`${inputStyle} cursor-pointer`}
            name="poDate"
            value={poDate}
            onChange={(e) => handleInput(e, setPoDetails)}
          />
        </div>
        <div>
          <label htmlFor="userId">User Id:</label>
          <input
            type="text"
            id="userId"
            className={`${inputStyle}`}
            name="userId"
            value={userId}
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
            onChange={(e) => handleInput(e, setPoDetails)}
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
            onChange={(e) => handleInput(e, setPoDetails)}
          />
        </div>
        <div>
          <label htmlFor="totalPoAmount">PO Amount:</label>
          <input
            type="text"
            id="totalPoAmount"
            className={inputStyle}
            name="totalPoAmount"
            value={totalPoAmount}
            disabled={true}
          />
        </div>
        <div>
          <label htmlFor="totalSellPrice">Sell Price:</label>
          <input
            type="text"
            id="totalSellPrice"
            className={inputStyle}
            name="totalSellPrice"
            value={totalSellPrice}
            disabled={true}
          />
        </div>
      </div>
      <table className="table table-striped mt-4 mb-10">
        <thead>
          <tr>
            <th className="text-center border-x-2">PAX Name</th>
            <th className="text-center border-r-2">Description 1</th>
            <th className="text-center border-r-2">Description 2</th>
            <th className="text-center border-r-2">Purchase Cost</th>
            <th className="text-center border-r-2">Sell Price</th>
            {!isEdit && <th className="border-r-2"></th>}
          </tr>
        </thead>
        <tbody>
          {pod?.map((entry) => (
            <tr key={entry.id}>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="paxName"
                  value={entry.paxName}
                  onChange={(event) =>
                    handleEntryInput(event, entry, pod, setPoDetails)
                  }
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="description1"
                  value={entry.description1}
                  onChange={(event) =>
                    handleEntryInput(event, entry, pod, setPoDetails)
                  }
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="description2"
                  value={entry.description2}
                  onChange={(event) =>
                    handleEntryInput(event, entry, pod, setPoDetails)
                  }
                />
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="purchaseCost"
                  value={entry.purchaseCost}
                  onChange={(event) =>
                    handleEntryInput(event, entry, pod, setPoDetails)
                  }
                />
                {purchaseCostError?.includes(entry.id) && (
                  <p className="text-red-500">Enter only numbers</p>
                )}
              </td>
              <td>
                <input
                  className="border-2 border-black rounded w-full outline-0 px-2 py-1"
                  type="text"
                  name="sellPrice"
                  value={entry.sellPrice}
                  onChange={(event) =>
                    handleEntryInput(event, entry, pod, setPoDetails)
                  }
                />
                {sellPriceError?.includes(entry.id) && (
                  <p className="text-red-500">Enter only numbers</p>
                )}
              </td>
              {!isEdit && (
                <td className="flex justify-evenly">
                  {pod[pod.length - 1].id === entry.id && (
                    <button
                      className="btn btn-sm btn-success px-3"
                      onClick={() => addNewEntry(setPoDetails, podInitialState)}
                    >
                      Add
                    </button>
                  )}
                  {pod.length > 1 && (
                    <button
                      onClick={() => deleteEntry(entry, pod, setPoDetails)}
                      className="btn btn-sm btn-danger btn-delete-user px-3"
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
        {isEdit ? (
          <button
            onClick={() =>
              postPurchaseOrderUpdate(
                vendorId,
                poDetails,
                setPoDetails,
                initialState
              )
            }
            className="btn btn-sm btn-success px-4 py-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() =>
              postPurchaseOrder(
                userId,
                vendorId,
                poDetails,
                setPoDetails,
                initialState
              )
            }
            className="btn btn-sm btn-success px-4 py-2"
          >
            Save
          </button>
        )}
        <button className="btn btn-sm btn-success px-4 py-2">Print PO</button>
        <button className="btn btn-sm btn-success px-4 py-2">
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export { PurchaseForm };
