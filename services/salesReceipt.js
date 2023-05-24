import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getSalesReceipts = async (setSalesReceipts, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}sales-receipt/all`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setSalesReceipts(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the sales receipts");
  }
};

const postSalesReceipt = async (
  userId,
  salesEntryId,
  salesReceiptDetails,
  setSalesReceiptDetails,
  initialState,
  refreshToken,
  setSalesEntry
) => {
  try {
    const { requests, date } = salesReceiptDetails;
    const isEmpty = requests.reduce((acc, curr) => {
      if (
        curr.amountReceived === 0 ||
        curr.date === "" ||
        curr.description === "" ||
        curr.receiptType === ""
      ) {
        acc.push(true);
        return acc;
      }
      acc.push(false);
      return acc;
    }, []);
    if (salesEntryId === "" || isEmpty.includes(true) || date === "") {
      return toast.warn("Please fill all details");
    }
    const newRequests = requests.map((entry) => {
      delete entry.id;
      return entry;
    });
    const details = {
      ...salesReceiptDetails,
      requests: newRequests,
    };
    const res = await axios({
      method: "post",
      url: `${BASE_URL}sales-receipt/${userId}/${salesEntryId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
      data: {
        ...details,
      },
    });
    if (res.status === 200) {
      setSalesReceiptDetails(initialState);
      setSalesEntry({
        customer: { customerName: "" },
        salesCat: "",
        description: "",
        message: "",
        totalInvoiceAmt: 0,
      });
      Router.push("/sales-receipt");
      toast.success("Successfully created the sales receipt");
    }
  } catch (error) {
    toast.error("Error occurred while creating the sales receipt");
  }
};

const deleteSalesReceipt = async (
  salesReceiptId,
  setSalesReceipts,
  refreshToken,
  getSalesReceipts
) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}sales-receipt/${salesReceiptId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the sales receipt");
      getSalesReceipts(setSalesReceipts, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the sales receipt");
  }
};

export { getSalesReceipts, postSalesReceipt, deleteSalesReceipt };
