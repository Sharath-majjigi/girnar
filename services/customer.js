import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "./api_base_url";

const getCustomers = async (setUsers, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: `${BASE_URL}customer/`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });

    if (res.status === 200) {
      setUsers(res.data);
    }
  } catch (error) {
    toast.error("Error occurred while getting the customer list");
  }
};

const deleteCustomer = async (customerId, setUsers, refreshToken) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${BASE_URL}customer/${customerId}`,
      headers: { authorization: `Bearer ${refreshToken}` },
    });
    if (res.status === 200) {
      toast.success("Successfully deleted the customer");
      getCustomers(setUsers, refreshToken);
    }
  } catch (error) {
    toast.error("Error occurred while deleting the customer");
  }
};

export { getCustomers, deleteCustomer };
