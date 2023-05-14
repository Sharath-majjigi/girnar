import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";

const getPaymentTypes = async (setPaymentTypes, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/payment-type/",
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
        url: `http://18.139.85.219:8088/api/v1/payment-type/`,
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
      url: `http://18.139.85.219:8088/api/v1/payment-type/${type}`,
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
