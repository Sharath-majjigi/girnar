import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const getSalesEntries = async (setSalesEntries, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/sales-header/all",
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setSalesEntries(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the sales entries");
  }
};

const postSalesEntry = async (
  userId,
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
      description === "" ||
      message === "" ||
      salesCat === "" ||
      vatAmt === 0
    ) {
      return toast.warn("Please fill all details");
    }
    const newSalesDetailList = salesDetailList.map((entry) => {
      return { poNumber: entry.poNumber };
    });
    const details = {
      ...salesEntryDetails,
      salesDetailList: newSalesDetailList,
    };
    const res = await axios({
      method: "post",
      url: `http://18.139.85.219:8088/api/v1/sales-header/${userId}/${customerId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
      data: {
        ...details,
      },
    });
    if (res.status === 201) {
      setSalesEntryDetails(initialState);
      Router.push("/sales-entry");
      toast.success("Successfully created the sales entry");
    }
  } catch (error) {
    toast.error("Error occurred while creating the sales entry");
  }
};

const deleteSalesEntry = async (
  salesEntryId,
  setSalesEntries,
  refreshToken,
  getSalesEntries
) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://18.139.85.219:8088/api/v1/sales-header/${salesEntryId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the sales entry");
      getSalesEntries(setSalesEntries, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the sales entry");
  }
};

export { getSalesEntries, postSalesEntry, deleteSalesEntry };
