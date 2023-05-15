import { getVendors } from "@/services/vendor";
import { getDateFormate } from "@/utils/date";
import axios from "axios";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PurchaseForm = () => {
  const podInitialState = {
    description1: "",
    description2: "",
    paxName: "",
    purchaseCost: 0,
    sellPrice: 0,
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

  const { poDate, description, remarks, pod } = poDetails;

  let user;
  let userId;
  let refreshToken;
  if (typeof window !== "undefined") {
    user = localStorage.getItem("user");
    refreshToken = JSON.parse(user)?.refresh_token;
    userId = JSON.parse(user)?.id;
  }

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
      if (
        vendorId === "" ||
        remarks === "" ||
        description === "" ||
        isEmpty.includes(true)
      ) {
        return toast.warn("Please fill all details");
      }
      const newPod = pod.map((entry) => {
        delete entry.id;
        return entry;
      });
      const details = { ...poDetails, pod: newPod };
      const res = await axios({
        method: "post",
        url: `http://18.139.85.219:8088/api/v1/poh/${userId}/${vendorId}`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 200) {
        setPoDetails(initialState);
        toast.success("Successfully created the purchase order");
        Router.push("/purchase");
      }
    } catch (error) {
      toast.error("Error occurred while creating the purchase order");
    }
  };

  useEffect(() => {
    getVendors(setVendors);
  }, []);

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
    newPod = {
      ...newPod,
      [event.target.name]: event.target.value,
    };
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

  return (
    <div>
      <h1 className="text-3xl font-medium text-center mt-4 mb-8">
        Purchase Order Form
      </h1>
      <div className={containerStyle}>
        <div>
          <label htmlFor="vendorId">Vendor:</label>
          <select
            className={`${inputStyle} cursor-pointer`}
            name="vendorId"
            id="vendorId"
            onChange={(e) => setVendorId(e.target.value)}
          >
            <option value="">Select Vendor</option>
            {vendors.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>{vendor.vendorName}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="po-date">PO Date:</label>
          <input
            type="date"
            id="po-date"
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
            className={`${inputStyle} cursor-pointer`}
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
            <th className="border-r-2"></th>
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
              </td>
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
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center gap-4">
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
          SAVE
        </button>
        <button className="btn btn-sm btn-success px-4 py-2">Print PO</button>
        <button className="btn btn-sm btn-success px-4 py-2">
          Create Invoice
        </button>
      </div>
    </div>
  );
};

export { PurchaseForm };
