import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getPaymentTypes = async (setPaymentTypes, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}payment-type/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });

    if (res.status === 200) {
      setPaymentTypes(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting payment-type");
  }
};

const postPaymentType = async (details, refreshToken) => {
    try {
      const res = await axios({
        method: "post",
        url: `${BASE_URL}payment-type/`,
        headers: { authorization: `Bearer ${refreshToken}` },
        data: {
          ...details,
        },
      });
      if (res.status === 201) {
        Router.push("/payment-type");
        toast.success("Payment-type added successfully");
      }
    } catch (err) {
      toast.error("Error while adding payment-type");
    }
  };

const deletePaymentType = async (
  type,
  setPaymentTypes,
  refreshToken,
  getPaymentTypes
) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}payment-type/${type}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Payment-type deleted successfully");
      getPaymentTypes(setPaymentTypes, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting payment-type");
  }
};

export { getPaymentTypes, postPaymentType, deletePaymentType };
