import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getPayment = async (setPayments, refreshToken) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${BASE_URL}pop/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setPayments(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the payments list");
  }
};

const deletePayment = async (paymentId, setPayments, refreshToken, getPayment) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}pop/${paymentId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the purchase Order");
      getPayment(setPayments, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the purchase Order");
  }
};

export { getPayment, deletePayment };
