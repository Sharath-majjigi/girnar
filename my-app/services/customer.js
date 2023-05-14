import axios from "axios";
import { toast } from "react-toastify";

const getCustomers = async (setUsers, refreshToken) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://18.139.85.219:8088/api/v1/customer/",
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
      url: `http://18.139.85.219:8088/api/v1/customer/${customerId}`,
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
