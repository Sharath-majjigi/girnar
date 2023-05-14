import axios from "axios";
import { toast } from "react-toastify";

const getPurchaseOrders = async (setPoh, refreshToken) => {
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

const deletePurchaseOrder = async (purchaseOrderId, setPoh, refreshToken, getPurchaseOrders) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://18.139.85.219:8088/api/v1/poh/${purchaseOrderId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the purchase Order");
      getPurchaseOrders(setPoh, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the purchase Order");
  }
};

export { getPurchaseOrders, deletePurchaseOrder };
