import axios from "axios";
import { toast } from "react-toastify";

const getPoh = async (setPoh, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/poh/",
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setPoh(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the POH list");
  }
};

const deletePurchaseOrder = async (pid, setPoh, refreshToken, getPoh) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://18.139.85.219:8088/api/v1/poh/${pid}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the purchase Order");
      getPoh(setPoh, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the purchase Order");
  }
};

export { getPoh, deletePurchaseOrder };
