import axios from "axios";
import { toast } from "react-toastify";

const getPayment = async (setPayments, refreshToken) => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://18.139.85.219:8088/api/v1/pop/",
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    console.log("res", res)
    if (res.status === 200) {
      setPayments(res.data);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error occurred while getting the payments list");
  }
};

const deletePayment = async (paymentId, setPayments, refreshToken, getPayment) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://18.139.85.219:8088/api/v1/pop/${paymentId}`,
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
