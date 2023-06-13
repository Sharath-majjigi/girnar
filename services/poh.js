import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getPurchaseOrders = async (setPoh, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}poh/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setPoh(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the POH list");
  }
};
const getPurchaseOrdersNotInSales = async (setPoh, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}poh/not-in-sales`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      setPoh(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the POH list");
  }
};

const deletePurchaseOrder = async (
  purchaseOrderId,
  setPoh,
  refreshToken,
  getPurchaseOrders
) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}poh/${purchaseOrderId}`,
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

export { getPurchaseOrders, deletePurchaseOrder, getPurchaseOrdersNotInSales };
